import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface RTLProviderProps {
  children: React.ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Add RTL class to body for additional styling
    if (isRTL) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }

    // Update meta charset for better Arabic support
    const metaCharset = document.querySelector('meta[charset]');
    if (metaCharset) {
      metaCharset.setAttribute('charset', 'UTF-8');
    }

    // Add Arabic font preload for better performance
    if (isRTL) {
      // Remove previous preload links if they exist
      const oldLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
      oldLinks.forEach(link => link.remove());

      // Add Cairo font preload
      const linkCairo = document.createElement('link');
      linkCairo.rel = 'preload';
      linkCairo.as = 'font';
      linkCairo.type = 'font/woff2';
      linkCairo.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap';
      linkCairo.crossOrigin = 'anonymous';
      document.head.appendChild(linkCairo);
      
      // Add Tajawal font preload (common Arabic UI font)
      const linkTajawal = document.createElement('link');
      linkTajawal.rel = 'preload';
      linkTajawal.as = 'font';
      linkTajawal.type = 'font/woff2';
      linkTajawal.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap';
      linkTajawal.crossOrigin = 'anonymous';
      document.head.appendChild(linkTajawal);
    }
    
    // Add specific styles for Arabic text on RTL
    if (isRTL) {
      const styleElement = document.createElement('style');
      styleElement.id = 'rtl-specific-styles';
      styleElement.textContent = `
        [dir="rtl"] {
          font-family: 'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif;
          text-align: right;
          letter-spacing: 0;
          word-spacing: 0.05em;
        }
        [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6 {
          font-family: 'Cairo', 'Tajawal', sans-serif;
          font-weight: 700;
          line-height: 1.4;
        }
        [dir="rtl"] p {
          font-family: 'Cairo', 'Tajawal', sans-serif;
          line-height: 1.8;
        }
        [dir="rtl"] button, [dir="rtl"] a {
          font-family: 'Cairo', 'Tajawal', sans-serif;
        }
        [dir="rtl"] .space-x-1 > :not([hidden]) ~ :not([hidden]),
        [dir="rtl"] .space-x-2 > :not([hidden]) ~ :not([hidden]),
        [dir="rtl"] .space-x-3 > :not([hidden]) ~ :not([hidden]),
        [dir="rtl"] .space-x-4 > :not([hidden]) ~ :not([hidden]),
        [dir="rtl"] .space-x-6 > :not([hidden]) ~ :not([hidden]),
        [dir="rtl"] .space-x-8 > :not([hidden]) ~ :not([hidden]),
        [dir="rtl"] .space-x-12 > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 1;
        }
        [dir="rtl"] .space-x-reverse > * {
          --tw-space-x-reverse: 1 !important;
        }
        [dir="rtl"] .flex-row {
          flex-direction: row-reverse;
        }
      `;
      
      // Remove old style element if it exists
      const oldStyle = document.getElementById('rtl-specific-styles');
      if (oldStyle) {
        oldStyle.remove();
      }
      
      document.head.appendChild(styleElement);
    } else {
      const oldStyle = document.getElementById('rtl-specific-styles');
      if (oldStyle) {
        oldStyle.remove();
      }
    }
  }, [isRTL, i18n.language]);

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className={`app ${isRTL ? 'rtl' : 'ltr'}`}
      style={{
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : 'inherit',
      }}
    >
      {children}
    </div>
  );
};

export default RTLProvider; 