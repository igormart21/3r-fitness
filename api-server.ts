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

    console.log("[IA] Gerando pingente com gpt-image-1-mini images.edit...");

    const response = await (openai.images.edit as Function)({
      model: "gpt-image-1-mini",
      image: imageFile,
      prompt,
      size: "1024x1024",
    });

    const item     = (response as any).data?.[0];
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
