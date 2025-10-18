'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      quote: t('testimonial1.quote'),
      name: t('testimonial1.name'),
      location: t('testimonial1.location')
    },
    {
      quote: t('testimonial2.quote'),
      name: t('testimonial2.name'),
      location: t('testimonial2.location')
    },
    {
      quote: t('testimonial3.quote'),
      name: t('testimonial3.name'),
      location: t('testimonial3.location')
    },
    {
      quote: t('testimonial4.quote'),
      name: t('testimonial4.name'),
      location: t('testimonial4.location')
    },
    {
      quote: t('testimonial5.quote'),
      name: t('testimonial5.name'),
      location: t('testimonial5.location')
    }
  ];

  return (
    <section className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="rounded-lg text-card-foreground shadow-sm h-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
                <div className="p-8">
                  <div className="mb-6">
                    <svg className="w-8 h-8 text-amber-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                  <blockquote className="text-gray-300 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-white/10 pt-4">
                        <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
