import type React from 'react';

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

// onClick para <a href="checkout">: completa o href na hora do clique, antes da navegação.
export function addTrackingParamsOnClick(e: React.MouseEvent<HTMLAnchorElement>): void {
  e.currentTarget.href = withTrackingParams(e.currentTarget.href);
}
