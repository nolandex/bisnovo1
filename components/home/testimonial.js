'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import TestimonialCard from './testimonial/card';
import { TestimonialsList } from '@/lib/testimonialsList';
import { motion } from 'framer-motion';

export default function Testimonial({ locale, langName = 'en' }) {
  const list = TestimonialsList[`TESTIMONIAL_${langName.toUpperCase()}`] || [];

  return (
    <section id="testimonial" className="relative py-8 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2 items-center mb-6 mx-auto text-center">
          <h2 className="font-semibold text-base border-2 border-base-content px-3 py-1 rounded-full">
            {locale.h2}
          </h2>
          <h3 className="font-bold text-xl md:text-3xl text-base-content !leading-tight">
            {locale.h3}
          </h3>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="w-full"
      >
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full md:w-11/12 mx-auto pb-10"
        >
          {list.map((item, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonialItem={item} langName={langName} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
