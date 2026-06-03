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
    // Detecta o tipo MIME real da imagem
    const mimeMatch = imageBase64.match(/^data:(image\/[\w+]+);base64,/);
    const mimeType  = (mimeMatch?.[1] ?? "image/jpeg") as "image/jpeg" | "image/png" | "image/webp";
    const ext       = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
    const base64Data = imageBase64.replace(/^data:image\/[\w+]+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const imageFile   = await toFile(imageBuffer, `photo.${ext}`, { type: mimeType });

    const metalDesc = isOuro
      ? "solid 18K polished yellow gold with warm golden reflections"
      : "solid sterling silver 925 with bright cool metallic surface";

    const bgDesc = isOuro
      ? "neutral beige-gray luxury studio background"
      : "neutral light gray luxury studio background";

    const prompt = [
      `Transform the person in this photo into a single luxury jewelry pendant made of ${metalDesc}.`,
      `CRITICAL: preserve the EXACT same body pose, limb angles, head position, hairstyle, and clothing silhouette from the photo — do not change anything about the posture or proportions.`,
      `Convert the entire figure into a high-relief 3D metal sculpture engraved on the pendant face.`,
      `Sculpting details: fine facial engraving, detailed hair texture, sharp clothing folds, precise body proportions matching the original photo exactly.`,
      `The pendant has an integrated bail loop at the top for a necklace chain.`,
      `Centered on a ${bgDesc}. Soft diffused studio lighting, soft shadow beneath.`,
      `Isolated pendant only — no hands, no chain visible, no neck, no display stand.`,
      `Ultra realistic macro jewelry photography, 8K detail, premium e-commerce catalog. No text, no watermark.`,
    ].join(" ");

    console.log("[IA] Gerando pingente com gpt-image-1-mini images.edit...");

    const response = await (openai.images.edit as Function)({
      model: "gpt-image-1-mini",
      image: imageFile,
      prompt,
      size: "1024x1024",
    });

    const item = (response as any).data?.[0];
    const imageUrl = item?.url ?? (item?.b64_json ? `data:image/png;base64,${item.b64_json}` : null);

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
