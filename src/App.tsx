/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { UrgencyBar } from './components/UrgencyBar';
import { HeroSection } from './components/HeroSection';
import { PricingPlan } from './types';
import { PRICING_PLANS } from './data/content';

// Below-the-fold components code-split for maximum mobile performance & minimal TBT
const WhatYouReceive = lazy(() =>
  import('./components/WhatYouReceive').then((m) => ({ default: m.WhatYouReceive }))
);
const AboutCreator = lazy(() =>
  import('./components/AboutCreator').then((m) => ({ default: m.AboutCreator }))
);
const SocialProof = lazy(() =>
  import('./components/SocialProof').then((m) => ({ default: m.SocialProof }))
);
const PricingSection = lazy(() =>
  import('./components/PricingSection').then((m) => ({ default: m.PricingSection }))
);
const GuaranteeSection = lazy(() =>
  import('./components/GuaranteeSection').then((m) => ({ default: m.GuaranteeSection }))
);
const CopyrightDisclaimer = lazy(() =>
  import('./components/CopyrightDisclaimer').then((m) => ({ default: m.CopyrightDisclaimer }))
);
const FaqSection = lazy(() =>
  import('./components/FaqSection').then((m) => ({ default: m.FaqSection }))
);
const FinalCta = lazy(() =>
  import('./components/FinalCta').then((m) => ({ default: m.FinalCta }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const StickyBottomCta = lazy(() =>
  import('./components/StickyBottomCta').then((m) => ({ default: m.StickyBottomCta }))
);

// Code-split Modals loaded on-demand
const CheckoutModal = lazy(() =>
  import('./components/CheckoutModal').then((m) => ({ default: m.CheckoutModal }))
);
const AlegriaOfferModal = lazy(() =>
  import('./components/AlegriaOfferModal').then((m) => ({ default: m.AlegriaOfferModal }))
);

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAlegriaOfferOpen, setIsAlegriaOfferOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(PRICING_PLANS[1]); // Default to Alegria + Bônus
  const [isBelowFoldReady, setIsBelowFoldReady] = useState(false);

  // Progressive hydration: Give immediate 100% CPU priority to Hero (FCP & LCP)
  useEffect(() => {
    const onUserInteraction = () => setIsBelowFoldReady(true);
    window.addEventListener('scroll', onUserInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', onUserInteraction, { passive: true, once: true });
    window.addEventListener('wheel', onUserInteraction, { passive: true, once: true });

    // Fallback after initial page settling
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setIsBelowFoldReady(true), { timeout: 1000 });
      } else {
        setIsBelowFoldReady(true);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('pointerdown', onUserInteraction);
      window.removeEventListener('wheel', onUserInteraction);
    };
  }, []);

  const scrollToPricing = () => {
    setIsBelowFoldReady(true);
    setTimeout(() => {
      const el = document.getElementById('ofertas') || document.getElementById('precos');
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - 45; // Offset for sticky top urgency bar
        
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth',
        });

        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch {
          // Fallback already handled by window.scrollTo
        }
      }
    }, 10);
  };

  const scrollToNext = () => {
    setIsBelowFoldReady(true);
    setTimeout(() => {
      const el = document.getElementById('o-que-vai-receber') || document.getElementById('demonstracao');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 10);
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleRequestBasic = () => {
    setIsAlegriaOfferOpen(true);
  };

  const handleAcceptAlegriaOffer = (plan: PricingPlan) => {
    setIsAlegriaOfferOpen(false);
    window.location.href = plan?.checkoutUrl || 'https://pay.lowify.com.br/go.php?offer=1b1b44d3';
  };

  const handleContinueWithBasic = (plan: PricingPlan) => {
    setIsAlegriaOfferOpen(false);
    window.location.href = plan?.checkoutUrl || 'https://pay.lowify.com.br/checkout.php?product_id=Abi8Xx';
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-pink-300 selection:text-pink-900 pb-16 sm:pb-0">
      {/* 1. Urgency Bar on Top */}
      <UrgencyBar onCtaClick={scrollToPricing} />

      <main className="flex-1">
        {/* 2. Critical Hero Section (Immediate Render for FCP & LCP) */}
        <HeroSection
          onCtaClick={scrollToPricing}
          onScrollDown={scrollToNext}
        />

        {/* 3. Below-the-fold Progressive Content */}
        {isBelowFoldReady && (
          <Suspense fallback={<div className="min-h-[200px]" />}>
            {/* O que você vai receber */}
            <WhatYouReceive onCtaClick={scrollToPricing} />

            {/* Quem eu sou */}
            <AboutCreator />

            {/* Prova Social: Testimonials + Quantified Mothers */}
            <SocialProof />

            {/* Seção de Pacotes / Preços */}
            <PricingSection
              onSelectPlan={handleSelectPlan}
              onSelectBasic={handleRequestBasic}
            />

            {/* Selo de Garantia: 7 Dias + Compra Segura */}
            <GuaranteeSection />

            {/* Aviso Legal: Pirataria é Crime */}
            <CopyrightDisclaimer />

            {/* FAQ em formato acordeão */}
            <FaqSection />

            {/* CTA Final */}
            <FinalCta onCtaClick={scrollToPricing} />

            {/* Rodapé simples com direitos autorais */}
            <Footer />

            {/* Sticky Bottom Bar on Mobile */}
            <StickyBottomCta onCtaClick={scrollToPricing} />
          </Suspense>
        )}
      </main>

      {/* Lazy Modals loaded on-demand */}
      <Suspense fallback={null}>
        {isAlegriaOfferOpen && (
          <AlegriaOfferModal
            isOpen={isAlegriaOfferOpen}
            onClose={() => setIsAlegriaOfferOpen(false)}
            onAcceptAlegria={handleAcceptAlegriaOffer}
            onContinueBasic={handleContinueWithBasic}
          />
        )}
        {isCheckoutOpen && (
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            selectedPlan={selectedPlan}
            onSelectPlan={(plan) => setSelectedPlan(plan)}
          />
        )}
      </Suspense>
    </div>
  );
}
