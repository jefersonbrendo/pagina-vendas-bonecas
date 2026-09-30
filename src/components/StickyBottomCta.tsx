import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StickyBottomCtaProps {
  onCtaClick: () => void;
}

export const StickyBottomCta: React.FC<StickyBottomCtaProps> = ({ onCtaClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past ~400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-2 px-3 sm:py-2.5 sm:px-6 transition-all animate-in slide-in-from-bottom-2 duration-200">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left price note */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-[10px] sm:text-xs font-bold text-pink-700 bg-pink-100 px-1.5 py-0.5 rounded-sm uppercase tracking-wider inline-flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              Promoção
            </span>
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
            A partir de <strong className="text-emerald-600 font-black">R$ 9,90</strong>
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onCtaClick}
          className="py-2 px-5 sm:py-2.5 sm:px-8 bg-gradient-to-r from-[#FF007A] to-[#C026D3] hover:from-[#E11D74] hover:to-[#A21CAF] text-white font-black text-xs sm:text-sm rounded-full shadow-md shadow-pink-500/25 transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap active:scale-95"
        >
          <span>EU QUERO AGORA!</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
