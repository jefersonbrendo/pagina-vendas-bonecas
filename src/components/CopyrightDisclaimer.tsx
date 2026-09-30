import React from 'react';
import { AlertCircle } from 'lucide-react';

export const CopyrightDisclaimer: React.FC = () => {
  return (
    <section className="py-4 bg-[#FFF9FA]">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-l-4 border-rose-500 shadow-xs border-y border-r border-rose-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="text-xs sm:text-sm font-black text-rose-600 uppercase tracking-wider mb-1">
              PIRATARIA É CRIME
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-medium">
              A reprodução, distribuição ou compartilhamento não autorizado deste material é crime previsto na Lei 9.610/98 e pode resultar em penalidades de até 4 anos de prisão e multa. Valorize o trabalho de criadores independentes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
