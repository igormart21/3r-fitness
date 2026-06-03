import OpenAI from "openai";

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
    // ── Etapa 1: GPT-4o Vision descreve a pose (~3s) ──
    console.log("[gerar-joia] Etapa 1: analisando foto com GPT-4o...");
    const vision = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: imageBase64, detail: "low" },
            },
            {
              type: "text",
              text: "Describe this person in detail for a jewelry sculptor: exact body pose and limb angles, head orientation, hairstyle and hair length, clothing type and key details, overall body proportions. Be precise and concise, max 5 sentences.",
            },
          ],
        },
      ],
    });

    const description = vision.choices[0]?.message?.content ?? "a person standing upright";
    console.log("[gerar-joia] Descrição:", description);

    // ── Etapa 2: DALL-E 3 gera o pingente (~10s) ──
    const metalDesc = isOuro
      ? "solid 18K polished yellow gold, warm golden color with rich metallic reflections"
      : "solid sterling silver 925, bright cool silver color with polished metallic surface";

    const bgDesc = isOuro
      ? "neutral beige-gray luxury studio background"
      : "neutral light gray studio background";

    const prompt = [
      `A single luxury jewelry pendant made of ${metalDesc}.`,
      `The pendant is a high-relief 3D sculpture depicting: ${description}`,
      `Sculpting style: fine engraving of facial features, detailed hair, clothing folds, realistic body proportions preserved exactly.`,
      `The pendant has an integrated bail loop at the top. Centered on a ${bgDesc}.`,
      `Soft diffused studio lighting, soft shadow beneath, isolated pendant only — no hands, no chain, no neck, no stand.`,
      `Ultra realistic macro jewelry photography, 8K detail, premium e-commerce catalog style. No text, no watermark.`,
    ].join(" ");

    console.log("[gerar-joia] Etapa 2: gerando pingente com DALL-E 3...");
    const image = await (openai.images.generate as Function)({
      model: "gpt-image-1-mini",
      prompt,
      size: "1024x1024",
    });

    const item = (image as any).data?.[0];
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
