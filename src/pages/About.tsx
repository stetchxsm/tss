import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Award,
  Globe,
  Users,
  Target,
  Eye,
  Heart,
  TrendingUp,
  Shield,
  Lightbulb,
  Handshake
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // Initialize intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px"
      }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Reset animations when language changes
  useEffect(() => {
    const resetAnimations = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((element) => {
        element.classList.remove('animate-fade-in');
        // Force reflow
        void element.offsetHeight;
        element.classList.add('animate-fade-in');
      });
    };

    // Small delay to ensure DOM is updated
    const timer = setTimeout(resetAnimations, 100);
    return () => clearTimeout(timer);
  }, [i18n.language]);

  const values = t('aboutPage.values.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const teamMembers = t('aboutPage.team.members', { returnObjects: true }) as Array<{
    name: string;
    position: string;
    description: string;
  }>;

  const achievements = t('aboutPage.achievements.stats', { returnObjects: true }) as Array<{
    number: string;
    label: string;
  }>;

  const valueIcons = [Shield, TrendingUp, Lightbulb, Handshake];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                animationDelay: "0.1s",
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.hero.title')}
            </h1>

            <p
              className={cn(
                "text-xl md:text-2xl text-gray-600 mb-8 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                animationDelay: "0.3s",
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.hero.subtitle')}
            </p>

            <p
              className={cn(
                "text-lg text-gray-700 leading-relaxed opacity-0 animate-on-scroll",
                isRTL ? "font-arabic text-right" : "text-left"
              )}
              style={{
                animationDelay: "0.5s",
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6 opacity-0 animate-on-scroll">
                {t('aboutPage.story.chip')}
              </div>
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold mb-8 opacity-0 animate-on-scroll",
                  isRTL ? "font-arabic" : ""
                )}
                style={{
                  fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                }}
              >
                {t('aboutPage.story.title')}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none opacity-0 animate-on-scroll">
              <p
                className={cn(
                  "text-gray-700 leading-relaxed text-lg",
                  isRTL ? "font-arabic text-right" : "text-left"
                )}
                style={{
                  fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                }}
              >
                {t('aboutPage.story.content')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="opacity-0 animate-on-scroll">
              <div className="bg-white p-8 rounded-3xl shadow-elegant h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {t('aboutPage.vision.chip')}
                  </div>
                </div>

                <h3
                  className={cn(
                    "text-2xl font-bold mb-4",
                    isRTL ? "font-arabic text-right" : "text-left"
                  )}
                  style={{
                    fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                  }}
                >
                  {t('aboutPage.vision.title')}
                </h3>

                <p
                  className={cn(
                    "text-gray-600 leading-relaxed",
                    isRTL ? "font-arabic text-right" : "text-left"
                  )}
                  style={{
                    fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                  }}
                >
                  {t('aboutPage.vision.description')}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="opacity-0 animate-on-scroll">
              <div className="bg-white p-8 rounded-3xl shadow-elegant h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    {t('aboutPage.mission.chip')}
                  </div>
                </div>

                <h3
                  className={cn(
                    "text-2xl font-bold mb-4",
                    isRTL ? "font-arabic text-right" : "text-left"
                  )}
                  style={{
                    fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                  }}
                >
                  {t('aboutPage.mission.title')}
                </h3>

                <p
                  className={cn(
                    "text-gray-600 leading-relaxed",
                    isRTL ? "font-arabic text-right" : "text-left"
                  )}
                  style={{
                    fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                  }}
                >
                  {t('aboutPage.mission.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-6 opacity-0 animate-on-scroll">
              {t('aboutPage.values.chip')}
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-8 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = valueIcons[index];
              return (
                <div key={index} className="opacity-0 animate-on-scroll" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                  <div className="bg-gray-50 p-8 rounded-3xl h-full hover:shadow-elegant transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>

                    <h3
                      className={cn(
                        "text-xl font-bold mb-4",
                        isRTL ? "font-arabic text-right" : "text-left"
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    >
                      {value.title}
                    </h3>

                    <p
                      className={cn(
                        "text-gray-600 leading-relaxed",
                        isRTL ? "font-arabic text-right" : "text-left"
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-6 opacity-0 animate-on-scroll">
              {t('aboutPage.team.chip')}
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.team.title')}
            </h2>
            <p
              className={cn(
                "text-lg text-gray-600 max-w-3xl mx-auto opacity-0 animate-on-scroll",
                isRTL ? "font-arabic text-right" : "text-left"
              )}
              style={{
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.team.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="opacity-0 animate-on-scroll" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="bg-white p-8 rounded-3xl shadow-elegant text-center hover:shadow-elegant-hover transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>

                  <h3
                    className={cn(
                      "text-xl font-bold mb-2",
                      isRTL ? "font-arabic" : ""
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {member.name}
                  </h3>

                  <p
                    className={cn(
                      "text-blue-600 font-medium mb-4",
                      isRTL ? "font-arabic" : ""
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {member.position}
                  </p>

                  <p
                    className={cn(
                      "text-gray-600 leading-relaxed",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6 opacity-0 animate-on-scroll">
              {t('aboutPage.achievements.chip')}
            </div>
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-8 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.achievements.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((stat, index) => (
              <div key={index} className="opacity-0 animate-on-scroll" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div
                    className={cn(
                      "text-sm text-gray-600 font-medium",
                      isRTL ? "font-arabic" : ""
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.cta.title')}
            </h2>

            <p
              className={cn(
                "text-xl mb-8 text-blue-100 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                animationDelay: "0.2s",
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('aboutPage.cta.description')}
            </p>

            <div className="opacity-0 animate-on-scroll" style={{ animationDelay: "0.4s" }}>
              <Link
                to="/contact"
                className={cn(
                  "inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
                  isRTL ? "font-arabic" : ""
                )}
                style={{
                  fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                }}
              >
                {t('aboutPage.cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
