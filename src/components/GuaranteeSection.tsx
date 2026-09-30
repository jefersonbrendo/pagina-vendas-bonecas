import React from 'react';
import { ShieldCheck, Lock, HeartHandshake } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FFF9FA]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-pink-100/50 border border-pink-100 flex flex-col items-center">
          
          {/* Shield Icon in rounded pill */}
          <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4 shadow-xs">
            <ShieldCheck className="w-8 h-8 text-pink-600 stroke-[2.2]" />
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
            Garantia Incondicional de 7 Dias
          </h3>

          {/* Guarantee Copy */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-medium max-w-lg">
            Você tem <strong className="text-slate-900 font-extrabold">7 dias</strong> para testar todo o material. Se por qualquer motivo você não ficar satisfeita, basta nos enviar uma mensagem e devolvemos <strong className="text-pink-600 font-extrabold">100% do seu dinheiro</strong>. Sem burocracia, sem perguntas.
          </p>

          {/* Badge: Compra 100% Segura e Protegida */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-black tracking-wide">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Compra 100% Segura e Protegida</span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-pink-400" />
            <span>Risco Zero: Seu investimento está totalmente protegido</span>
          </div>
        </div>
      </div>
    </section>
  );
};
