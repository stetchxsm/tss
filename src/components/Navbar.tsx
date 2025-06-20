import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ArabicText from "./ArabicText";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.dir() === 'rtl';

  // تحسين معالج التمرير بـ useCallback
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // إغلاق القائمة عند تغيير المسار
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      const newValue = !prev;
      // منع التمرير في الخلفية عند فتح القائمة
      document.body.style.overflow = newValue ? 'hidden' : '';
      return newValue;
    });
  }, []);

  // تنظيف overflow عند إلغاء تركيب المكون
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // معالج التنقل المحسن
  const handleNavigation = useCallback((href: string) => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';

    // إذا كان رابط هاش ونحن في الصفحة الرئيسية، انتقل للقسم
    if (href.startsWith('#') && location.pathname === '/') {
      // تأخير بسيط للسماح بإغلاق القائمة أولاً
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const offset = window.innerWidth < 768 ? 100 : 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.pathname]);

  // مكون عنصر التنقل للسطح المكتب
  const NavItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isHashLink = href.startsWith('#');
    const isActive = location.pathname === href || (href === '/' && location.pathname === '/');

    const handleClick = (e: React.MouseEvent) => {
      if (isHashLink) {
        e.preventDefault();
        handleNavigation(href);
      }
    };

    const linkClasses = cn(
      "nav-link transition-colors duration-200 hover:text-blue-600",
      isActive && "text-blue-600"
    );

    if (isHashLink) {
      return isRTL ? (
        <ArabicText
          as="a"
          href={href}
          onClick={handleClick}
          className={linkClasses}
          weight="medium"
        >
          {children}
        </ArabicText>
      ) : (
        <a
          href={href}
          onClick={handleClick}
          className={linkClasses}
        >
          {children}
        </a>
      );
    }

    return isRTL ? (
      <ArabicText
        as={Link}
        to={href}
        className={linkClasses}
        weight="medium"
      >
        {children}
      </ArabicText>
    ) : (
      <Link
        to={href}
        className={linkClasses}
      >
        {children}
      </Link>
    );
  };

  // مكون عنصر التنقل للجوال
  const MobileNavItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isHashLink = href.startsWith('#');
    const isActive = location.pathname === href || (href === '/' && location.pathname === '/');

    const handleClick = (e: React.MouseEvent) => {
      if (isHashLink) {
        e.preventDefault();
      }
      handleNavigation(href);
    };

    const baseClasses = "text-xl font-medium py-4 px-6 w-full text-center rounded-lg hover:bg-gray-100 transition-colors duration-200";
    const activeClasses = isActive ? "text-blue-600 bg-blue-50" : "text-gray-700";

    if (isHashLink) {
      return isRTL ? (
        <ArabicText
          as="a"
          href={href}
          className={cn(baseClasses, activeClasses)}
          weight="semibold"
          size="lg"
          onClick={handleClick}
        >
          {children}
        </ArabicText>
      ) : (
        <a
          href={href}
          className={cn(baseClasses, activeClasses)}
          onClick={handleClick}
        >
          {children}
        </a>
      );
    }

    return isRTL ? (
      <ArabicText
        as={Link}
        to={href}
        className={cn(baseClasses, activeClasses)}
        weight="semibold"
        size="lg"
        onClick={handleClick}
      >
        {children}
      </ArabicText>
    ) : (
      <Link
        to={href}
        className={cn(baseClasses, activeClasses)}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* الشعار */}
          <Link
            to="/"
            className={cn(
              "flex items-center transition-opacity hover:opacity-80",
              isRTL ? "space-x-reverse space-x-2" : "space-x-2"
            )}
            aria-label={t('app.title')}
          >
            <img
              src="/drwhite-logo.svg"
              alt={t('app.title')}
              className="h-7 sm:h-8"
              loading="eager"
            />
          </Link>

          {/* تنقل سطح المكتب */}
          <nav className={cn(
            "hidden md:flex items-center",
            isRTL ? "space-x-reverse space-x-8" : "space-x-8"
          )} role="navigation">
            <NavItem href="/">
              {t('navigation.home')}
            </NavItem>
            <NavItem href="/about">{t('navigation.about')}</NavItem>
            <NavItem href="#services">{t('navigation.services')}</NavItem>
            <NavItem href="/contact">{t('navigation.contact')}</NavItem>
          </nav>

          {/* مبدل اللغة + زر القائمة للجوال */}
          <div className={cn(
            "flex items-center",
            isRTL ? "space-x-reverse space-x-2" : "space-x-2"
          )}>
            <LanguageSwitcher />

            <button
              className="md:hidden text-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* تنقل الجوال */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none",
          isRTL && "text-right"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <h2 id="mobile-menu-title" className="sr-only">
          {t('navigation.mobileMenu')}
        </h2>

        <nav className="flex flex-col space-y-6 items-center mt-8" role="navigation">
          {/* عناصر تنقل الجوال */}
          <MobileNavItem href="/">{t('navigation.home')}</MobileNavItem>
          <MobileNavItem href="/about">{t('navigation.about')}</MobileNavItem>
          <MobileNavItem href="#services">{t('navigation.services')}</MobileNavItem>
          <MobileNavItem href="/contact">{t('navigation.contact')}</MobileNavItem>

          {/* مبدل اللغة للجوال */}
          <div className={cn(
            "py-4 px-6 w-full flex border-t border-gray-200 mt-4",
            isRTL ? "justify-end" : "justify-center"
          )}>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>

      {/* طبقة خلفية للجوال */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;