import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-[#0F172A] text-slate-300 text-xs text-center border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 space-y-3">
        <p className="font-semibold text-slate-200">
          © 2026 +300 Bonecas de Papel — Todos os direitos reservados.
        </p>

        <p className="text-[11px] text-slate-300 max-w-xl mx-auto leading-relaxed">
          Este site não é afiliado ao Facebook, Google, TikTok ou qualquer outra entidade de mídia social. Todos os conteúdos digitais são de autoria protegida.
        </p>

        <div className="flex items-center justify-center gap-4 text-[11px] pt-1 text-slate-300 font-medium">
          <span className="hover:text-pink-300 transition-colors cursor-pointer">Termos de Uso</span>
          <span>·</span>
          <span className="hover:text-pink-300 transition-colors cursor-pointer">Políticas de Privacidade</span>
          <span>·</span>
          <span className="hover:text-pink-300 transition-colors cursor-pointer">Suporte ao Cliente</span>
        </div>
      </div>
    </footer>
  );
};
