import React from 'react';
import { Gift, Check } from 'lucide-react';
import { BONUSES } from '../data/content';
import { useDeferredMedia } from '../hooks/useDeferredMedia';

// Bônus que vêm em todos os pacotes, logo acima da seção "Escolha seu pacote"
export const BonusSection: React.FC = () => {
  const mediaReady = useDeferredMedia();

  return (
    <section
      id="bonus"
      className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#FBF5FF] to-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-3 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
            <Gift className="w-3.5 h-3.5 text-purple-500" />
            <span>Bônus em todos os pacotes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Receba 3 Bônus Incríveis <span className="text-emerald-600">GRÁTIS!</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium mt-2">
            Qualquer pacote que você escolher vem com estes 3 kits extras, sem pagar nada a mais:
          </p>
        </div>

        {/* 3 Bonus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {BONUSES.map((bonus, idx) => (
            <div
              key={bonus.id}
              className="relative rounded-3xl bg-white border-2 border-purple-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Bonus number ribbon */}
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                <Gift className="w-3.5 h-3.5" />
                Bônus #{idx + 1}
              </div>

              {/* Cover */}
              <div className="aspect-[4/3] w-full bg-gradient-to-b from-purple-50 to-white overflow-hidden">
                <img
                  src={mediaReady ? bonus.image : undefined}
                  alt={`Prévia do kit ${bonus.title}`}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  Kit {bonus.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-1.5">
                  {bonus.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Valor total dos bônus */}
        <div className="mt-8 sm:mt-10 max-w-md mx-auto text-center rounded-3xl bg-white border-2 border-dashed border-emerald-300 px-5 py-5 shadow-sm">
          <p className="text-sm sm:text-base font-bold text-slate-600">
            Valor total dos bônus:{' '}
            <span className="font-black text-slate-500 line-through decoration-rose-500 decoration-2">R$ 97,00</span>
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-sm sm:text-base font-black uppercase tracking-wide shadow-md shadow-emerald-500/25">
            <Check className="w-4 h-4 stroke-[3] shrink-0" />
            Hoje sai de graça
          </span>
        </div>
      </div>
    </section>
  );
};
