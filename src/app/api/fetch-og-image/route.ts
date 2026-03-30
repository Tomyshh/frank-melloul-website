import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url param required" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "URL invalide" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return NextResponse.json({ error: "Protocole non autorisé" }, { status: 400 });
  }

  try {
    const pageRes = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!pageRes.ok) {
      return NextResponse.json(
        { error: `Impossible de charger la page (${pageRes.status})` },
        { status: 502 }
      );
    }

    const html = await pageRes.text();

    // Try og:image first, then twitter:image
    const ogImageMatch =
      html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
      ) ||
      html.match(
        /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i
      );

    if (!ogImageMatch?.[1]) {
      return NextResponse.json(
        { error: "Aucune image OG trouvée sur cette page" },
        { status: 404 }
      );
    }

    let imageUrl = ogImageMatch[1];

    // Resolve relative URLs
    if (imageUrl.startsWith("//")) {
      imageUrl = `https:${imageUrl}`;
    } else if (imageUrl.startsWith("/")) {
      imageUrl = `${parsed.origin}${imageUrl}`;
    }

    const imgRes = await fetch(imageUrl, {
      signal: AbortSignal.timeout(10000),
    });

    if (!imgRes.ok) {
      return NextResponse.json(
        { error: "Impossible de télécharger l'image" },
        { status: 502 }
      );
    }

    const contentType = imgRes.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await imgRes.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
}
