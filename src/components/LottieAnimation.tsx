
import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation = ({
  animationPath,
  className = "",
  loop = true,
  autoplay = true,
}: LottieAnimationProps) => {
  const lottieRef = useRef<any>(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  useEffect(() => {
    // Apply RTL transformation if needed
    if (isRTL && lottieRef.current) {
      const svgElement = lottieRef.current.querySelector('svg');
      if (svgElement) {
        // Add horizontal flip for RTL languages
        svgElement.style.transform = 'scaleX(-1)';
      }
    }
  }, [isRTL]);
  
  return (
    <div className={className} ref={lottieRef}>
      <Lottie
        animationData={animationPath}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
        lottieRef={lottieRef}
      />
    </div>
  );
};

export default LottieAnimation;
