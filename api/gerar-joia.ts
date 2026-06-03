import OpenAI, { toFile } from "openai";

export const runtime = "nodejs";
export const maxDuration = 60;

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
  const materialName = isOuro ? "18k yellow gold" : "sterling silver 925";
  const materialFinish = isOuro
    ? "warm golden polished surface with rich reflections"
    : "cool bright silver brushed matte surface";

  const openai = new OpenAI({ apiKey });

  try {
    // ── Converter base64 data URI para File para o endpoint images.edit ──
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const file = await toFile(imageBuffer, "reference.png", { type: "image/png" });

    // ── Prompt que instrui o modelo a OLHAR a foto e criar o pingente ──
    const prompt = [
      `Study the person in this reference photo very carefully. Memorize their EXACT body pose, the angle of every limb, their clothing outline, any sports equipment, and their body proportions.`,
      ``,
      `Now create a COMPLETELY NEW product photo showing ONLY a single luxury rectangular pendant (3cm x 2cm metal tag shape) made of ${materialName}, with a ${materialFinish}.`,
      ``,
      `On the front polished face of this pendant, engrave a bold, crisp BLACK SILHOUETTE that PRECISELY reproduces the person's EXACT pose from the reference photo above.`,
      `Every detail must match: same arm angles, same leg positions, same torso tilt, same head angle, same equipment position, same clothing outline. The silhouette must be instantly recognizable as the same pose.`,
      ``,
      `The engraving style: solid black filled silhouette, clean sharp edges, professional laser-cut quality on the polished metal surface. The silhouette should be large and centered, filling most of the pendant face.`,
      ``,
      `CRITICAL RULES:`,
      `- Show ONLY the pendant itself, floating centered on a pure solid white background`,
      `- ABSOLUTELY NO chain, no necklace, no neck, no human model, no hands, no display stand`,
      `- NO text, NO logo, NO watermark, NO brand name on the pendant or anywhere`,
      `- The pendant must look like a real physical luxury jewelry piece`,
      ``,
      `Professional macro jewelry product photography, soft diffused studio lighting from above-left, shallow depth of field, ultra-sharp photorealistic 8K detail.`,
    ].join("\n");

    console.log("[gerar-joia] Using images.edit with gpt-image-1 (image-to-image)...");

    const response = await (openai.images.edit as Function)({
      model: "gpt-image-1",
      image: file,
      prompt,
      size: "1024x1024",
    });

    const item = (response as any).data?.[0];
    // gpt-image-1 retorna b64_json por padrão
    const imageUrl =
      (item as any)?.url ??
      ((item as any)?.b64_json
        ? `data:image/png;base64,${(item as any).b64_json}`
        : null);

    if (!imageUrl) {
      return Response.json({ error: "Sem imagem gerada." }, { status: 500 });
    }

    console.log("[gerar-joia] Pendant image generated successfully!");
    return Response.json({ imageUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[gerar-joia] Error:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
