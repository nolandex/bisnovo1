'use client';

import Image from 'next/image';

export default function TestimonialCard({ testimonialItem = {} }) {
	return (
		// REVISI TOTAL: Layout diubah untuk tampilan yang lebih minimalis dan profesional.
		<div className='bg-base-200 p-4 rounded-lg h-full flex flex-col justify-between'>
			{/* Konten testimoni menjadi fokus utama di atas */}
			<div>
				<p className='text-sm text-base-content/85 leading-relaxed'>
					&ldquo;{testimonialItem.content}&rdquo;
				</p>
			</div>

			{/* Atribut (nama & avatar) diletakkan di bagian bawah dengan ukuran lebih kecil */}
			<div className='flex items-center gap-3 mt-4 pt-4 border-t border-base-content/10'>
				<div className='relative w-9 h-9 flex-shrink-0'>
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
		</div>
	);
}
