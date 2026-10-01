import React from 'react';
import { Gift, Check } from 'lucide-react';
import { ALEGRIA_BONUSES } from '../data/content';
import { useDeferredMedia } from '../hooks/useDeferredMedia';

// Bônus do Pacote Alegria, logo acima da seção "Escolha seu pacote"
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
            <span>Bônus do Pacote Alegria</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Ganhe 3 bônus exclusivos
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium mt-2">
            Escolhendo o <span className="font-extrabold text-pink-600">Pacote Alegria</span>, você
            recebe estes 3 kits extras sem pagar nada a mais:
          </p>
        </div>

        {/* 3 Bonus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {ALEGRIA_BONUSES.map((bonus, idx) => (
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

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-800 bg-purple-50 border border-purple-100 px-4 py-2 rounded-full text-center">
            <Check className="w-4 h-4 text-purple-600 stroke-[3] shrink-0" />
            Os 3 bônus vêm incluídos no Pacote Alegria
          </span>
        </div>
      </div>
    </section>
  );
};
