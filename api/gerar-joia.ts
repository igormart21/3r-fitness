import OpenAI, { toFile } from "openai";

export const runtime = "nodejs";
export const maxDuration = 300;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "OPENAI_API_KEY não configurado." }, { status: 500 });
  }

  let body: { imageBase64?: string; material?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body inválido." }, { status: 400 });
  }

  const { imageBase64, material } = body;
  if (!imageBase64) {
    return Response.json({ error: "Nenhuma imagem enviada." }, { status: 400 });
  }

  const isOuro = material !== "prata";
  const openai = new OpenAI({ apiKey });

  try {
    const mimeMatch  = imageBase64.match(/^data:(image\/[\w+]+);base64,/);
    const mimeType   = (mimeMatch?.[1] ?? "image/jpeg") as "image/jpeg" | "image/png" | "image/webp";
    const ext        = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
    const base64Data = imageBase64.replace(/^data:image\/[\w+]+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const imageFile   = await toFile(imageBuffer, `photo.${ext}`, { type: mimeType });

    const metalSurface = isOuro
      ? "18K yellow gold, warm rich golden color, mirror-polished surface with deep warm golden reflections and subtle shadows in the engraved recesses"
      : "sterling silver 925, brilliant cool white-silver color, mirror-polished surface with bright silver reflections and subtle shadows in the engraved recesses";

    const bgColor = isOuro ? "warm neutral beige-gray" : "cool neutral gray (RGB 175,175,175)";

    const prompt = [
      `Using the person in this reference photo, create an ultra-realistic photographic product image of a custom handcrafted luxury jewelry pendant made of ${metalSurface}.`,
      ``,
      `PENDANT STRUCTURE: The pendant IS the full figure — the person's entire body silhouette becomes the 3D sculptural pendant shape, floating freely with NO rectangular plate, NO flat base. The pendant outline follows the exact body contour.`,
      ``,
      `POSE — 100% EXACT REPRODUCTION:`,
      `Reproduce every single detail of the pose from the reference photo with absolute precision:`,
      `- Every limb angle, position, bend, and extension matches exactly`,
      `- Head tilt, facial direction, chin angle matches exactly`,
      `- Body weight distribution, torso twist, spine curve matches exactly`,
      `- Finger positions and hand gestures match exactly`,
      `- Foot position, point, flex, and shoe angle matches exactly`,
      ``,
      `SCULPTING QUALITY — museum master jeweler level, ultra high-relief 3D:`,
      `FACE: fully sculpted features — eyes with eyelids and lashes detail, nose bridge and nostrils, lips with cupid's bow, cheekbones, jawline, chin`,
      `HAIR: every strand texture, volume, and style reproduced in metal — buns show individual wrapped sections, loose hair shows flowing strands, braids show woven texture`,
      `CLOTHING: every fabric fold, crease, seam, hem, and edge sculpted in fine relief — rhinestones as tiny raised dots, fringe as individual metal strands, sparkle patterns engraved precisely`,
      `HANDS: individual fingers separated and detailed, knuckle lines, nail shapes visible`,
      `FEET & SHOES: shoe type, straps, ribbons, laces, sole edge all sculpted with precision`,
      `BODY: smooth anatomical form with subtle muscle definition under clothing`,
      ``,
      `BAIL: large polished pendant bail at the very top center — smooth teardrop/oval loop matching the metal, realistically attached to the figure's highest point`,
      ``,
      `PHOTOGRAPHY STYLE:`,
      `- Background: clean ${bgColor} studio background, completely uniform`,
      `- Lighting: soft overhead diffused studio light with gentle fill from below, creating realistic metallic highlights and depth shadows`,
      `- The 3D depth and volume of the sculpture must be clearly visible through shadows and highlights`,
      `- Pendant centered and floating — NO chain, NO hands, NO neck, NO display stand, NO props`,
      `- Ultra sharp macro detail showing every engraved line`,
      `- Photorealistic render quality, 8K, commercial luxury jewelry catalog`,
      `- NO text, NO watermark, NO logo anywhere`,
    ].join("\n");

    console.log("[gerar-joia] Gerando com gpt-image-1-mini images.edit...");

    const response = await (openai.images.edit as Function)({
      model: "gpt-image-1-mini",
      image: imageFile,
      prompt,
      size: "1024x1024",
    });

    const item     = (response as any).data?.[0];
    const imageUrl = item?.url ?? (item?.b64_json ? `data:image/png;base64,${item.b64_json}` : null);

    if (!imageUrl) {
      return Response.json({ error: "Sem imagem gerada." }, { status: 500 });
    }

    console.log("[gerar-joia] Pingente gerado com sucesso!");
    return Response.json({ imageUrl });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[gerar-joia] Erro:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
