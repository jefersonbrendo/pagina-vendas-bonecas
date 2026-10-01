import React, { useEffect, useState } from 'react';
import { CalendarDays, Flame } from 'lucide-react';

// Data de hoje no horário de Brasília, ex.: "30/09/2026"
const formatToday = () =>
  new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

export const UrgencyBar: React.FC = () => {
  // Começa vazio também no navegador, para bater com o HTML pré-renderizado (a data do build já estaria velha);
  // o efeito preenche com a data do dia e atualiza se a página ficar aberta na virada do dia.
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(formatToday());
    const interval = setInterval(() => setToday(formatToday()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="banner"
      className="sticky top-0 z-40 bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] text-white shadow-sm transition-all"
    >
      <div className="max-w-5xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-wide">
        <Flame className="w-4 h-4 text-amber-300 shrink-0" fill="currentColor" />
        <span className="uppercase text-[11px] sm:text-xs tracking-wider">A PROMOÇÃO TERMINA HOJE</span>
        <div className="flex items-center gap-1 bg-black/30 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/30 font-mono font-extrabold text-white">
          <CalendarDays className="w-3.5 h-3.5 text-amber-200" />
          {/* Placeholder invisível do mesmo tamanho até a data ser calculada, para a barra não mudar de largura */}
          <span className={`tabular-nums ${today ? '' : 'invisible'}`}>{today ?? '00/00/0000'}</span>
        </div>
      </div>
    </div>
  );
};
