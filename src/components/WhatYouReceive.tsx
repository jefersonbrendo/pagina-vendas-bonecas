import React, { useState } from 'react';
import {
  Sparkles,
  Eye,
  CheckCircle2,
  X,
  ArrowRight,
  Zap,
  Smartphone,
  Heart,
  Shirt,
  BookOpen,
} from 'lucide-react';
import {
  WHAT_YOU_RECEIVE_ITEMS,
  ASSETS,
} from '../data/content';
import { useDeferredMedia } from '../hooks/useDeferredMedia';

// Curated row of real children playing photos sent by customers
const CHILD_PHOTOS = [
  {
    id: 1,
    url: ASSETS.provaKid1,
    title: 'Brincando e se divertindo',
    caption: 'Momentos reais longe das telas',
  },
  {
    id: 2,
    url: ASSETS.provaKid2,
    title: 'Criatividade e imaginação',
    caption: 'Horas de diversão e criação de histórias',
  },
  {
    id: 3,
    url: ASSETS.provaKid3,
    title: 'Montando e personalizando looks',
    caption: 'Cenários e roupinhas combinando',
  },
  {
    id: 4,
    url: ASSETS.provaKid4,
    title: 'Expressando criatividade com alegria',
    caption: 'Brincadeira saudável e educativa',
  },
  {
    id: 5,
    url: ASSETS.provaKid5,
    title: 'Coleção cheia de encanto',
    caption: 'Momentos únicos de carinho e diversão',
  },
];

interface WhatYouReceiveProps {
  onCtaClick?: () => void;
}

export const WhatYouReceive: React.FC<WhatYouReceiveProps> = ({ onCtaClick }) => {
  const mediaReady = useDeferredMedia();
  // Child Photos Lightbox State
  const [selectedPhoto, setSelectedPhoto] = useState<typeof CHILD_PHOTOS[0] | null>(null);

  return (
    <section
      id="o-que-vai-receber"
      className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#FFF8FA] to-white relative overflow-hidden"
    >
      {/* Target anchor fallback for backwards compatibility */}
      <div id="demonstracao" className="sr-only" />

      {/* Decorative ambient blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none -mr-24" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none -ml-24" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            O QUE VOCÊ VAI RECEBER?
          </h2>
        </div>

        {/* 1. 6 SUMMARY CARDS */}
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_YOU_RECEIVE_ITEMS.map((item) => {
              const badgeConfig =
                item.id === '1'
                  ? { label: '+300 Modelos', icon: Heart, color: 'bg-rose-50 text-rose-700 border-rose-200' }
                  : item.id === '2'
                  ? { label: '+300 Looks', icon: Shirt, color: 'bg-pink-50 text-pink-700 border-pink-200' }
                  : item.id === '3'
                  ? { label: '100% Online', icon: Smartphone, color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' }
                  : item.id === '4'
                  ? { label: 'Passo a Passo', icon: BookOpen, color: 'bg-amber-50 text-amber-800 border-amber-200' }
                  : item.id === '5'
                  ? { label: 'Envio Imediato', icon: Zap, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                  : item.id === '6'
                  ? { label: 'Acesso Vitalício', icon: Sparkles, color: 'bg-purple-50 text-purple-700 border-purple-200' }
                  : null;

              return (
                <div
                  key={item.id}
                  className="relative flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl transition-all duration-300 group overflow-hidden bg-gradient-to-br from-[#FFF5F9] via-[#FFF9FB] to-white border-2 border-pink-200/90 hover:border-pink-300 shadow-2xs hover:shadow-md ring-1 ring-pink-300/20 hover:-translate-y-0.5"
                >
                  {/* Subtle top gradient accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400" />

                  {/* Gradient Icon */}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform bg-gradient-to-br from-[#FF007A] to-[#C026D3] text-white shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug group-hover:text-pink-600 transition-colors">
                      {item.title}
                    </h4>
                    {badgeConfig && (
                      <div className="mt-1 mb-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${badgeConfig.color}`}
                        >
                          <badgeConfig.icon className="w-2.5 h-2.5" />
                          {badgeConfig.label}
                        </span>
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. REAL CHILDREN PLAYING GALLERY (MARQUEE) */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Veja as pequenas de outras mães
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fotos reais enviadas por famílias que já resgataram as brincadeiras longe das telas
            </p>
            <div className="mt-2 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-pink-50/80 border border-pink-100 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-500" />
                Todas as fotos foram publicadas com a expressa permissão e autorização das mães
              </span>
            </div>
          </div>

          <div className="relative w-full overflow-hidden py-2 group">
            {/* Edge fade */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="animate-infinite-scroll flex gap-3 sm:gap-4 items-center">
              {[...CHILD_PHOTOS, ...CHILD_PHOTOS].map((photo, index) => (
                <div
                  key={`${photo.id}-${index}`}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group/card relative w-56 sm:w-64 md:w-72 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-pink-100"
                >
                  <img
                    src={mediaReady ? photo.url : undefined}
                    alt={photo.title}
                    width={288}
                    height={216}
                    decoding="async"
                    className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-500 select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                    <span className="text-xs sm:text-sm font-bold leading-tight">{photo.title}</span>
                    <span className="text-[11px] text-pink-200 mt-0.5 line-clamp-1">{photo.caption}</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-3">
              <span className="text-[11px] font-semibold text-slate-400 inline-flex items-center gap-1.5">
                <span>↔ Passe o mouse ou toque para pausar o carrossel</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3. CTA BUTTON */}
        {onCtaClick && (
          <div className="text-center pt-2">
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-4.5 bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] hover:from-[#E11D74] hover:to-[#9333EA] text-white font-black text-base sm:text-lg rounded-full shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pulse-cta inline-flex items-center justify-center gap-2"
            >
              <span>QUERO GARANTIR ESSE MATERIAL AGORA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium">
              Recebimento imediato no seu e-mail · Acesso vitalício aos arquivos
            </p>
          </div>
        )}
      </div>

      {/* Lightbox for Child Playing Photos */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-72 sm:h-96 object-cover rounded-2xl"
            />
            <div className="mt-4 px-2">
              <h4 className="text-lg font-bold text-slate-900">{selectedPhoto.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
