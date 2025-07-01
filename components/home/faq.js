'use client';
import { FAQList } from '@/lib/faqsList';
import { motion } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';

export default function Feature({ locale, langName = 'en' }) {
	let list = FAQList[`FAQ_${langName.toUpperCase()}`] || [];

	return (
		<section id='faq' className='relative py-10 md:py-20 overflow-hidden'>
			{/* Blok Judul: Dibuat mirip dengan komponen Testimonial */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className='relative z-10 flex flex-col gap-5 items-start md:items-center mb-10 mx-auto px-4'>
					{/* Badge Judul */}
					<div className='relative inline-flex items-center justify-center gap-2 border-2 border-base-content px-5 py-1 rounded-full text-lg md:text-xl font-semibold'>
						<FaQuestionCircle /> <h2>{locale.h2}</h2>
					</div>
					{/* Subjudul dengan gradient */}
					<h3 className='font-bold text-3xl md:text-5xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] md:text-center bg-clip-text text-transparent !leading-[1.25em]'>
						{locale.h3}
					</h3>
				</div>
			</motion.div>

			{/* Blok Konten FAQ */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div className='relative z-10 w-full md:w-10/12 lg:w-8/12 mx-auto flex flex-col gap-3 px-4'>
					{list.map((item, index) => (
						<div
							key={index}
							tabIndex={0}
							className='collapse collapse-plus bg-base-200/50 rounded-lg border border-base-content/10'
						>
							<div className={`collapse-title text-base font-medium ${langName === 'ar' ? 'text-right' : 'text-left'}`}>
								{item.question}
							</div>
							<div className={`collapse-content text-sm text-base-content/80 ${langName === 'ar' ? 'text-right' : 'text-left'}`}>
								<p>{item.answer}</p>
							</div>
						</div>
					))}
				</div>
			</motion.div>

			{/* Dekorasi Background: Posisi 'left' diubah */}
			<div className='hidden md:block absolute left-[20%] top-[20%] z-0'>
				<div className='absolute h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.10),rgba(255,255,255,0))]'></div>
			</div>
		</section>
	);
}
