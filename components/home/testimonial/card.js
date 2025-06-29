'use client';

import Image from 'next/image';

export default function TestimonialCard({ testimonialItem = {}, langName = 'en' }) {
	return (
		<div className='bg-base-200 p-6 rounded-lg h-full flex flex-col'>
			<div className='flex items-center gap-4 mb-4'>
				<div className='relative w-12 h-12'>
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
				{/* PERUBAHAN DI SINI: 
				  Tanda kutip "..." diubah menjadi entitas HTML &ldquo;...&rdquo; 
				  untuk memperbaiki error build.
				*/}
				<p className='text-sm text-base-content/80 leading-relaxed'>
					&ldquo;{testimonialItem.content}&rdquo;
				</p>
			</div>
		</div>
	);
}
