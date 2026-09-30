import { useEffect, useState } from 'react';

// Leva os parâmetros de rastreamento do endereço da página (utm_*, src, sck, fbclid...)
// para o link de checkout, sem sobrescrever os que já estiverem nele (ex.: os que a UTMify adicionou).
// Assim a Lowify recebe a origem da venda mesmo que o script da UTMify ainda não tenha rodado.
export function withTrackingParams(checkoutUrl: string): string {
  if (typeof window === 'undefined') return checkoutUrl;
  try {
    const target = new URL(checkoutUrl, window.location.href);
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (!target.searchParams.has(key)) target.searchParams.append(key, value);
    });
    return target.toString();
  } catch {
    return checkoutUrl;
  }
}

// href de checkout para links que vêm no HTML pré-renderizado: começa com a URL pura
// (igual ao servidor) e ganha os parâmetros logo após montar.
// Não use onClick nesses links: o React coloca um onclick vazio no elemento e o pixel da UTMify,
// ao rastrear o Initiate Checkout, chama esse onclick em vez de abrir o checkout.
export function useCheckoutHref(checkoutUrl: string): string {
  const [href, setHref] = useState(checkoutUrl);
  useEffect(() => setHref(withTrackingParams(checkoutUrl)), [checkoutUrl]);
  return href;
}
