import React from 'react';
import { X, Sparkles, Check, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { ALEGRIA_SPECIAL_OFFER, PRICING_PLANS } from '../data/content';
import { addTrackingParamsOnClick } from '../utils/checkoutUrl';

interface AlegriaOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlegriaOfferModal: React.FC<AlegriaOfferModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const basicPlan = PRICING_PLANS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-4 border-2 border-yellow-400 transform-gpu will-change-transform animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Urgency Header */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white p-4 sm:p-5 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1 bg-yellow-400 text-slate-950 font-black text-[11px] px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-slate-950" />
            <span>OFERTA ÚNICA DESTA PÁGINA</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            ESPERE! Que tal levar o Pacote Completo?
          </h3>
          <p className="text-xs sm:text-sm text-pink-100 font-semibold mt-1">
            Liberamos um desconto secreto de última hora para você!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 text-slate-800 space-y-4">
          
          {/* Main Deal Card */}
          <div className="bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 p-4 sm:p-5 rounded-2xl border-2 border-amber-300 relative">
            <div className="text-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
                👑 PACOTE ALEGRIA + BÔNUS
              </span>

              <div className="mt-3">
                <span className="text-xs text-slate-500 block font-semibold">
                  De <span className="line-through">R$ 24,90</span> por apenas:
                </span>
                <div className="flex items-baseline justify-center gap-1 mt-0.5">
                  <span className="text-2xl font-black text-emerald-600">R$</span>
                  <span className="text-5xl font-black text-emerald-600 tracking-tight">16,90</span>
                </div>
                <span className="text-xs font-black text-pink-700 block mt-1">
                  (Por apenas R$ 7,00 a mais do que o plano básico!)
                </span>
              </div>
            </div>

            {/* What is included */}
            <div className="mt-4 pt-3 border-t border-amber-200/80 space-y-2">
              <span className="text-[11px] font-black uppercase text-slate-600 block">
                Você vai desbloquear na hora:
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>+500 Bonecas de Papel</strong> (em vez de só 200)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>100 Cenários</strong> temáticos para historinhas</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>500 Pets fofinhos</strong> de papel</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>120 Casinhas e cômodos</strong> para montar</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Atualizações mensais</strong> com novos temas</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Accept Offer Button */}
          <div className="space-y-3 pt-1">
            <a
              href={ALEGRIA_SPECIAL_OFFER.checkoutUrl || "https://pay.lowify.com.br/go.php?offer=1b1b44d3"}
              onClick={addTrackingParamsOnClick}
              className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-emerald-500/30 transition transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>SIM! QUERO O PACOTE ALEGRIA POR R$ 16,90</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Decline / Continue with Basic */}
            <div className="text-center pt-1 space-y-1">
              <a
                href={basicPlan?.checkoutUrl || "https://pay.lowify.com.br/checkout.php?product_id=Abi8Xx"}
                onClick={addTrackingParamsOnClick}
                className="w-full py-1.5 text-center text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer underline block"
              >
                Não, obrigado. Quero apenas o Básico por R$ 9,90 &rarr;
              </a>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                (Ao clicar acima, você será redirecionada para o checkout seguro de R$ 9,90)
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 font-semibold pt-1">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
            <span>Garantia de 7 dias mantida · Pagamento Seguro</span>
          </div>

        </div>
      </div>
    </div>
  );
};
