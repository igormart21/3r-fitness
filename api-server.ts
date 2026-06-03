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
