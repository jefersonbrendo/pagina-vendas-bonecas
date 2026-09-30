import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, CheckCircle, HeartHandshake, X, ChevronLeft, ChevronRight, ZoomIn, MessageSquare } from 'lucide-react';
import { TESTIMONIALS, ASSETS } from '../data/content';

interface SlideItem {
  id: string;
  type: 'testimonial' | 'photo';
  testimonial?: (typeof TESTIMONIALS)[0];
  photoUrl?: string;
  photoTitle?: string;
  photoSubtitle?: string;
}

// 5 curated slides alternating between verified mother reviews and real WhatsApp screenshots
const SLIDES: SlideItem[] = [
  {
    id: 't-1',
    type: 'testimonial',
    testimonial: TESTIMONIALS[0],
  },
  {
    id: 'p-1',
    type: 'photo',
    photoUrl: ASSETS.prova1,
    photoTitle: 'Mensagem Real no WhatsApp',
    photoSubtitle: 'Depoimento espontâneo de mãe verificada',
  },
  {
    id: 't-2',
    type: 'testimonial',
    testimonial: TESTIMONIALS[1],
  },
  {
    id: 'p-2',
    type: 'photo',
    photoUrl: ASSETS.prova2,
    photoTitle: 'Conversa Real no WhatsApp',
    photoSubtitle: 'Experiência compartilhada de mãe cliente',
  },
  {
    id: 't-3',
    type: 'testimonial',
    testimonial: TESTIMONIALS[2],
  },
];

const getInitialItemsPerPage = (): number => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

export const SocialProof: React.FC = () => {
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(getInitialItemsPerPage);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const baseCount = SLIDES.length;
  // 3 sets of slides for endless smooth looping
  const loopSlides = [...SLIDES, ...SLIDES, ...SLIDES];

  // Start right at the middle set
  const [currentIndex, setCurrentIndex] = useState<number>(baseCount);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const transitionTimeoutRef = useRef<number | null>(null);

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

  // Next / Previous action handlers
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
    if (isPaused || zoomImage !== null) return;

    const timer = setInterval(() => {
      // Do NOT increment in background or hidden tabs to avoid out-of-bounds drift
      if (typeof document !== 'undefined' && document.hidden) return;
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, zoomImage, handleNext]);

  // Seamless jump without animation when reaching edge copies
  const handleTransitionEnd = () => {
    if (currentIndex >= baseCount * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - baseCount);
    } else if (currentIndex < baseCount) {
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

  // Fail-safe Watchdog: If index ever exceeds bounds (e.g. rapid resize or sleep wakeup), snap back safely
  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= loopSlides.length - itemsPerPage) {
      setIsTransitioning(false);
      const safeIndex = baseCount + (((currentIndex % baseCount) + baseCount) % baseCount);
      setCurrentIndex(safeIndex);
    }
  }, [currentIndex, baseCount, loopSlides.length, itemsPerPage]);

  // Tab visibility change: re-align properly when user returns to this tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsTransitioning(false);
        setCurrentIndex((prev) => {
          const normalized = ((prev % baseCount) + baseCount) % baseCount;
          return baseCount + normalized;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [baseCount]);

  const handleDotClick = (targetIndex: number) => {
    setIsTransitioning(true);
    const currentNormalized = ((currentIndex % baseCount) + baseCount) % baseCount;
    const diff = targetIndex - currentNormalized;
    setCurrentIndex((prev) => prev + diff);
  };

  // Touch swipe support
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

  const activeDotIndex = ((currentIndex % baseCount) + baseCount) % baseCount;

  return (
    <section id="depoimentos" className="py-16 sm:py-20 bg-white overflow-hidden min-h-[560px]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Veja o que as mães estão dizendo
        </h2>

        {/* Quantified mothers count with stars */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 px-4 py-2 sm:py-1.5 rounded-2xl sm:rounded-full bg-amber-50/80 border border-amber-200/80 shadow-2xs mb-6 sm:mb-10 max-w-[95%] sm:max-w-none mx-auto">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-amber-900 font-black text-xs sm:text-sm ml-0.5">4.9/5</span>
          </div>

          <span className="hidden sm:inline text-amber-300 text-xs">•</span>

          <div className="text-xs sm:text-sm text-slate-700 font-medium text-center leading-tight">
            <span className="text-slate-900 font-extrabold">Mais de 9.435</span>{' '}
            <span className="text-slate-600">mães já baixaram e aprovaram</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Arrow Left */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Depoimento anterior"
            className="absolute -left-1 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 border-2 border-pink-200 text-pink-600 shadow-md hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Arrow Right */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo depoimento"
            className="absolute -right-1 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 border-2 border-pink-200 text-pink-600 shadow-md hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Carousel Viewport */}
          <div className="overflow-hidden py-4 px-1 min-h-[440px]">
            <div
              className={`flex items-stretch ${
                isTransitioning ? 'transition-transform duration-500 ease-out' : ''
              }`}
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                willChange: 'transform',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {loopSlides.map((slide, index) => {
                const flexBasis = `${100 / itemsPerPage}%`;

                return (
                  <div
                    key={`${slide.id}-${index}`}
                    style={{ flex: `0 0 ${flexBasis}`, maxWidth: flexBasis }}
                    className="px-2.5 sm:px-3 text-left h-full"
                  >
                    {slide.type === 'testimonial' && slide.testimonial && (
                      <div className="h-full min-h-[420px] bg-[#FFF9FA] p-6 sm:p-7 rounded-3xl border border-pink-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative group">
                        <div>
                          {/* 5 Yellow Stars */}
                          <div className="flex items-center text-amber-400 mb-4">
                            {[...Array(slide.testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>

                          {/* Quote Text */}
                          <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed italic mb-6">
                            "{slide.testimonial.quote}"
                          </p>
                        </div>

                        {/* Author Info with Round Avatar */}
                        <div className="flex items-center gap-3 pt-4 border-t border-pink-100/80">
                          <img
                            src={slide.testimonial.avatar}
                            alt={slide.testimonial.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover border-2 border-pink-300 bg-pink-100"
                            loading="lazy"
                            decoding="async"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-extrabold text-slate-900 text-sm">
                                {slide.testimonial.name}
                              </span>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            </div>
                            <span className="text-xs text-slate-400 block font-medium">
                              {slide.testimonial.daughterAge}
                            </span>
                            {slide.testimonial.location && (
                              <span className="text-[11px] text-pink-600 font-semibold">
                                {slide.testimonial.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {slide.type === 'photo' && slide.photoUrl && (
                      <div
                        onClick={() => setZoomImage(slide.photoUrl || null)}
                        className="h-full min-h-[420px] relative group rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border-2 border-pink-300 bg-gradient-to-b from-[#FFF5F8] to-white flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer"
                      >
                        {/* Header com Tag de Verificação */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black border border-emerald-200">
                            <MessageSquare className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{slide.photoTitle}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>Verificado</span>
                          </div>
                        </div>

                        {/* Foto da Prova Social */}
                        <div className="relative flex-1 min-h-[260px] flex items-center justify-center overflow-hidden rounded-2xl bg-white border border-pink-100/70 p-1.5 shadow-2xs group/img">
                          <img
                            src={slide.photoUrl}
                            alt={slide.photoTitle || 'Prova social real'}
                            width={260}
                            height={300}
                            className="max-h-[300px] w-auto max-w-full object-contain rounded-xl group-hover/img:scale-[1.03] transition-transform duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs rounded-xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 text-white text-xs font-bold shadow-lg">
                              <ZoomIn className="w-3.5 h-3.5" />
                              Clique para ampliar
                            </span>
                          </div>
                        </div>

                        {/* Rodapé do Card */}
                        <div className="pt-2.5 mt-2 border-t border-pink-100 flex items-center justify-between text-left">
                          <span className="text-[11px] text-slate-500 font-medium truncate">
                            {slide.photoSubtitle}
                          </span>
                          <span className="text-xs font-bold text-pink-600 hover:text-pink-700 shrink-0">
                            Ver foto &rarr;
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1 mt-6">
            {SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => handleDotClick(dotIdx)}
                aria-label={`Ir para depoimento ${dotIdx + 1}`}
                className="p-2 flex items-center justify-center cursor-pointer min-w-[36px] min-h-[36px]"
              >
                <span
                  className={`transition-all duration-300 rounded-full h-2.5 ${
                    activeDotIndex === dotIdx
                      ? 'w-8 bg-pink-500'
                      : 'w-2.5 bg-pink-200 hover:bg-pink-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Extra trust ribbon */}
        <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200/60 text-xs sm:text-sm text-pink-800 font-semibold">
          <HeartHandshake className="w-4 h-4 text-pink-600" />
          <span>Comunidade com 99,4% de aprovação entre mães e educadoras</span>
        </div>
      </div>

      {/* Modal de Zoom da Foto */}
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm sm:max-w-md w-full max-h-[90vh] bg-white rounded-3xl p-3 shadow-2xl border-2 border-pink-200 overflow-hidden flex flex-col items-center"
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full overflow-y-auto max-h-[82vh] rounded-2xl">
              <img
                src={zoomImage}
                alt="Prova social em tamanho completo"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
