import { useEffect, useCallback, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CentralAsiaSection from "@/components/CentralAsiaSection";
import GulfCountriesSection from "@/components/GulfCountriesSection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";

import Newsletter from "@/components/Newsletter";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

const Index = () => {
  // تحسين معالج الحدث باستخدام useCallback
  const handleSmoothScroll = useCallback((e: Event) => {
    e.preventDefault();

    const targetId = (e.currentTarget as HTMLAnchorElement)?.getAttribute('href')?.substring(1);
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // تحسين حساب الإزاحة
    const offset = window.innerWidth < 768 ? 100 : 80;
    const targetPosition = targetElement.offsetTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }, []);

  // تحسين Intersection Observer
  const observerOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: "20px 0px", // تحسين rootMargin للأداء
  }), []);

  const setupIntersectionObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;

            // إضافة فئة الرسوم المتحركة
            target.classList.add("animate-fade-in");

            // إزالة المراقبة بعد التنشيط لتحسين الأداء
            observer.unobserve(target);
          }
        });
      },
      observerOptions
    );

    // تحسين الاستعلام للعناصر
    const animatableElements = document.querySelectorAll(`
      .animate-on-scroll,
      [data-animate='true'],
      img:not([data-no-lazy='true'])
    `);

    animatableElements.forEach((element) => {
      // إضافة lazy loading للصور
      if (element.tagName === 'IMG' && !element.hasAttribute('loading')) {
        element.setAttribute('loading', 'lazy');
        // إضافة decoding async لتحسين الأداء
        element.setAttribute('decoding', 'async');
      }

      observer.observe(element);
    });

    return () => {
      animatableElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [observerOptions]);

  const setupSmoothScrolling = useCallback(() => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll, { passive: false });
    });

    return () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, [handleSmoothScroll]);

  // دمج useEffect لتحسين الأداء
  useEffect(() => {
    const cleanupObserver = setupIntersectionObserver();
    const cleanupScrolling = setupSmoothScrolling();

    return () => {
      cleanupObserver();
      cleanupScrolling();
    };
  }, [setupIntersectionObserver, setupSmoothScrolling]);

  // تحسين هيكل المكونات مع memo للمكونات الثابتة
  const pageStructure = useMemo(() => [
    { Component: Hero, key: 'hero' },
    { Component: ServicesSection, key: 'services' },
    { Component: WhyChooseUsSection, key: 'why-choose-us' },
    { Component: CentralAsiaSection, key: 'central-asia' },
    { Component: GulfCountriesSection, key: 'gulf-countries' },
    { Component: AboutSection, key: 'about' },
    { Component: Testimonials, key: 'testimonials' },
    { Component: Newsletter, key: 'newsletter' },
    { Component: MissionSection, key: 'mission' },
  ], []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8" role="main">
        {pageStructure.map(({ Component, key }) => (
          <Component key={key} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Index;