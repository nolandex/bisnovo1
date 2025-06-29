'use client';

import Image from 'next/image';

export default function TestimonialCard({ testimonialItem = {} }) {
	return (
		// REVISI DRATIS: Semua elemen diperkecil secara signifikan
		<div className='bg-base-200 p-3 rounded-lg h-full flex flex-col'>
			<div className='flex items-center gap-2 mb-2'>
				{/* Avatar & Font diperkecil drastis */}
				<div className='relative w-8 h-8 flex-shrink-0'>
					<Image
						src={testimonialItem.avatar}
						alt={testimonialItem.nickname}
						fill
						className='rounded-full object-cover'
					/>
				</div>
				<div>
					<p className='font-semibold text-sm text-base-content'>{testimonialItem.nickname}</p>
					<p className='text-xs text-base-content/70'>{testimonialItem.description}</p>
				</div>
			</div>

			<div className='flex-grow mt-1'>
				{/* Font konten juga diperkecil */}
				<p className='text-xs text-base-content/80 leading-normal'>
					&ldquo;{testimonialItem.content}&rdquo;
				</p>
			</div>
		</div>
	);
}
