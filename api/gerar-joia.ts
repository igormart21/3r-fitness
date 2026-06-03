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

  const openai = new OpenAI({ apiKey });

  try {
    const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/png";
    const ext = mimeType === "image/jpeg" ? "jpg" : mimeType === "image/webp" ? "webp" : "png";
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const file = await toFile(imageBuffer, `reference.${ext}`, { type: mimeType });

    const prompt = isOuro
      ? [
          `Analyze the uploaded image and extract the exact human silhouette, pose, facial orientation, hairstyle and clothing.`,
          ``,
          `Create a luxury 18K gold pendant from this uploaded photo.`,
          ``,
          `Preserve the exact pose, body posture, facial angle, hairstyle, clothing shape, and all recognizable details.`,
          `Transform the subject into a handcrafted high-end jewelry pendant made of polished yellow gold.`,
          ``,
          `IMPORTANT: Do not change the pose. Do not change the body proportions. Do not change the facial structure. Do not create a new person.`,
          ``,
          `Features:`,
          `- Solid 18K gold appearance`,
          `- High-relief sculpted details`,
          `- Fine engraving of facial features`,
          `- Fine engraving of hair`,
          `- Fine engraving of clothing folds`,
          `- Realistic metallic reflections`,
          `- Smooth polished finish`,
          `- Luxury pendant bail integrated at the top`,
          `- Museum-quality sculpture craftsmanship`,
          ``,
          `Photography:`,
          `- Neutral beige-gray luxury studio background`,
          `- Soft diffused studio lighting`,
          `- Centered pendant, front view`,
          `- Isolated pendant only, no hands, no neck, no display stand`,
          `- Soft realistic shadow beneath pendant`,
          `- Clean luxury catalog style`,
          `- No text, no watermark, no additional objects`,
          ``,
          `Ultra realistic. Photorealistic. Luxury jewelry catalog. Macro shot. 8K render. Commercial product photography. Premium e-commerce catalog.`,
        ].join("\n")
      : [
          `Analyze the uploaded image and extract the exact human silhouette, pose, facial orientation, hairstyle and clothing.`,
          ``,
          `Create a premium jewelry pendant from the uploaded photo.`,
          ``,
          `Preserve the person's exact pose, body position, facial orientation, hairstyle, clothing details, and proportions.`,
          `Transform the subject into a highly detailed luxury silver pendant.`,
          ``,
          `IMPORTANT: Do not change the pose. Do not change the body proportions. Do not change the facial structure. Do not create a new person.`,
          ``,
          `Requirements:`,
          `- Convert the entire person into a polished sterling silver sculpture`,
          `- Preserve all recognizable features from the original photo`,
          `- Realistic jewelry manufacturing appearance`,
          `- High-relief metal engraving`,
          `- Fine facial details`,
          `- Sharp clothing folds`,
          `- Detailed hair engraving`,
          `- Smooth polished silver surface`,
          `- Realistic reflections`,
          `- Luxury handcrafted pendant design`,
          `- Integrated pendant bail at the top`,
          `- Centered composition`,
          ``,
          `Background:`,
          `- Neutral light gray studio background`,
          `- Soft shadow beneath pendant`,
          `- Clean luxury catalog style`,
          `- No text, no watermark, no additional objects`,
          ``,
          `Ultra realistic. Macro photography. 8K jewelry rendering. Commercial product photography. Premium e-commerce catalog. Photorealistic silver metal.`,
        ].join("\n");

    console.log("[gerar-joia] Using images.edit with gpt-image-1 (image-to-image)...");

    const response = await (openai.images.edit as Function)({
      model: "gpt-image-1",
      image: file,
      prompt,
      size: "1024x1024",
      quality: "low",
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
