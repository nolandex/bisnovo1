'use client';
import { FAQList } from '@/lib/faqsList';
import { motion } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';

export default function Feature({ locale, langName = 'en' }) {
	let list = FAQList[`FAQ_${langName.toUpperCase()}`] || [];
	return (
		<section
			id='faq'
			className='relative py-10 md:py-20 overflow-hidden' // Menambahkan overflow-hidden untuk kerapian
		>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.5,
				}}
			>
				{/* REVISI: Header dibuat lebih ringkas dan selalu di tengah */}
				<div className='relative z-10 flex flex-col gap-3 items-center mb-8 mx-auto text-center'>
					{/* REVISI: Ukuran "pill" diperkecil */}
					<div className='inline-flex items-center justify-center gap-2 border-2 border-base-content px-4 py-1 rounded-full text-base font-semibold'>
						<FaQuestionCircle /> <h2>{locale.h2}</h2>
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
				transition={{
					duration: 0.5,
					delay: 0.2
				}}
			>
				{/* REVISI: Jarak antar item FAQ diperkecil */}
				<div className='relative z-10 w-full md:w-10/12 lg:w-8/12 mx-auto flex flex-col gap-3'>
					{list.map((item, index) => {
						return (
							// REVISI: Desain accordion diubah menjadi card-based yang lebih modern
							<div
								key={index}
								tabIndex={0}
								className='collapse collapse-plus bg-base-200/50 rounded-lg border border-base-content/10'
							>
								{/* REVISI: Font judul pertanyaan diperkecil */}
								<div className={`collapse-title text-base font-medium ${langName === 'ar' ? 'text-right' : ''}`}>
									{item.question}
								</div>
								<div className={`collapse-content text-sm text-base-content/80 ${langName === 'ar' ? 'text-right' : ''}`}>
									<p>{item.answer}</p>
								</div>
							</div>
						);
					})}
				</div>
			</motion.div>

			{/* REVISI: Elemen dekoratif diperkecil dan diposisikan ulang */}
			<div className='hidden md:block absolute left-[50%] top-[20%] z-0'>
				<div className='absolute h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.10),rgba(255,255,255,0))]'></div>
			</div>
		</section>
	);
}
