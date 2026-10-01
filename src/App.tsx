/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, lazy, Suspense } from 'react';
import { UrgencyBar } from './components/UrgencyBar';
import { HeroSection } from './components/HeroSection';
import { WhatYouReceive } from './components/WhatYouReceive';
import { WhoIsItFor } from './components/WhoIsItFor';
import { SocialProof } from './components/SocialProof';
import { BonusSection } from './components/BonusSection';
import { PricingSection } from './components/PricingSection';
import { GuaranteeSection } from './components/GuaranteeSection';
import { CopyrightDisclaimer } from './components/CopyrightDisclaimer';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PricingPlan } from './types';
import { PRICING_PLANS } from './data/content';

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
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(PRICING_PLANS[1]); // Default to Alegria

  const scrollToPricing = () => {
    // Renderiza as seções com content-visibility antes de calcular a posição, senão o scroll para no lugar errado
    document.documentElement.classList.add('cv-off');
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
  };

  const scrollToNext = () => {
    const el = document.getElementById('o-que-vai-receber') || document.getElementById('demonstracao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleRequestBasic = () => {
    setIsAlegriaOfferOpen(true);
  };


  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-pink-300 selection:text-pink-900">
      {/* 1. Urgency Bar on Top */}
      <UrgencyBar />

      <main className="flex-1">
        {/* 2. Critical Hero Section (Immediate Render for FCP & LCP) */}
        <HeroSection
          onCtaClick={scrollToPricing}
          onScrollDown={scrollToNext}
        />

        {/* 3. Below-the-fold Content */}
        {/* O que você vai receber */}
        <div className="cv-auto">
          <WhatYouReceive onCtaClick={scrollToPricing} />
        </div>

        {/* Para quem é */}
        <WhoIsItFor onCtaClick={scrollToPricing} />

        {/* Prova Social: Testimonials + Quantified Mothers */}
        <div className="cv-auto">
          <SocialProof />
        </div>

        {/* Bônus do Pacote Alegria */}
        <BonusSection />

        {/* Seção de Pacotes / Preços */}
        <div className="cv-auto">
          <PricingSection
            onSelectPlan={handleSelectPlan}
            onSelectBasic={handleRequestBasic}
          />
        </div>

        {/* Selo de Garantia: 7 Dias + Compra Segura */}
        <GuaranteeSection />

        {/* Aviso Legal: Pirataria é Crime */}
        <CopyrightDisclaimer />

        {/* FAQ em formato acordeão */}
        <div className="cv-auto">
          <FaqSection />
        </div>

        {/* CTA Final */}
        <FinalCta onCtaClick={scrollToPricing} />

        {/* Rodapé simples com direitos autorais */}
        <Footer />

      </main>

      {/* Lazy Modals loaded on-demand */}
      <Suspense fallback={null}>
        {isAlegriaOfferOpen && (
          <AlegriaOfferModal
            isOpen={isAlegriaOfferOpen}
            onClose={() => setIsAlegriaOfferOpen(false)}
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
