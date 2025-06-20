import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Globe, Users, Award, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Animation setup
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
      { threshold: 0.1 }
    );

    const animatableElements = document.querySelectorAll('.animate-on-scroll');
    animatableElements.forEach((element) => observer.observe(element));

    return () => {
      animatableElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: "Cairo, Egypt",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: "+20 123 456 7890",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: "info@drwhitegroup.com",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: "Sun - Thu: 9AM - 6PM",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const features = [
    {
      icon: Globe,
      title: isRTL ? "خدمات عالمية" : "Global Services",
      description: isRTL ? "نخدم عملاءنا في أكثر من 10 دول حول العالم" : "We serve clients in over 10 countries worldwide"
    },
    {
      icon: Users,
      title: isRTL ? "فريق متخصص" : "Expert Team",
      description: isRTL ? "فريق من الخبراء المتخصصين في مختلف المجالات" : "Team of experts specialized in various fields"
    },
    {
      icon: Award,
      title: isRTL ? "جودة معتمدة" : "Certified Quality",
      description: isRTL ? "خدمات معتمدة وموثقة بأعلى معايير الجودة" : "Certified and documented services with highest quality standards"
    },
    {
      icon: Headphones,
      title: isRTL ? "دعم 24/7" : "24/7 Support",
      description: isRTL ? "دعم فني متواصل على مدار الساعة" : "Continuous technical support around the clock"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={cn(
                "inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('contact.chip')}
            </div>

            <h1
              className={cn(
                "text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                animationDelay: "0.2s",
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('contact.title')}
            </h1>

            <p
              className={cn(
                "text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto opacity-0 animate-on-scroll",
                isRTL ? "font-arabic" : ""
              )}
              style={{
                animationDelay: "0.4s",
                fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
              }}
            >
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center opacity-0 animate-on-scroll"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3
                    className={cn(
                      "text-lg font-semibold text-gray-900 mb-2",
                      isRTL ? "font-arabic" : ""
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={cn(
                      "text-gray-600",
                      isRTL ? "font-arabic" : ""
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">

            {/* Contact Form */}
            <div className="opacity-0 animate-on-scroll" style={{ animationDelay: "0.8s" }}>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="mb-8">
                  <h2
                    className={cn(
                      "text-2xl md:text-3xl font-bold text-gray-900 mb-4",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isRTL ? "أرسل لنا رسالة" : "Send us a message"}
                  </h2>
                  <p
                    className={cn(
                      "text-gray-600",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isRTL ? "سنتواصل معك في أقرب وقت ممكن" : "We'll get back to you as soon as possible"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className={cn(
                          "block text-sm font-medium text-gray-700 mb-2",
                          isRTL ? "font-arabic text-right" : "text-left"
                        )}
                        style={{
                          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                        }}
                      >
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
                          isRTL ? "text-right" : "text-left"
                        )}
                        style={{
                          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className={cn(
                          "block text-sm font-medium text-gray-700 mb-2",
                          isRTL ? "font-arabic text-right" : "text-left"
                        )}
                        style={{
                          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                        }}
                      >
                        {isRTL ? "رقم الهاتف" : "Phone Number"}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
                          isRTL ? "text-right" : "text-left"
                        )}
                        style={{
                          fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={cn(
                        "block text-sm font-medium text-gray-700 mb-2",
                        isRTL ? "font-arabic text-right" : "text-left"
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    >
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
                        isRTL ? "text-right" : "text-left"
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className={cn(
                        "block text-sm font-medium text-gray-700 mb-2",
                        isRTL ? "font-arabic text-right" : "text-left"
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    >
                      {t('contact.form.service')}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300",
                        isRTL ? "text-right" : "text-left"
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    >
                      <option value="">{isRTL ? "اختر الخدمة" : "Select a service"}</option>
                      <option value="travel">{isRTL ? "خدمات السفر" : "Travel Services"}</option>
                      <option value="education">{isRTL ? "الاستشارات التعليمية" : "Education Consulting"}</option>
                      <option value="trade">{isRTL ? "الاستيراد والتصدير" : "Import/Export"}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={cn(
                        "block text-sm font-medium text-gray-700 mb-2",
                        isRTL ? "font-arabic text-right" : "text-left"
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    >
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none",
                        isRTL ? "text-right" : "text-left"
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2",
                      isRTL ? "font-arabic space-x-reverse" : ""
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>{isRTL ? "جاري الإرسال..." : "Sending..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('contact.form.submit')}</span>
                      </>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <div
                      className={cn(
                        "flex items-center justify-center space-x-2 text-green-600 font-medium bg-green-50 p-4 rounded-xl",
                        isRTL ? "font-arabic space-x-reverse" : ""
                      )}
                      style={{
                        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                      }}
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>{t('contact.form.success')}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="opacity-0 animate-on-scroll" style={{ animationDelay: "1s" }}>
              <div className="space-y-8">
                <div>
                  <h2
                    className={cn(
                      "text-2xl md:text-3xl font-bold text-gray-900 mb-6",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isRTL ? "معلومات التواصل" : "Contact Information"}
                  </h2>
                </div>

                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className={cn("flex items-start", isRTL ? "space-x-reverse space-x-4" : "space-x-4")}>
                        <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0", info.color)}>
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <h3
                            className={cn(
                              "font-semibold text-gray-900 mb-2",
                              isRTL ? "font-arabic text-right" : "text-left"
                            )}
                            style={{
                              fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                            }}
                          >
                            {info.label}
                          </h3>
                          <p
                            className={cn(
                              "text-gray-600",
                              isRTL ? "font-arabic text-right" : "text-left"
                            )}
                            style={{
                              fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                            }}
                          >
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Map Placeholder */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3
                    className={cn(
                      "font-semibold text-gray-900 mb-4",
                      isRTL ? "font-arabic text-right" : "text-left"
                    )}
                    style={{
                      fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : undefined
                    }}
                  >
                    {isRTL ? "موقعنا" : "Our Location"}
                  </h3>
                  <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
