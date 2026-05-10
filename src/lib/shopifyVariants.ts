import { toast } from "sonner";
import { createDirectCheckout } from "@/lib/shopify";

/**
 * MAPA GLOBAL DE VARIANTES SHOPIFY — 3R Fitness
 *
 * Estrutura: modalidade → linha → chave de variação → variantId Shopify (GID).
 *
 * Chave de variação:
 *  - Apenas material:           "ouro" | "prata"
 *  - Material + gênero:         "ouro_masculino" | "ouro_feminino" | "prata_masculino" | "prata_feminino"
 *
 * Para ativar uma peça basta colar o GID Shopify no lugar do `null`.
 * Enquanto estiver `null`, o botão exibe "Em breve" e o checkout fica desativado.
 */
export type VariantId = string | null;

export const SHOPIFY_VARIANTS_MAP: Record<string, Record<string, Record<string, VariantId>>> = {
  musculacao: {
    halter: {
      ouro: "gid://shopify/ProductVariant/48912055468259",
      prata: "gid://shopify/ProductVariant/48912055501027",
    },
    vigor: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: "gid://shopify/ProductVariant/48914112381155",
      prata_feminino: "gid://shopify/ProductVariant/48914112413923",
    },
  },
  crossfit: {
    imperium: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: "gid://shopify/ProductVariant/48916550811875",
      prata_feminino: "gid://shopify/ProductVariant/48916550844643",
    },
    strata: {
      ouro: null,
      prata: "gid://shopify/ProductVariant/48914278514915",
    },
  },
  corrida: {
    triade: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: null,
      prata_feminino: null,
    },
    ritmo: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: null,
      prata_feminino: null,
    },
  },
  ciclismo: {
    velox: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: "gid://shopify/ProductVariant/48914239160547",
      prata_feminino: "gid://shopify/ProductVariant/48914239193315",
    },
    cadencia: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: "gid://shopify/ProductVariant/48914242601187",
      prata_feminino: "gid://shopify/ProductVariant/48914242633955",
    },
  },
  triathlon: {
    velarion: {
      ouro: null,
      prata: "gid://shopify/ProductVariant/48914269077731",
    },
    elite: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: "gid://shopify/ProductVariant/48914263900387",
      prata_feminino: "gid://shopify/ProductVariant/48914263933155",
    },
  },
  fisiculturismo: {
    vigor: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: "gid://shopify/ProductVariant/48914112381155",
      prata_feminino: "gid://shopify/ProductVariant/48914112413923",
    },
    imperium: {
      ouro_masculino: null,
      ouro_feminino: null,
      prata_masculino: "gid://shopify/ProductVariant/48916550811875",
      prata_feminino: "gid://shopify/ProductVariant/48916550844643",
    },
  },
};

/**
 * Mapa reverso: linha → modalidade primária (para lookups por linha).
 * Se a linha existir em mais de uma modalidade, a primeira encontrada é usada.
 */
const LINHA_TO_MODALIDADE: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [modalidade, linhas] of Object.entries(SHOPIFY_VARIANTS_MAP)) {
    for (const linha of Object.keys(linhas)) {
      if (!map[linha]) map[linha] = modalidade;
    }
  }
  return map;
})();

/**
 * Recupera o variantId para uma linha + material (+ gênero opcional).
 * Aceita lookup direto pela linha (sem precisar saber a modalidade).
 */
export function getVariantId(
  linha: string,
  material: "ouro" | "prata",
  genero?: "masculino" | "feminino",
  modalidade?: string,
): VariantId {
  const mod = modalidade ?? LINHA_TO_MODALIDADE[linha];
  if (!mod) return null;
  const linhaMap = SHOPIFY_VARIANTS_MAP[mod]?.[linha];
  if (!linhaMap) return null;
  const keyWithGenero = genero ? `${material}_${genero}` : null;
  if (keyWithGenero && keyWithGenero in linhaMap) return linhaMap[keyWithGenero];
  if (material in linhaMap) return linhaMap[material];
  return null;
}

/**
 * Inicia o checkout headless Shopify de forma global.
 * - Cria o cart via Storefront API (cartCreate)
 * - Aguarda o checkoutUrl oficial
 * - Redireciona na MESMA aba (sem popup, sem /cart manual)
 * - Mostra toast premium em caso de erro
 * - Loga o erro completo no console para diagnóstico
 *
 * Use o callback `onLoadingChange` para acionar o estado de loading premium do botão.
 */
export async function startShopifyCheckout(
  variantId: VariantId,
  options: {
    quantity?: number;
    onLoadingChange?: (loading: boolean) => void;
  } = {},
): Promise<{ success: boolean; checkoutUrl?: string }> {
  const { quantity = 1, onLoadingChange } = options;

  if (!variantId) {
    toast.message("Em breve", {
      description: "Esta peça estará disponível em breve.",
    });
    return { success: false };
  }

  onLoadingChange?.(true);
  try {
    const cartCreateResult = await createDirectCheckout(variantId, quantity);
    if (!cartCreateResult.success || !cartCreateResult.checkoutUrl) {
      console.error("[startShopifyCheckout] cartCreate falhou", {
        variantId,
        result: cartCreateResult,
      });
      toast.error("Não foi possível iniciar o checkout. Tente novamente.");
      onLoadingChange?.(false);
      return { success: false };
    }
    const checkoutUrl = cartCreateResult.data?.data?.cartCreate?.cart?.checkoutUrl;
    if (!checkoutUrl) {
      console.error("[startShopifyCheckout] checkoutUrl ausente no retorno");
      toast.error("Não foi possível iniciar o checkout. Tente novamente.");
      onLoadingChange?.(false);
      return { success: false };
    }

    const original = new URL(checkoutUrl);
    const finalCheckoutUrl =
      "https://checkout.3rfitness.com.br" +
      original.pathname +
      original.search +
      original.hash;

    console.log("checkoutUrl original Shopify:", checkoutUrl);
    console.log("finalCheckoutUrl checkout domain:", finalCheckoutUrl);

    window.location.replace(finalCheckoutUrl);
    return { success: true, checkoutUrl: finalCheckoutUrl };
  } catch (error) {
    console.error("[startShopifyCheckout] erro inesperado:", error);
    toast.error("Não foi possível iniciar o checkout. Tente novamente.");
    onLoadingChange?.(false);
    return { success: false };
  }
}
