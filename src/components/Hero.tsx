import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import LottieAnimation from "./LottieAnimation";

// Constants
const MOBILE_BREAKPOINT = 768;
const PARALLAX_SPEEDS = {
  MOUSE: 2.5,
  SCROLL: 0.05,
  IMAGE: 0.1
};

const ANIMATION_DELAYS = {
  CHIP: "0.1s",
  TITLE: "0.3s",
  SUBTITLE: "0.5s",
  CTA: "0.7s",
  IMAGE: "0.9s"
};

const BUTTON_STYLES = {
  backgroundColor: '#1e40af',
  borderRadius: '1440px',
  color: '#FFFFFF',
  fontSize: '14px',
  lineHeight: '20px',
  padding: '16px 24px',
  border: '1px solid white',
} as const;

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLottieLoading, setIsLottieLoading] = useState(true);
  
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // Check if device is mobile
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  // Mouse move handler for 3D effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || !imageRef.current || isMobile) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    requestAnimationFrame(() => {
      if (imageRef.current) {
        imageRef.current.style.transform = 
          `perspective(1000px) rotateY(${x * PARALLAX_SPEEDS.MOUSE}deg) rotateX(${-y * PARALLAX_SPEEDS.MOUSE}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    });
  }, [isMobile]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    if (!imageRef.current) return;
    
    imageRef.current.style.transform = 
      `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  }, []);

  // Scroll handler for parallax effect
  const handleScroll = useCallback(() => {
    if (isMobile) return;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || String(PARALLAX_SPEEDS.IMAGE));
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    });
  }, [isMobile]);

  // Load Lottie animation
  useEffect(() => {
    const loadLottieAnimation = async () => {
      try {
        const response = await fetch('/loop-header.lottie');
        if (!response.ok) throw new Error('Failed to load animation');
        
        const data = await response.json();
        setLottieData(data);
      } catch (error) {
        console.error("Error loading Lottie animation:", error);
      } finally {
        setIsLottieLoading(false);
      }
    };

    loadLottieAnimation();
  }, []);

  // Mobile detection
  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  // Mouse events for 3D effect
  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, isMobile]);

  // Scroll events for parallax
  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isMobile]);

  // Render functions for better organization
  const renderChip = () => {
    if (!t('hero.chip')) return null;

    return (
      <div
        className={cn(
          "pulse-chip mb-3 sm:mb-6 opacity-0 animate-fade-in",
          isRTL ? "flex flex-row-reverse" : "flex"
        )}
        style={{ animationDelay: ANIMATION_DELAYS.CHIP }}
      >
        <span className={cn(
          "inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white",
          isRTL ? "ml-2" : "mr-2"
        )}>
          ✓
        </span>
        <span>{t('hero.chip')}</span>
      </div>
    );
  };

  const renderTitle = () => {
    const titleProps = {
      className: "section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in",
      style: {
        animationDelay: ANIMATION_DELAYS.TITLE,
        ...(isRTL && {
          fontFamily: "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif",
          lineHeight: 1.4,
          textAlign: 'right' as const
        })
      }
    };

    return <h1 {...titleProps}>{t('hero.title')}</h1>;
  };

  const renderSubtitle = () => {
    const subtitleProps = {
      className: "section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base sm:text-lg",
      style: {
        animationDelay: ANIMATION_DELAYS.SUBTITLE,
        ...(isRTL && {
          fontFamily: "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif",
          textAlign: 'right' as const,
          direction: 'rtl' as const
        }),
        ...(!isRTL && {
          textAlign: 'left' as const
        })
      }
    };

    return <p {...subtitleProps}>{t('hero.subtitle')}</p>;
  };

  const renderCTA = () => {
    const buttonProps = {
      href: "#services",
      className: cn(
        "flex items-center justify-center group w-full sm:w-auto text-center",
        isRTL && "rtl-direction"
      ),
      style: {
        ...BUTTON_STYLES,
        ...(isRTL && {
          fontFamily: "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif"
        })
      },
      ...(isRTL && { dir: "rtl" as const })
    };

    return (
      <div
        className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
        style={{ animationDelay: ANIMATION_DELAYS.CTA }}
      >
        <a {...buttonProps}>
          {isRTL && (
            <ArrowRight className="transform rotate-180 mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
          )}
          {t('hero.cta')}
          {!isRTL && (
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          )}
        </a>
      </div>
    );
  };

  const renderImage = () => {
    if (lottieData) {
      return (
        <div 
          className="relative z-10 animate-fade-in" 
          style={{ animationDelay: ANIMATION_DELAYS.IMAGE }}
        >
          <LottieAnimation
            animationPath={lottieData}
            className="w-full h-auto max-w-lg mx-auto"
            loop={true}
            autoplay={true}
          />
        </div>
      );
    }

    if (isLottieLoading) {
      return (
        <div className="flex items-center justify-center h-64 animate-pulse">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    return (
      <>
        <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
        <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
          <img
            ref={imageRef}
            src="/krakenimages-376KN_ISplE-unsplash.jpg"
            alt={t('app.title')}
            className="w-full h-auto object-cover transition-transform duration-500 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
        </div>
      </>
    );
  };

  return (
    <section
      className={cn("overflow-hidden relative bg-cover", className)}
      id="hero"
      style={{
        backgroundImage: 'url("/Header-background.webp")',
        backgroundPosition: 'center 30%',
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      {/* Background gradient */}
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>

      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            {renderChip()}
            {renderTitle()}
            {renderSubtitle()}
            {renderCTA()}
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            {renderImage()}
          </div>
        </div>
      </div>

      {/* Parallax element */}
      <div 
        className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" 
        data-speed={PARALLAX_SPEEDS.SCROLL}
      ></div>
    </section>
  );
};

export default Hero;