import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Eye,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Zap,
  FileText,
  Heart,
  Shirt,
  BookOpen,
} from 'lucide-react';
import {
  WHAT_YOU_RECEIVE_ITEMS,
  DEMONSTRATION_ITEMS,
  DemonstrationItem,
  ASSETS,
} from '../data/content';
import { useDeferredMedia } from '../hooks/useDeferredMedia';

// Curated row of real children playing photos sent by customers
const CHILD_PHOTOS = [
  {
    id: 1,
    url: ASSETS.provaKid1,
    title: 'Brincando e se divertindo',
    caption: 'Momentos reais longe das telas',
  },
  {
    id: 2,
    url: ASSETS.provaKid2,
    title: 'Criatividade e imaginação',
    caption: 'Horas de diversão e criação de histórias',
  },
  {
    id: 3,
    url: ASSETS.provaKid3,
    title: 'Montando e personalizando looks',
    caption: 'Cenários e roupinhas combinando',
  },
  {
    id: 4,
    url: ASSETS.provaKid4,
    title: 'Expressando criatividade com alegria',
    caption: 'Brincadeira saudável e educativa',
  },
  {
    id: 5,
    url: ASSETS.provaKid5,
    title: 'Coleção cheia de encanto',
    caption: 'Momentos únicos de carinho e diversão',
  },
];


interface WhatYouReceiveProps {
  onCtaClick?: () => void;
}

export const WhatYouReceive: React.FC<WhatYouReceiveProps> = ({ onCtaClick }) => {
  const mediaReady = useDeferredMedia();
  // Demonstration Sheets State - Rock-solid Transform Carousel
  const baseCount = DEMONSTRATION_ITEMS.length;
  // 5 full sets of slides (25 items) to guarantee endless buffer in both directions
  const loopSlides = [
    ...DEMONSTRATION_ITEMS,
    ...DEMONSTRATION_ITEMS,
    ...DEMONSTRATION_ITEMS,
    ...DEMONSTRATION_ITEMS,
    ...DEMONSTRATION_ITEMS,
  ];

  const [itemsPerPage, setItemsPerPage] = useState<number>(1); // 1 no pré-render; o efeito abaixo ajusta à largura real
  // Start right in the middle set (index 10)
  const [currentIndex, setCurrentIndex] = useState<number>(baseCount * 2);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  const [selectedDemoItem, setSelectedDemoItem] = useState<DemonstrationItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Child Photos Lightbox State
  const [selectedPhoto, setSelectedPhoto] = useState<typeof CHILD_PHOTOS[0] | null>(null);

  // Responsive items count updater
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Next / Previous action handlers with silky smooth ease
  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Autoplay timer with active document visibility check
  useEffect(() => {
    if (isPaused || selectedDemoItem !== null) return;

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      handleNext();
    }, 3600);

    return () => clearInterval(timer);
  }, [isPaused, selectedDemoItem, handleNext]);

  // Seamless jump without animation when reaching edge copies
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (currentIndex >= baseCount * 3) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - baseCount);
    } else if (currentIndex < baseCount * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + baseCount);
    }
  };

  // Re-enable smooth transition right after an instant seamless jump
  useEffect(() => {
    if (!isTransitioning) {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [isTransitioning]);

  // Fail-safe Watchdog 1: If transitionend event is ever delayed or missed by browser, reset silently within 750ms
  useEffect(() => {
    if (currentIndex >= baseCount * 3) {
      const timer = window.setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => (prev >= baseCount * 3 ? prev - baseCount : prev));
      }, 750);
      return () => window.clearTimeout(timer);
    } else if (currentIndex < baseCount * 2) {
      const timer = window.setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => (prev < baseCount * 2 ? prev + baseCount : prev));
      }, 750);
      return () => window.clearTimeout(timer);
    }
  }, [currentIndex, baseCount]);

  // Fail-safe Watchdog 2: Hard bounds protection to guarantee it NEVER slides into empty space
  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= loopSlides.length - itemsPerPage) {
      setIsTransitioning(false);
      const normalized = ((currentIndex % baseCount) + baseCount) % baseCount;
      setCurrentIndex(baseCount * 2 + normalized);
    }
  }, [currentIndex, baseCount, loopSlides.length, itemsPerPage]);

  // Fail-safe Watchdog 3: Tab visibility change - re-align cleanly when tab becomes active again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsTransitioning(false);
        setCurrentIndex((prev) => {
          const normalized = ((prev % baseCount) + baseCount) % baseCount;
          return baseCount * 2 + normalized;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [baseCount]);

  const activeSlide = ((currentIndex % baseCount) + baseCount) % baseCount;

  const handleDotClick = (targetIndex: number) => {
    setIsTransitioning(true);
    const currentNormalized = ((currentIndex % baseCount) + baseCount) % baseCount;
    const diff = targetIndex - currentNormalized;
    setCurrentIndex((prev) => prev + diff);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const handleOpenDemoLightbox = (item: DemonstrationItem, index: number) => {
    setSelectedDemoItem(item);
    setLightboxIndex(index);
  };

  const handlePrevDemoLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (lightboxIndex - 1 + baseCount) % baseCount;
    setLightboxIndex(newIndex);
    setSelectedDemoItem(DEMONSTRATION_ITEMS[newIndex]);
  };

  const handleNextDemoLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (lightboxIndex + 1) % baseCount;
    setLightboxIndex(newIndex);
    setSelectedDemoItem(DEMONSTRATION_ITEMS[newIndex]);
  };

  return (
    <section
      id="o-que-vai-receber"
      className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#FFF8FA] to-white relative overflow-hidden"
    >
      {/* Target anchor fallback for backwards compatibility */}
      <div id="demonstracao" className="sr-only" />

      {/* Decorative ambient blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none -mr-24" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none -ml-24" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-3 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Material Completo em PDF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            O QUE VOCÊ VAI RECEBER?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Dê uma olhada no material por dentro. São arquivos em altíssima resolução, traços nítidos e cores encantadoras para imprimir, recortar e brincar em minutos!
          </p>
        </div>

        {/* 1. INTERACTIVE DEMO SHEETS CAROUSEL */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Prévia das Folhas Prontas para Imprimir
              </h3>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-pink-500" /> Toque na folha para ver em tela cheia
            </span>
          </div>

          <div
            className="relative select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Nav Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Folha anterior"
              className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-slate-800 hover:text-pink-600 shadow-lg border border-pink-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Próxima folha"
              className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-slate-800 hover:text-pink-600 shadow-lg border border-pink-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Viewport */}
            <div className="overflow-hidden py-3 px-1">
              <div
                className={`flex items-stretch ${
                  isTransitioning ? 'transition-transform duration-700 ease-out' : ''
                }`}
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                  willChange: 'transform',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {loopSlides.map((item, index) => {
                  const originalIndex = index % baseCount;
                  const isActive = activeSlide === originalIndex;
                  const flexBasis = `${100 / itemsPerPage}%`;

                  return (
                    <div
                      key={`${item.id}-${index}`}
                      style={{ flex: `0 0 ${flexBasis}`, maxWidth: flexBasis }}
                      className="px-2 sm:px-3 text-left h-full"
                    >
                      <div
                        onClick={() => handleOpenDemoLightbox(item, originalIndex)}
                        className={`group relative w-full h-full bg-white rounded-3xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col ${
                          isActive
                            ? 'border-pink-300 ring-2 ring-pink-400/25 shadow-md'
                            : 'border-pink-100 hover:border-pink-200'
                        }`}
                      >
                        {/* Header Strip */}
                        <div className="px-4 py-2.5 flex items-center justify-between border-b border-pink-50 bg-gradient-to-r from-pink-50/60 via-white to-pink-50/40">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-pink-100 text-pink-700">
                            {item.category}
                          </span>
                          {originalIndex === 0 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-xs">
                              ★ Destaque
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                              <Eye className="w-3 h-3 text-pink-500" /> Ver completa
                            </span>
                          )}
                        </div>

                        {/* Image Box (Uncropped full sheet) */}
                        <div className="relative h-[320px] sm:h-[350px] md:h-[370px] w-full p-3 sm:p-4 bg-gradient-to-b from-white via-pink-50/20 to-white flex items-center justify-center overflow-hidden">
                          <img
                            src={mediaReady ? item.image : undefined}
                            alt={item.title}
                            width={380}
                            height={380}
                            loading="lazy"
                            decoding="async"
                            className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-sm group-hover:scale-[1.02] transition-transform duration-300 select-none"
                          />

                          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="px-3 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-black shadow-md flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5 text-pink-600" />
                              Ampliar Folha
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5 bg-white border-t border-slate-100">
                          <div>
                            <h4 className="text-base font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              {item.highlight}
                            </span>
                            <span className="text-pink-600 font-black flex items-center gap-1">
                              Zoom &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {DEMONSTRATION_ITEMS.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  aria-label={`Ver folha ${index + 1}: ${item.title}`}
                  className="p-2 flex items-center justify-center cursor-pointer min-w-[36px] min-h-[36px]"
                >
                  <span
                    className={`transition-all duration-300 rounded-full h-2.5 ${
                      activeSlide === index
                        ? 'w-8 bg-gradient-to-r from-[#FF007A] to-[#C026D3]'
                        : 'w-2.5 bg-pink-200 hover:bg-pink-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-center mt-2 sm:hidden">
              <span className="text-[11px] font-semibold text-slate-400">
                👈 Deslize para o lado para ver mais folhas 👉
              </span>
            </div>
          </div>
        </div>

        {/* 2. 6 SUMMARY CARDS */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tudo o que está incluso no seu acesso
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Baixe os arquivos direto no celular, tablet ou computador e imprima quando quiser
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_YOU_RECEIVE_ITEMS.map((item) => {
              const badgeConfig =
                item.id === '1'
                  ? { label: '+300 Modelos', icon: Heart, color: 'bg-rose-50 text-rose-700 border-rose-200' }
                  : item.id === '2'
                  ? { label: '+300 Looks', icon: Shirt, color: 'bg-pink-50 text-pink-700 border-pink-200' }
                  : item.id === '3'
                  ? { label: 'Pronto p/ Imprimir', icon: FileText, color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' }
                  : item.id === '4'
                  ? { label: 'Passo a Passo', icon: BookOpen, color: 'bg-amber-50 text-amber-800 border-amber-200' }
                  : item.id === '5'
                  ? { label: 'Envio Imediato', icon: Zap, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
                  : item.id === '6'
                  ? { label: 'Acesso Vitalício', icon: Sparkles, color: 'bg-purple-50 text-purple-700 border-purple-200' }
                  : null;

              return (
                <div
                  key={item.id}
                  className="relative flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl transition-all duration-300 group overflow-hidden bg-gradient-to-br from-[#FFF5F9] via-[#FFF9FB] to-white border-2 border-pink-200/90 hover:border-pink-300 shadow-2xs hover:shadow-md ring-1 ring-pink-300/20 hover:-translate-y-0.5"
                >
                  {/* Subtle top gradient accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400" />

                  {/* Gradient Icon */}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform bg-gradient-to-br from-[#FF007A] to-[#C026D3] text-white shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-base font-bold text-slate-800 leading-snug">
                        {item.title}
                      </h4>
                      {badgeConfig && (
                        <span
                          className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0 ${badgeConfig.color}`}
                        >
                          <badgeConfig.icon className="w-2.5 h-2.5" />
                          {badgeConfig.label}
                        </span>
                      )}
                    </div>
                    {badgeConfig && (
                      <div className="sm:hidden mb-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${badgeConfig.color}`}
                        >
                          <badgeConfig.icon className="w-2.5 h-2.5" />
                          {badgeConfig.label}
                        </span>
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. REAL CHILDREN PLAYING GALLERY (MARQUEE) */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Veja as pequenas se divertindo de verdade
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fotos reais enviadas por mães que já resgataram as brincadeiras longe das telas
            </p>
          </div>

          <div className="relative w-full overflow-hidden py-2 group">
            {/* Edge fade */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="animate-infinite-scroll flex gap-3 sm:gap-4 items-center">
              {[...CHILD_PHOTOS, ...CHILD_PHOTOS].map((photo, index) => (
                <div
                  key={`${photo.id}-${index}`}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group/card relative w-56 sm:w-64 md:w-72 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-pink-100"
                >
                  <img
                    src={mediaReady ? photo.url : undefined}
                    alt={photo.title}
                    width={288}
                    height={216}
                    decoding="async"
                    className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                    <span className="text-xs sm:text-sm font-bold leading-tight">{photo.title}</span>
                    <span className="text-[11px] text-pink-200 mt-0.5 line-clamp-1">{photo.caption}</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 opacity-0 group-hover/card:opacity-100 transition-opacity shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-3">
              <span className="text-[11px] font-semibold text-slate-400 inline-flex items-center gap-1.5">
                <span>↔ Passe o mouse ou toque para pausar o carrossel</span>
              </span>
            </div>
          </div>
        </div>

        {/* 5. CTA BUTTON */}
        {onCtaClick && (
          <div className="text-center pt-2">
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-4.5 bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] hover:from-[#E11D74] hover:to-[#9333EA] text-white font-black text-base sm:text-lg rounded-full shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pulse-cta inline-flex items-center justify-center gap-2"
            >
              <span>QUERO GARANTIR ESSE MATERIAL AGORA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium">
              Recebimento imediato no seu e-mail · Acesso vitalício aos arquivos
            </p>
          </div>
        )}
      </div>

      {/* Lightbox for Demo Sheets */}
      {selectedDemoItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedDemoItem(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-white">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-pink-600 block">
                  {selectedDemoItem.category} ({lightboxIndex + 1} de {DEMONSTRATION_ITEMS.length})
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {selectedDemoItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDemoItem(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[320px] p-2 sm:p-4">
              <img
                src={selectedDemoItem.image}
                alt={selectedDemoItem.title}
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto select-none rounded-lg"
              />

              <button
                onClick={handlePrevDemoLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                aria-label="Folha anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextDemoLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
                aria-label="Próxima folha"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {selectedDemoItem.description}
              </p>
              {onCtaClick && (
                <button
                  onClick={() => {
                    setSelectedDemoItem(null);
                    onCtaClick();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#FF007A] to-[#C026D3] text-white rounded-full font-black text-xs sm:text-sm shadow-md hover:opacity-95 transition cursor-pointer whitespace-nowrap"
                >
                  Quero este pacote &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Child Playing Photos */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 transition cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-72 sm:h-96 object-cover rounded-2xl"
            />
            <div className="mt-4 px-2">
              <h4 className="text-lg font-bold text-slate-900">{selectedPhoto.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
