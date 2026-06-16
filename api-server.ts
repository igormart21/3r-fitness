import express from "express";
import OpenAI, { toFile } from "openai";
import * as dotenv from "dotenv";
import { uploadJoiaImage } from "./api/_lib/uploadJoia";

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

    // ── gpt-image-1 edit: a própria foto é enviada (images.edit), então o
    //    modelo já enxerga a pose/silhueta — sem etapa de Vision (mais rápido) ──
    const metalSurface = isOuro
      ? "real polished 18K yellow gold — authentic warm golden precious-metal color with a realistic gold metallic sheen and soft reflective highlights, exactly like genuine gold jewelry (NOT a flat yellow, NOT painted, NOT plastic)"
      : "real polished sterling silver 925 — authentic bright silver-white precious-metal color with a realistic silver metallic sheen and soft reflective highlights, exactly like genuine silver jewelry (NOT plain gray, NOT black-and-white, NOT matte paint)";

    const bgColor = isOuro
      ? "warm neutral beige-gray studio background"
      : "neutral gray studio background (RGB ~175,175,175)";

    const prompt = [
      `Transform the person in this uploaded photo into a HIGHLY DETAILED ${metalSurface} portrait pendant, sculpted in fine BAS-RELIEF (low-relief 3D embossed metal) exactly like a premium custom jewelry piece. Use the uploaded image as the PRIMARY reference and reproduce the person faithfully.`,
      ``,
      `ABSOLUTE PRIORITY — MAXIMUM DETAIL & FIDELITY: Reproduce EVERY detail visible in the photo with rich, realistic engraving. This must look like a luxury laser-engraved + embossed metal relief portrait, NOT a flat minimalist silhouette and NOT a simple outline cartoon.`,
      `Preserve faithfully and render in sculpted relief + fine engraved lines:`,
      `• The exact pose, body proportions and silhouette of the person`,
      `• Facial features and expression (eyes/sunglasses, nose, smile, jawline) — recognizable`,
      `• Hair strands and hairstyle, cap/hat with its seams and curve`,
      `• Clothing with realistic fabric folds, wrinkles, seams, hems, and any printed text or logos on the shirt`,
      `• Race bib / number, accessories (sunglasses, watch, belt)`,
      `• Hands and individual fingers, shoe laces, soles, stripes and shoe details`,
      ``,
      `RELIEF & ENGRAVING STYLE (this is the key look):`,
      `• Sculpted low-relief (bas-relief) so the figure has real depth and dimension — raised areas catch the light, recessed areas (folds, contours, details) fall into soft shadow`,
      `• Fine crisp engraved contour lines for all internal detail (face, fabric folds, finger separation, shoe detail), like detailed metal etching`,
      `• Rich tonal range across the polished ${isOuro ? "gold" : "silver"} surface — bright specular highlights on raised edges, gradual mid-tones, and darker engraved recesses, giving a true hand-crafted relief look`,
      `• The outer edge is a precision cut that follows the person's exact outline`,
      ``,
      `MATERIAL: ${metalSurface}. The whole piece is ONE solid precious metal — realistic metallic sheen and reflections, absolutely NOT grayscale, NOT painted, NOT plastic, NOT a flat single color.`,
      ``,
      `BAIL: small polished pendant bail loop at the very top in matching metal, attached to the topmost point.`,
      ``,
      `PRODUCT PHOTOGRAPHY:`,
      `• Background: ${bgColor}, perfectly uniform — professional e-commerce product photography`,
      `• Lighting: soft directional studio light that reveals the relief depth — clear metallic highlights and shadows across the sculpted surface so it unmistakably reads as real ${isOuro ? "gold" : "silver"}; subtle drop shadow only, no shadows on the background`,
      `• Camera: straight-on front view, FULL pendant visible — pendant max 60% of image height, ~20% empty space at top, ~20% at bottom, ~10% on each side`,
      `• CRITICAL: bail loop fully visible at top with space above, feet/base fully visible at bottom with space below — NOTHING cut off`,
      `• NO chain, NO neck, NO hand holding it, NO stand, NO props`,
      `• Ultra sharp 8K macro jewelry photography — every engraved line and relief detail crisp, clean and richly defined`,
      `• Premium luxury jewelry catalog quality`,
      `• NO text caption, NO watermark, NO logo added by you`,
    ].join("\n");

    console.log("[IA] gerando pingente com gpt-image-1 portrait 1024x1536 (quality HIGH, alto-relevo detalhado)...");

    // portrait para dar mais espaço vertical ao pingente (bail no topo, pés na base)
    const response = await (openai.images.edit as Function)({
      model: "gpt-image-1",
      image: imageFile,
      prompt,
      size: "1024x1536",
      input_fidelity: "high",
      quality: "high",
    });

    const item     = (response as any).data?.[0];
    const b64      = item?.b64_json as string | undefined;
    const dataUrl  = b64 ? `data:image/png;base64,${b64}` : (item?.url ?? null);

    if (!dataUrl) return res.status(500).json({ error: "Sem imagem gerada." });

    let storageUrl: string | null = null;
    if (b64) storageUrl = await uploadJoiaImage(Buffer.from(b64, "base64"));

    console.log("[IA] Pingente gerado com sucesso!", storageUrl ? "(storage OK)" : "(sem storage)");
    return res.json({ imageUrl: storageUrl ?? dataUrl, storageUrl });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro inesperado.";
    console.error("[IA] Erro:", msg);
    return res.status(500).json({ error: msg });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API local rodando em http://localhost:${PORT}`));
