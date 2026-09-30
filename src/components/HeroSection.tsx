import React, { useRef, useState } from 'react';
import { ChevronDown, Sparkles, Play, Volume2, VolumeX } from 'lucide-react';
import { ASSETS } from '../data/content';
import { useDeferredMedia } from '../hooks/useDeferredMedia';

interface HeroSectionProps {
  onCtaClick: () => void;
  onScrollDown: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick, onScrollDown }) => {
  const mediaReady = useDeferredMedia();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const hasVideoSource = Boolean(ASSETS.heroVideo && !hasVideoError);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setVideoProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleToggleSound = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleStartVideo = () => {
    if (!videoRef.current) return;
    setHasStarted(true);
    setIsPaused(false);
    setIsPlaying(true);
    videoRef.current.muted = false;
    setIsMuted(false);
    videoRef.current.play().catch(() => {
      // If browser blocked unmuted, fallback to muted play
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().catch(() => {});
      }
    });
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (!hasStarted) {
      handleStartVideo();
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFF9FA] to-white">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-pink-200/40 via-purple-100/30 to-transparent blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Playful mini pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-pink-100 text-pink-700 text-xs font-bold tracking-wide shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" />
          <span>O BRINQUEDO EDUCATIVO QUE CONQUISTOU AS MÃES</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#E11D74] tracking-tight leading-[1.08] mb-4">
          +300 BONECAS DE PAPEL
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-2xl md:text-[26px] font-bold text-slate-800 max-w-2xl mx-auto leading-snug mb-6">
          Imprima em minutos e veja sua filha trocar o tablet por horas de imaginação, recorte e história.
        </p>

        {/* Mockup de celular com conteúdo nativo de Reels/TikTok / Vídeo */}
        <div className="relative mx-auto max-w-[280px] sm:max-w-[320px] mb-8 group">
          {/* Outer glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-[44px] blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
          
          {/* Smartphone Frame */}
          <div className="relative rounded-[40px] p-3 bg-slate-900 shadow-2xl border-4 border-slate-800">
            {/* Top speaker & dynamic notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-slate-800 mr-2 border border-slate-700" />
              <div className="w-10 h-1.5 rounded-full bg-slate-800" />
            </div>

            {/* Screen Area (aspect ratio 9:16 matching Canva 177.7778% vertical video) */}
            <div className="relative overflow-hidden rounded-[28px] bg-slate-950 aspect-[9/16] shadow-inner">
              {hasVideoSource ? (
                /* Player Nativo Estilo VTurb (100% Limpo, sem logos, sem botões de terceiros) */
                <div
                  onClick={handleVideoClick}
                  className="relative w-full h-full cursor-pointer group/player select-none"
                >
                  <video
                    ref={videoRef}
                    src={ASSETS.heroVideo}
                    poster={mediaReady ? ASSETS.videoCover : undefined}
                    loop
                    muted={isMuted}
                    playsInline
                    preload="none"
                    onPlay={() => {
                      setIsPaused(false);
                      setIsPlaying(true);
                    }}
                    onPause={() => {
                      setIsPaused(true);
                      setIsPlaying(false);
                    }}
                    onTimeUpdate={handleTimeUpdate}
                    onError={() => setHasVideoError(true)}
                    className="w-full h-full object-cover"
                  />

                  {/* Fundo com a mulher visível (levemente escurecido) antes do início */}
                  {!hasStarted && (
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      <img
                        src={ASSETS.videoCover}
                        alt="Capa de apresentação das bonecas de papel prontas para imprimir e recortar"
                        width={320}
                        height={568}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      {/* Película escura suave para dar contraste aos botões mantendo a mulher visível */}
                      <div className="absolute inset-0 bg-black/35" />
                    </div>
                  )}

                  {/* Tela Inicial: Clique para começar a assistir */}
                  {!hasStarted && (
                    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 text-center select-none animate-in fade-in duration-300">
                      {/* Botão de Play Estático e Elegante */}
                      <div className="relative">
                        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-[#FF007A] via-[#E11D74] to-[#9333EA] text-white flex items-center justify-center shadow-2xl shadow-pink-500/90 border-4 border-white transform hover:scale-105 active:scale-95 transition-all">
                          <Play className="w-9 h-9 sm:w-10 sm:h-10 fill-white ml-1.5 drop-shadow-md" />
                        </div>
                      </div>

                      {/* Mensagem de Início */}
                      <div className="mt-5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#9333EA] text-white shadow-2xl border-2 border-white/90 max-w-[270px]">
                        <p className="text-white text-xs sm:text-[13px] font-black uppercase tracking-wider leading-snug">
                          Toque para assistir ao vídeo 🔊
                        </p>
                      </div>

                      <span className="mt-2 text-xs text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        Veja como funciona na prática
                      </span>
                    </div>
                  )}

                  {/* Mensagem e Overlay de Pausa (Estilo VSL VTurb) */}
                  {hasStarted && isPaused && (
                    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-2xs flex flex-col items-center justify-center p-4 text-center select-none animate-in fade-in duration-200">
                      {/* Botão de Play */}
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#FF007A] via-[#E11D74] to-[#9333EA] text-white flex items-center justify-center shadow-2xl shadow-pink-500/70 border-2 border-white/90 transform hover:scale-105 active:scale-95 transition-transform">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                      </div>

                      {/* Mensagem solicitada pelo usuário */}
                      <div className="mt-4 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-white/20 shadow-2xl max-w-[260px]">
                        <p className="text-white text-xs sm:text-[13px] font-black uppercase tracking-wider leading-snug">
                          Clique no vídeo para voltar a assistir
                        </p>
                      </div>

                      <span className="mt-2 text-[11px] text-pink-200/90 font-semibold drop-shadow-sm">
                        ▶ Toque em qualquer lugar para continuar
                      </span>
                    </div>
                  )}

                  {/* Banner Estilo VTurb: "Seu vídeo já começou! Clique para ouvir" (caso mute seja acionado) */}
                  {hasStarted && isMuted && (
                    <div className="absolute top-7 left-2 right-2 sm:left-3 sm:right-3 z-30 animate-bounce">
                      <div className="bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#9333EA] text-white p-2.5 rounded-2xl shadow-2xl border-2 border-white/80 text-center flex items-center justify-center gap-2">
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 shrink-0 animate-pulse" />
                        <span className="text-[11px] sm:text-xs font-black uppercase tracking-tight">
                          Áudio desativado! Toque para ouvir 🔊
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Botão de Som / Mute Flutuante */}
                  {hasStarted && (
                    <button
                      type="button"
                      aria-label={isMuted ? "Ativar som do vídeo" : "Silenciar som do vídeo"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSound();
                      }}
                      className="absolute top-10 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs border border-white/30 shadow-lg cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-pink-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  )}

                  {/* Barra de Progresso Estilo VSL VTurb */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40 z-30">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-[#FF007A] transition-all duration-200"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>
              ) : ASSETS.heroCanvaEmbed ? (
                <iframe
                  loading="lazy"
                  src={isPlaying ? `${ASSETS.heroCanvaEmbed}?autoplay=1` : ASSETS.heroCanvaEmbed}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Apresentação das Bonecas de Papel"
                  className="w-full h-full border-0 absolute inset-0 rounded-[28px]"
                />
              ) : (
                <img
                  src={ASSETS.heroPhoneCut}
                  alt="Mãos recortando bonecas de papel com tesoura"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              )}
            </div>
          </div>
        </div>

        {/* Primary Pink CTA Button */}
        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={onCtaClick}
            aria-label="Garantir agora mais de 300 bonecas de papel"
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] hover:from-[#E11D74] hover:to-[#9333EA] text-white font-black text-lg sm:text-xl rounded-full shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer pulse-cta"
          >
            EU QUERO AGORA!
          </button>
        </div>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-4 font-medium leading-relaxed">
          É só imprimir, recortar e brincar. Em poucos minutos, sua filha está criando personagens e ficando horas longe da tela.
        </p>

        {/* Microtext / scroll down */}
        <button
          type="button"
          onClick={onScrollDown}
          aria-label="Rolar a página para ver o que você vai receber"
          className="group inline-flex flex-col items-center gap-1 text-xs sm:text-sm font-semibold text-slate-500 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <span>Arraste para baixo</span>
          <ChevronDown className="w-4 h-4 text-pink-500 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
