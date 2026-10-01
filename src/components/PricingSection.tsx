import React from 'react';
import { Check, Lock, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { PRICING_PLANS } from '../data/content';
import { PricingPlan } from '../types';
import { useCheckoutHref } from '../utils/checkoutUrl';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onSelectBasic?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan, onSelectBasic }) => {
  const [basicPlan, premiumPlan] = PRICING_PLANS;
  const premiumHref = useCheckoutHref(premiumPlan.checkoutUrl || 'https://pay.lowify.com.br/go.php?offer=9f3a1b8f');

  const handleBasicClick = () => {
    if (onSelectBasic) {
      onSelectBasic();
    } else {
      onSelectPlan(basicPlan);
    }
  };

  return (
    <section
      id="ofertas"
      className="scroll-mt-14 py-16 sm:py-24 bg-gradient-to-b from-[#D91680] via-[#C026D3] to-[#A21CAF] text-white relative overflow-hidden"
    >
      {/* Anchor for precos and ofertas */}
      <span id="precos" className="sr-only">Seção de Ofertas</span>
      {/* Playful background sparkles */}
      <div className="absolute top-0 inset-x-0 h-40 bg-white/5 blur-2xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-white/15 text-pink-100 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Oferta por tempo limitado
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-sm">
            ESCOLHA SEU PACOTE
          </h2>
          <p className="text-pink-100 text-sm sm:text-base font-medium max-w-lg mx-auto mt-2">
            Acesso imediato enviado para o seu e-mail logo após a confirmação.
          </p>
        </div>

        {/* Two Pricing Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          
          {/* Card 1: Pacote Alegria (Mais Escolhido - Em Destaque) */}
          <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-300 flex flex-col justify-between relative transition-transform duration-200 hover:-translate-y-1.5">
            {/* Top Badge: Mais Escolhido */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span>MAIS ESCOLHIDO</span>
            </div>

            <div>
              <div className="text-center pt-2 pb-4 border-b border-slate-100">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {premiumPlan.name}
                </h3>

                <div className="mt-4">
                  <span className="text-xs text-slate-400 font-semibold block">
                    De <span className="line-through">R$ {premiumPlan.originalPrice.toFixed(2).replace('.', ',')}</span> por apenas:
                  </span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-2xl font-black text-emerald-600">R$</span>
                    <span className="text-5xl sm:text-6xl font-black text-emerald-600 tracking-tight">
                      {premiumPlan.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Economize mais de R$ 95 hoje
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-[11px] font-black px-2 py-0.5 rounded-full">
                      -{premiumPlan.discountPercentage}% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Features */}
              <ul className="py-4 space-y-2.5">
                {premiumPlan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Badge: Mais de 80% escolhem esta opção */}
              <div className="text-center mb-3">
                <span className="inline-block text-[11px] font-black text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                  ✨ Mais de 80% das mães escolhem esta opção
                </span>
              </div>
            </div>

            {/* High-Contrast Dominant CTA Button */}
            <div>
              <a
                href={premiumHref}
                className="w-full py-4 sm:py-4.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-base sm:text-lg tracking-wide shadow-lg shadow-amber-400/40 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-2 text-center"
              >
                <span>{premiumPlan.ctaText}</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pagamento 100% seguro · Acesso imediato</span>
              </div>
            </div>
          </div>

          {/* Card 2: Pacote Básico */}
          <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/60 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
            <div>
              <div className="text-center pb-4 border-b border-slate-100">
                <span className="text-xs font-black tracking-wider uppercase text-slate-400">
                  Opção Essencial
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {basicPlan.name}
                </h3>
                
                <div className="mt-4">
                  <span className="text-xs text-slate-400 font-semibold block">Pagamento único</span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-900">R$</span>
                    <span className="text-5xl font-black text-slate-900 tracking-tight">
                      {basicPlan.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 mt-1">
                    <span className="text-xs line-through text-slate-400">
                      De R$ {basicPlan.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-[11px] font-black px-2 py-0.5 rounded-full">
                      -{basicPlan.discountPercentage}% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Benefits with Checks */}
              <ul className="py-6 space-y-3">
                {basicPlan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Neutral / Secondary Button */}
            <div>
              <button
                onClick={handleBasicClick}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{basicPlan.ctaText}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-400 font-medium">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Pagamento 100% seguro · Acesso imediato</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quantified Social Proof Below Both Cards */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 text-white">
          <div className="flex items-center text-yellow-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-300" />
            ))}
          </div>
          <span className="font-extrabold text-sm sm:text-base drop-shadow-xs">
            Mais de 1.054 mães já baixaram e aprovaram
          </span>
        </div>
      </div>
    </section>
  );
};
