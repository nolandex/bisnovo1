'use client';
import { FAQList } from '@/lib/faqsList';
import { motion } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';

export default function Feature({ locale, langName = 'en' }) {
	let list = FAQList[`FAQ_${langName.toUpperCase()}`] || [];

	return (
		<section id='faq' className='relative py-10 md:py-20 overflow-hidden'>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* Judul & Subjudul rata kiri */}
				<div className='relative z-10 flex flex-col gap-3 items-start mb-8 mx-auto text-left w-full max-w-3xl px-4'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-4 py-1 rounded-full text-base font-semibold'>
						<FaQuestionCircle /> <h2>{locale.h2}</h2>
					</div>
					<h3 className='font-bold text-2xl md:text-4xl text-base-content !leading-tight'>
						{locale.h3}
					</h3>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{/* Daftar FAQ */}
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

			{/* Dekorasi background */}
			<div className='hidden md:block absolute left-[50%] top-[20%] z-0'>
				<div className='absolute h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.10),rgba(255,255,255,0))]'></div>
			</div>
		</section>
	);
}
