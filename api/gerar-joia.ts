import Replicate from "replicate";

// Vercel Edge-compatible handler
export const runtime = "nodejs";
export const maxDuration = 60;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return Response.json({ error: "REPLICATE_API_TOKEN não configurado." }, { status: 500 });
  }

  let body: { imageBase64?: string; material?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body inválido." }, { status: 400 });
  }

  const { imageBase64, material } = body;
  const materialDesc =
    material === "prata"
      ? "sterling silver 925, brushed silver finish"
      : "18k yellow gold, polished gold finish";

  const prompt = [
    "Professional luxury jewelry product photography,",
    `premium sports pendant necklace, ${materialDesc},`,
    "minimalist athletic design, small detailed engraving of a athlete figure,",
    "clean pure white background, soft diffused studio lighting,",
    "ultra-sharp macro photography, shallow depth of field,",
    "high-end retail product shot, no text, no watermark",
  ].join(" ");

  try {
    const replicate = new Replicate({ auth: token });

    // Use FLUX Dev (img2img when photo provided, txt2img otherwise)
    const input: Record<string, unknown> = {
      prompt,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "jpg",
      output_quality: 90,
      num_inference_steps: 28,
    };

    if (imageBase64) {
      // img2img: FLUX Dev uses the uploaded photo as visual reference
      input.image = imageBase64;
      input.strength = 0.65; // 0 = keep original, 1 = ignore original
    }

    const model = imageBase64
      ? "black-forest-labs/flux-dev"     // img2img — uses photo reference
      : "black-forest-labs/flux-schnell"; // txt2img — prompt only (faster, cheaper)

    const output = await replicate.run(model as `${string}/${string}`, { input });

    // Replicate returns array of FileOutput or strings
    const raw = Array.isArray(output) ? output[0] : output;
    const imageUrl = raw instanceof ReadableStream
      ? null
      : raw?.toString?.() ?? null;

    if (!imageUrl) {
      return Response.json({ error: "Sem saída de imagem do modelo." }, { status: 500 });
    }

    return Response.json({ imageUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro inesperado.";
    return Response.json({ error: msg }, { status: 500 });
  }
}
