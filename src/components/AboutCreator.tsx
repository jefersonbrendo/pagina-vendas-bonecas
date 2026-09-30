import React from 'react';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { ASSETS } from '../data/content';

export const AboutCreator: React.FC = () => {
  return (
    <section id="quem-sou-eu" className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F8] to-[#FFF0F5] relative overflow-hidden">
      {/* Gentle background accent */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-pink-100/60 border border-pink-100">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
            {/* Illustrated Mom Avatar Card */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative">
                {/* Glowing border ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-pink-500 to-purple-400 rounded-full blur-xs" />
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg bg-pink-50">
                  <img
                    src={ASSETS.momAvatar}
                    alt="Foto de perfil de Lúcia Oliveira, criadora das bonecas de papel"
                    width={176}
                    height={176}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/storage/Lucia.png';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 right-2 bg-pink-600 text-white p-2 rounded-full shadow-md">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
              </div>

              <div className="text-center mt-3">
                <span className="text-sm font-black text-slate-800">Lúcia Oliveira</span>
                <span className="block text-xs font-semibold text-pink-600">Mãe da Alice & Criadora</span>
              </div>
            </div>

            {/* Emotional Story Copy */}
            <div className="flex-1 text-slate-700 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Quem Eu Sou
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                "Eu olhava minha filha vidrada no tablet toda tarde e sentia aquele aperto no peito..."
              </h2>

              <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed">
                Eu olhava minha filha vidrada no tablet toda tarde e sentia aquele aperto no peito. Não porque ela fazia algo errado — mas porque eu sabia que aquilo não ia parar sozinho.
              </p>

              <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed">
                Toda vez que eu tentava tirar a tela, vinha a mesma cena: o choro, o grito, e aquela frase que eu já tinha decorado — <em>"mãe, eu não tenho nada pra fazer"</em>. Eu me sentia culpada, com medo da infância dela passar rápido demais na frente de uma tela.
              </p>

              <div className="relative pl-5 py-3 my-2 border-l-4 border-pink-400 bg-pink-50/70 rounded-r-2xl text-slate-800 font-medium italic text-base sm:text-lg leading-relaxed">
                <Quote className="w-5 h-5 text-pink-400 absolute -top-2 left-2 opacity-50" />
                "Foi aí que lembrei da minha própria infância nos anos 90: tarde inteira recortando boneca de papel na mesa da cozinha, inventando historinha, trocando roupinha. Como eu desenho, resolvi criar uns modelos modernos de princesa pra minha filha Alice, com abas de encaixe fácil pra ela mesma montar."
              </div>

              <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed">
                Imprimi numa folha comum, peguei a tesoura sem ponta e sentei com ela. Em minutos ela já tinha dado nome pras personagens e tava escolhendo vestido e sapato. Passou mais de 3 horas concentrada, rindo, conversando comigo — o tablet ficou esquecido no sofá o fim de semana inteiro.
              </p>

              <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed">
                Mostrei as fotos no grupo de mães da escola e, em minutos, várias já queriam o PDF pra imprimir com as filhas delas também.
              </p>

              <div className="pt-2 border-t border-pink-100/80">
                <p className="text-base sm:text-[17px] text-pink-900 font-semibold leading-relaxed bg-pink-100/60 p-4 rounded-2xl border border-pink-200/50">
                  Se você também sente esse aperto todo dia na hora de tirar a tela, a diferença pode ser essa mesma folha de papel. <strong>Agora só depende de você dar essa chance pra ela.</strong>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
