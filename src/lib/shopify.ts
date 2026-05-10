import { toast } from "sonner";

export const SHOPIFY_API_VERSION = '2026-04';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = 'store-store-builder-joaax.myshopify.com';
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = '5da1ec1247816f2b379b4204005b92ad';
export const HALTER_OURO_VARIANT_GID = 'gid://shopify/ProductVariant/48912055468259';

export function normalizeShopifyCheckoutUrl(checkoutUrl: string): string {
  const parsed = new URL(checkoutUrl);
  return `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${parsed.pathname}${parsed.search}`;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    featuredImage?: { url: string; altText: string | null } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    media?: { edges: Array<{ node: { image?: { url: string; altText: string | null } | null } }> };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
          image?: { url: string; altText: string | null } | null;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

export const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id title description handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 10) {
            edges {
              node {
                id title
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id title description handle
      priceRange { minVariantPrice { amount currencyCode } }
      featuredImage { url altText }
      images(first: 20) { edges { node { url altText } } }
      media(first: 20) {
        edges {
          node {
            ... on MediaImage { image { url altText } }
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id title
            price { amount currencyCode }
            availableForSale
            selectedOptions { name value }
            image { url altText }
          }
        }
      }
      options { name values }
    }
  }
`;

const CART_LINE_FRAGMENT = `
  fragment CartLineFields on CartLine {
    id
    quantity
    merchandise {
      ... on ProductVariant {
        id
        title
        image { url altText }
        price { amount currencyCode }
        selectedOptions { name value }
        product {
          id title description handle
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
          media(first: 1) {
            edges {
              node {
                ... on MediaImage { image { url altText } }
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id title
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
                image { url altText }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) { edges { node { ...CartLineFields } } }
    }
  }
  ${CART_LINE_FRAGMENT}
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id checkoutUrl
        lines(first: 100) { edges { node { ...CartLineFields } } }
      }
      userErrors { field message }
    }
  }
  ${CART_LINE_FRAGMENT}
`;

export const HEADLESS_CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id checkoutUrl
        lines(first: 100) { edges { node { ...CartLineFields } } }
      }
      userErrors { field message }
    }
  }
  ${CART_LINE_FRAGMENT}
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export async function storefrontApiRequest(query: string, variables: any = {}) {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const responseText = await response.text();
    let data: any = null;
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch (parseError) {
      console.error('[Shopify] resposta não-JSON:', responseText, parseError);
    }

    if (response.status === 402) {
      console.error('[Shopify] status HTTP:', response.status);
      console.error('[Shopify] resposta completa:', data ?? responseText);
      toast.error("Shopify: pagamento necessário", {
        description: "É necessário um plano Shopify ativo. Acesse admin.shopify.com para fazer upgrade.",
      });
      return;
    }

    if (!response.ok) {
      console.error('[Shopify] status HTTP:', response.status);
      console.error('[Shopify] resposta completa:', data ?? responseText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (data?.errors) {
      console.error('[Shopify] status HTTP:', response.status);
      console.error('[Shopify] resposta completa:', data);
      throw new Error(`Erro no Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
    }

    return data;
  } catch (error) {
    console.error('[Shopify] mensagem de erro do fetch:', error);
    throw error;
  }
}

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: Array<{ field: string[] | null; message: string }>): boolean {
  return userErrors.some(e =>
    e.message.toLowerCase().includes('cart not found') ||
    e.message.toLowerCase().includes('does not exist')
  );
}

export async function createShopifyCart(item: { variantId: string; quantity: number }) {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });
  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error('[Shopify] resposta completa:', data);
    console.error('[Shopify] cartCreate.userErrors:', data.data.cartCreate.userErrors);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) {
    console.error('[Shopify] resposta completa:', data);
    console.error('[Shopify] cartCreate.userErrors:', data?.data?.cartCreate?.userErrors ?? []);
    return null;
  }
  const line = cart.lines.edges[0]?.node;
  const lineId = line?.id;
  if (!lineId) return null;
  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId, line };
}

export async function createDirectCheckout(variantId: string, quantity = 1) {
  const data = await storefrontApiRequest(HEADLESS_CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });
  const cartCreate = data?.data?.cartCreate;
  const userErrors = cartCreate?.userErrors ?? [];

  if (userErrors.length > 0 || !cartCreate?.cart?.checkoutUrl) {
    console.error('[Shopify] resposta completa:', data);
    console.error('[Shopify] cartCreate.userErrors:', userErrors);
    return { success: false, checkoutUrl: null, data, userErrors };
  }

  return {
    success: true,
    checkoutUrl: formatCheckoutUrl(cartCreate.cart.checkoutUrl),
    cartId: cartCreate.cart.id,
    data,
    userErrors,
  };
}

export async function addLineToShopifyCart(cartId: string, item: { variantId: string; quantity: number }) {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });
  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l: any) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id, line: newLine?.node };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId, lines: [{ id: lineId, quantity }],
  });
  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string) {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId, lineIds: [lineId],
  });
  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}
