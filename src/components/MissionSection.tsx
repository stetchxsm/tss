import React from "react";
import { useTranslation } from "react-i18next";

const MissionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-8">
            {t('mission.chip')}
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            {t('mission.title')}
          </h2>
          
          {/* Decorative elements */}
          <div className="flex justify-center space-x-8 mt-12">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">✈️</span>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚢</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
