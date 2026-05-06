import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartUIStore } from "@/stores/cartUIStore";
import { LINHAS, type Material } from "@/data/atelie";

// Mapa: slug da linha → handle do produto Shopify
const ATELIE_HANDLES: Record<string, string> = {
  halter: "halter-1",
  vigor: "vigor",
};

// Override explícito de variant ID por linha + material (ID numérico Shopify).
// Garante que a variante exata configurada na Shopify seja usada no checkout.
const VARIANT_ID_OVERRIDES: Record<string, Partial<Record<Material, string>>> = {
  halter: {
    ouro: "48912055468259",
    prata: "48912055501027",
  },
};

function toGid(numericId: string) {
  return `gid://shopify/ProductVariant/${numericId}`;
}

function matchVariantByMaterial(product: any, material: Material, slug: string) {
  const variants = product?.variants?.edges ?? [];
  const overrideId = VARIANT_ID_OVERRIDES[slug]?.[material];
  if (overrideId) {
    const gid = toGid(overrideId);
    const byId = variants.find((v: any) => v.node.id === gid);
    if (byId) return byId.node;
  }
  const target = material === "ouro" ? "ouro" : "prata";
  const byOption = variants.find((v: any) =>
    v.node.selectedOptions?.some((o: any) => o.value?.toLowerCase().includes(target))
  );
  if (byOption) return byOption.node;
  const byTitle = variants.find((v: any) => v.node.title?.toLowerCase().includes(target));
  if (byTitle) return byTitle.node;
  return variants[0]?.node;
}

export async function addAtelieLineToCart(
  slug: string,
  material: Material,
): Promise<{ success: boolean; error?: string }> {
  const handle = ATELIE_HANDLES[slug];
  if (!handle) return { success: false, error: "Linha ainda não configurada." };

  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
    const product = data?.data?.product;
    if (!product) return { success: false, error: "Produto não encontrado." };

    const variant = matchVariantByMaterial(product, material, slug);
    if (!variant) return { success: false, error: "Variação não disponível." };

    // Resolve imagem com prioridade: variante → featured → images → media
    const variantImg = variant.image?.url ? { url: variant.image.url, altText: variant.image.altText ?? null } : null;
    const featuredImg = product.featuredImage?.url
      ? { url: product.featuredImage.url, altText: product.featuredImage.altText ?? null }
      : null;
    const productImgs: Array<{ url: string; altText: string | null }> =
      product.images?.edges?.map((e: any) => ({ url: e.node.url, altText: e.node.altText ?? null })) ?? [];
    const mediaImgs: Array<{ url: string; altText: string | null }> =
      product.media?.edges
        ?.map((e: any) => e.node?.image)
        .filter(Boolean)
        .map((i: any) => ({ url: i.url, altText: i.altText ?? null })) ?? [];
    const atelieImg = LINHAS[slug]?.imagens?.[material]
      ? { url: LINHAS[slug].imagens[material], altText: `${LINHAS[slug].nome} ${material === "ouro" ? "Ouro" : "Prata"}` }
      : null;

    const orderedImgs = [variantImg, featuredImg, ...productImgs, ...mediaImgs, atelieImg].filter(
      (img): img is { url: string; altText: string | null } => !!img?.url,
    );
    // Dedupe por url, preservando ordem
    const seen = new Set<string>();
    const dedupedImgs = orderedImgs.filter((i) => (seen.has(i.url) ? false : (seen.add(i.url), true)));

    const productForCart: ShopifyProduct = {
      node: {
        id: product.id,
        title: product.title,
        description: product.description,
        handle: product.handle,
        featuredImage: featuredImg,
        priceRange: product.priceRange ?? {
          minVariantPrice: variant.price,
        },
        images: { edges: dedupedImgs.map((node) => ({ node })) },
        media: product.media ?? { edges: [] },
        variants: product.variants,
        options: product.options ?? [],
      },
    };

    await useCartStore.getState().addItem({
      product: productForCart,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
      thumbnailImage: dedupedImgs[0] ?? null,
    });

    // Garante que items persistidos antigos (sem imagem) recebam o produto atualizado
    useCartStore.setState((state) => ({
      items: state.items.map((it) =>
        it.variantId === variant.id ? { ...it, product: productForCart, thumbnailImage: dedupedImgs[0] ?? null } : it,
      ),
    }));

    useCartUIStore.getState().openCart();
    return { success: true };
  } catch (err: any) {
    console.error("addAtelieLineToCart failed:", err);
    return { success: false, error: "Não foi possível adicionar ao carrinho." };
  }
}
