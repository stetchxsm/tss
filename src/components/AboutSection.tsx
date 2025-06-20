import React from "react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t('about.experience'), value: "15+" },
    { label: t('about.clients'), value: "500+" },
    { label: t('about.countries'), value: "10+" },
    { label: t('about.success'), value: "98%" }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              {t('about.chip')}
            </div>

            <h2 className="section-title mb-6">
              {t('about.title')}
            </h2>

            <h3 className="text-xl font-semibold text-gray-700 mb-6">
              {t('about.subtitle')}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/cherrydeck-PH8Ccgq3mvk-unsplash.jpg"
                alt="Dr White Group Professional Team"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>

              {/* Content overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Dr White Group</h3>
                  <p className="text-blue-100">Global Services Excellence</p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">DW</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Dr White Group</div>
                  <div className="text-sm text-gray-600">Global Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
