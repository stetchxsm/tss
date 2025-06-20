import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
}

const TestimonialCard = ({
  content,
  author,
  role
}: TestimonialProps) => {
  return (
    <div className="bg-white rounded-3xl p-8 h-full flex flex-col justify-between shadow-elegant hover:shadow-elegant-hover transform transition-all duration-300 hover:-translate-y-2 relative overflow-hidden border border-gray-100">
      {/* Quote icon */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
        <Quote className="w-6 h-6 text-blue-600" />
      </div>

      <div className="relative z-10">
        <p className="text-gray-700 text-lg mb-8 font-medium leading-relaxed pr-16">{`"${content}"`}</p>
        <div className="border-t border-gray-100 pt-6">
          <h4 className="font-semibold text-xl text-gray-900 mb-1">{author}</h4>
          <p className="text-blue-600 font-medium">{role}</p>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const testimonials = t('testimonials.items', { returnObjects: true }) as any[];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative" id="testimonials" ref={sectionRef}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
            {t('testimonials.chip')}
          </div>
          <h2 className="section-title mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="section-subtitle mx-auto">
            تجارب حقيقية من عملائنا الكرام الذين وثقوا بخدماتنا المتميزة
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              gradient={testimonial.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
