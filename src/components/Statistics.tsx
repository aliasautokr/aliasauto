'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Statistics() {
  const t = useTranslations('statistics');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const statistics = [
    {
      number: 500,
      suffix: '+',
      label: t('carsExported')
    },
    {
      number: 20,
      suffix: '+',
      label: t('partners')
    },
    {
      number: 35,
      suffix: '%',
      label: t('growth')
    }
  ];

  return (
    <section className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center h-full"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 rounded-lg p-8 h-full flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
                >
                  {isInView && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stat.number}{stat.suffix}
                    </motion.span>
                  )}
                </motion.div>
                <p className="text-gray-300 text-lg font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
