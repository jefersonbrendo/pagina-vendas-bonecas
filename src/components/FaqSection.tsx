import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/content';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-pink-500" />
            Tire Suas Dúvidas
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            PERGUNTAS FREQUENTES
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Tudo o que você precisa saber antes de garantir suas bonecas
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-pink-300 bg-[#FFF7FA] shadow-xs'
                    : 'border-slate-200 bg-white hover:border-pink-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 hover:text-pink-600 transition-colors cursor-pointer select-none"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-pink-200 text-pink-700 rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-header-${faq.id}`}
                    className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 border-t border-pink-100/60 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Support Note */}
        <div className="mt-8 text-center text-xs text-slate-400">
          Ainda ficou com alguma dúvida? Entre em contato pelo e-mail{' '}
          <span className="font-bold text-pink-600">suporte@bonecasdepapel.com.br</span>
        </div>
      </div>
    </section>
  );
};
