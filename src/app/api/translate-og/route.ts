import { NextRequest, NextResponse } from "next/server";

interface TranslateRequest {
  title: string;
  description: string;
}

interface TranslateResult {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY non configurée sur le serveur" },
      { status: 500 }
    );
  }

  let body: TranslateRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide" }, { status: 400 });
  }

  const { title = "", description = "" } = body;

  if (!title.trim() && !description.trim()) {
    return NextResponse.json(
      { error: "title ou description requis" },
      { status: 400 }
    );
  }

  const prompt = `You are a professional translator. I will give you a title and/or description extracted from a web page.

Your tasks:
1. Detect the language of the provided text (it will be either French or English, or possibly another language).
2. If the text is in French → provide the original as the French version and translate to English.
3. If the text is in English → provide the original as the English version and translate to French.
4. If the text is in another language → translate to both French and English.
5. Keep translations concise and natural. Do not add extra commentary.

Input:
Title: ${title || "(none)"}
Description: ${description || "(none)"}

Respond ONLY with a valid JSON object in this exact format (no markdown, no explanation):
{
  "titleFr": "...",
  "titleEn": "...",
  "descriptionFr": "...",
  "descriptionEn": "..."
}

Rules:
- If title is empty, set both titleFr and titleEn to "".
- If description is empty, set both descriptionFr and descriptionEn to "".
- Never add content that wasn't in the original text.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 512,
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: `OpenAI error ${res.status}: ${err}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content ?? "";

    // Strip potential markdown code fences
    const jsonStr = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    let result: TranslateResult;
    try {
      result = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json(
        { error: `Réponse OpenAI non parseable: ${raw}` },
        { status: 502 }
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
}
