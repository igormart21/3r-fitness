import express from "express";
import OpenAI, { toFile } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "20mb" }));

app.post("/api/gerar-joia", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY não configurado." });
  }

  const { imageBase64, material } = req.body as { imageBase64?: string; material?: string };

  if (!imageBase64) {
    return res.status(400).json({ error: "Nenhuma imagem enviada." });
  }

  const isOuro = material !== "prata";

  const openai = new OpenAI({ apiKey });

  try {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const file = await toFile(imageBuffer, "reference.png", { type: "image/png" });

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

    console.log("[IA] Gerando pingente com gpt-image-1 images.edit (image-to-image)...");

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: file,
      prompt,
      size: "1024x1024",
    } as Parameters<typeof openai.images.edit>[0]);

    const item = response.data[0];
    // gpt-image-1 retorna b64_json por padrão
    const imageUrl =
      (item as any)?.url ??
      ((item as any)?.b64_json
        ? `data:image/png;base64,${(item as any).b64_json}`
        : null);

    if (!imageUrl) return res.status(500).json({ error: "Sem imagem gerada." });

    console.log("[IA] Pingente gerado com sucesso!");
    return res.json({ imageUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[IA] Erro:", msg);
    return res.status(500).json({ error: msg });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API local rodando em http://localhost:${PORT}`));
