import React from 'react';
import { Heart, Sparkles, Check, ArrowRight } from 'lucide-react';

interface WhoIsItForProps {
  onCtaClick?: () => void;
}

const AUDIENCE_ITEMS = [
  {
    id: 1,
    emoji: '👩‍👧',
    title: 'Para a mãe que quer a filha longe da tela',
    description: 'Sem briga, sem choro, com uma brincadeira que ela escolhe sozinha.',
    badge: 'Zero Telas',
    gradient: 'from-pink-500/10 via-rose-500/5 to-transparent',
    borderHover: 'hover:border-pink-300',
    iconBg: 'bg-pink-100 text-pink-700',
  },
  {
    id: 2,
    emoji: '🎀',
    title: 'Para a mãe que brincava disso na infância',
    description: 'E quer passar a brincadeira da banca de jornal pra filha.',
    badge: 'Memória Afetiva',
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    borderHover: 'hover:border-purple-300',
    iconBg: 'bg-purple-100 text-purple-700',
  },
  {
    id: 3,
    emoji: '⏰',
    title: 'Para a mãe sem tempo pra inventar brincadeira',
    description: 'Tudo pronto: é só imprimir, recortar e entregar.',
    badge: '100% Prático',
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderHover: 'hover:border-amber-300',
    iconBg: 'bg-amber-100 text-amber-800',
  },
  {
    id: 4,
    emoji: '🎁',
    title: 'Para quem procura um presente que encanta',
    description: 'Dia das Crianças, aniversário ou lembrancinha, por um preço que cabe no bolso.',
    badge: 'Presente Perfeito',
    gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
    borderHover: 'hover:border-rose-300',
    iconBg: 'bg-rose-100 text-rose-700',
  },
];

export const WhoIsItFor: React.FC<WhoIsItForProps> = ({ onCtaClick }) => {
  return (
    <section
      id="para-quem-e"
      className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#FFF7FA] to-white relative overflow-hidden"
    >
      {/* Decorative ambient blurs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-pink-100/40 rounded-full blur-3xl pointer-events-none -ml-20" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none -mr-20" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-3 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>Para quem é?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Este kit foi feito para você
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium mt-2">
            Identifique-se com os momentos que esse material foi criado para transformar:
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {AUDIENCE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`relative flex items-start gap-4 p-5 sm:p-6 rounded-3xl bg-white border-2 border-pink-100/90 shadow-xs hover:shadow-lg transition-all duration-300 group overflow-hidden ${item.borderHover} hover:-translate-y-0.5`}
            >
              {/* Subtle gradient corner backdrop */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />

              {/* Emoji Icon Container */}
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 bg-pink-50/80 border border-pink-100/80 shadow-2xs group-hover:scale-105 transition-transform">
                <span>{item.emoji}</span>
              </div>

              {/* Text content */}
              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-100">
                    <Check className="w-2.5 h-2.5 text-pink-600 stroke-[3]" />
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-1.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        {onCtaClick && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:px-10 sm:py-4 bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] hover:from-[#E11D74] hover:to-[#9333EA] text-white font-black text-sm sm:text-base rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>SIM! ESSE KIT É EXATAMENTE PARA MIM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
