const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { imageDataUrl, material, estilo, genero, inscricao } = await req.json();

    if (!imageDataUrl || typeof imageDataUrl !== "string") {
      return new Response(JSON.stringify({ error: "imageDataUrl é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isOuro = material === "Ouro 18K";
    const metalCor = isOuro
      ? "OURO 18K AMARELO maciço, tom dourado quente e brilhante (#D4AF37), polimento espelhado com reflexos amarelo-dourados intensos. NUNCA prateado, NUNCA cinza, NUNCA branco."
      : "PRATA 925 maciça, tom prateado frio e brilhante (#C0C0C0 / cromado), polimento espelhado com reflexos prateados. NUNCA dourado, NUNCA amarelo, NUNCA cobre.";

    const estiloDesc =
      estilo === "Underground"
        ? "ESTILO UNDERGROUND OBRIGATÓRIO: a miniatura da pessoa DEVE aparecer usando APENAS estes três acessórios urbanos, claramente visíveis e bem esculpidos em relevo no metal: (1) BONÉ na cabeça, (2) ÓCULOS ESCUROS no rosto e (3) RELÓGIO de pulso no braço. PROIBIDO incluir correntes, colares, cordões no pescoço, piercings, tatuagens, capuz, moletom ou qualquer outro acessório além desses três. O pescoço, tronco e pele devem ficar limpos, sem qualquer corrente ou desenho de tatuagem. Apenas boné + óculos + relógio, nada mais."
        : "ESTILO CLÁSSICO: pingente puro e minimalista, apenas a silhueta da pessoa em pose limpa, SEM acessórios extras, contornos suaves e elegantes.";

    const inscricaoTexto = inscricao?.trim()
      ? `Grave delicadamente a inscrição "${inscricao}" na base ou borda do pingente, em tipografia serifada fina e refinada.`
      : "";

    const corEnfase = isOuro
      ? "O PINGENTE INTEIRO DEVE SER 100% DOURADO (ouro amarelo). Cor obrigatória: amarelo-ouro brilhante. Proibido qualquer tom prateado, cinza ou branco no metal."
      : "O PINGENTE INTEIRO DEVE SER 100% PRATEADO (prata polida). Cor obrigatória: prata cromada brilhante. Proibido qualquer tom dourado, amarelo ou cobre no metal.";

    const prompt = `Transforme a pessoa/pose desta foto em uma escultura miniatura tridimensional feita em ${metalCor}, no formato de um pingente de joia de luxo pendurado por uma argolinha pequena no topo. ${corEnfase} Mantenha fielmente a silhueta, postura e proporções da pessoa da foto original. ${estiloDesc}. Acabamento joalheiro premium, reflexos metálicos coerentes com a cor do metal especificado, sombras suaves. ${inscricaoTexto} Fundo neutro preto profundo, iluminação editorial de catálogo de joalheria. Apenas o pingente isolado em destaque, fotografia macro de produto.`;

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                { type: "image_url", image_url: { url: imageDataUrl } },
              ],
            },
          ],
          modalities: ["image", "text"],
        }),
      },
    );

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Tente novamente em instantes." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA esgotados. Adicione créditos no workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(JSON.stringify({ error: "Falha ao gerar pingente" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResponse.json();
    const generatedImageUrl =
      data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImageUrl) {
      console.error("No image in AI response:", JSON.stringify(data).slice(0, 500));
      return new Response(JSON.stringify({ error: "Imagem não retornada pela IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ imageUrl: generatedImageUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("gerar-pingente error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
