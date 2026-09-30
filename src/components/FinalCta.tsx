import React from 'react';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

interface FinalCtaProps {
  onCtaClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onCtaClick }) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FFF9FA] border-t border-pink-100">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          Aproveite a Promoção de Hoje
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Sua filha merece tardes mágicas longe das telas
        </h3>
        
        <p className="text-sm text-slate-500 mb-6 font-medium">
          Mais de 300 bonecas prontas para baixar, imprimir e transformar o dia a dia da sua família.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] hover:from-[#E11D74] hover:to-[#9333EA] text-white font-black text-lg sm:text-xl rounded-full shadow-xl shadow-pink-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer pulse-cta flex items-center justify-center gap-2"
          >
            <span>EU QUERO AGORA!</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 mt-2">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Acesso Imediato
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Garantia de 7 Dias
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
