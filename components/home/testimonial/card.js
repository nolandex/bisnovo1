'use client';

import Image from 'next/image';

export default function TestimonialCard({ testimonialItem = {}, langName = 'en' }) {
	return (
		// REVISI: Padding diperkecil dari p-6 menjadi p-4
		<div className='bg-base-200 p-4 rounded-lg h-full flex flex-col'>
			{/* REVISI: Gap dan margin bawah diperkecil */}
			<div className='flex items-center gap-3 mb-3'>
				{/* REVISI: Ukuran avatar diperkecil dari w-12 h-12 menjadi w-10 h-10 */}
				<div className='relative w-10 h-10 flex-shrink-0'>
					<Image
						src={testimonialItem.avatar}
						alt={testimonialItem.nickname}
						fill
						className='rounded-full object-cover'
					/>
				</div>
				<div>
					<p className='font-semibold text-base-content'>{testimonialItem.nickname}</p>
					<p className='text-sm text-base-content/70'>{testimonialItem.description}</p>
				</div>
			</div>

			<div className='flex-grow'>
				{/* REVISI: Jarak antar baris teks diubah dari relaxed menjadi normal */}
				<p className='text-sm text-base-content/80 leading-normal'>
					&ldquo;{testimonialItem.content}&rdquo;
				</p>
			</div>
		</div>
	);
}
