'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import TestimonialCard from './testimonial/card';
import { TestimonialsList } from '@/lib/testimonialsList';
import { motion } from 'framer-motion';
import { MdFeedback } from 'react-icons/md';

export default function Testimonial({ locale, langName = 'en' }) {
	let list = TestimonialsList[`TESTIMONIAL_${langName.toUpperCase()}`] || [];

	return (
		<section id='testimonial' className='relative py-10 md:py-20 overflow-hidden'>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* REVISI: Header dibuat lebih ringkas dan selalu di tengah */}
				<div className='relative z-10 flex flex-col gap-3 items-center mb-8 mx-auto text-center'>
					{/* REVISI: Ukuran "pill" diperkecil */}
					<div className='inline-flex items-center justify-center gap-2 border-2 border-base-content px-4 py-1 rounded-full text-base font-semibold'>
						<MdFeedback />
						<h2>{locale.h2}</h2>
					</div>
					{/* REVISI: Ukuran font diperkecil dan gradien dihapus */}
					<h3 className='font-bold text-2xl md:text-4xl text-base-content !leading-tight'>
						{locale.h3}
					</h3>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='w-full'
			>
				<Swiper
					modules={[Pagination]}
					spaceBetween={30}
					slidesPerView={1}
					pagination={{ clickable: true }}
					breakpoints={{
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className='w-full md:w-11/12 mx-auto pb-12' // Sedikit diperlebar untuk tampilan yang lebih seimbang
				>
					{list.map((item, index) => (
						<SwiperSlide key={index}>
							<TestimonialCard
								testimonialItem={item}
								langName={langName}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</motion.div>

			{/* REVISI: Ukuran dan opasitas elemen dekoratif diperkecil */}
			<div className='hidden md:block absolute left-[15%] top-[65%] z-0'>
				<div className='absolute h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.10),rgba(255,255,255,0))]'></div>
			</div>
		</section>
	);
}
