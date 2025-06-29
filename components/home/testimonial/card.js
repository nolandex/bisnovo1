'use client';

import Image from 'next/image';

export default function TestimonialCard({ testimonialItem = {}, langName = 'en' }) {
	return (
		// Kartu dibuat menjadi flex container vertikal dengan tinggi penuh (h-full)
		// agar ukurannya seragam di dalam slider Swiper.
		<div className='bg-base-200 p-6 rounded-lg h-full flex flex-col'>
			
			{/* PERUBAHAN 1: Header kartu diubah menjadi flex-row */}
			<div className='flex items-center gap-4 mb-4'>
				<div className='relative w-12 h-12'>
					<Image
						src={testimonialItem.avatar}
						alt={testimonialItem.nickname}
						fill
						className='rounded-full object-cover'
					/>
				</div>
				{/* Nama dan deskripsi berada di dalam div ini, di sebelah kanan gambar */}
				<div>
					<p className='font-semibold text-base-content'>{testimonialItem.nickname}</p>
					<p className='text-sm text-base-content/70'>{testimonialItem.description}</p>
				</div>
			</div>

			{/* PERUBAHAN 2: Teks konten diperkecil menjadi 'text-sm' */}
			{/* 'flex-grow' digunakan agar konten mengisi ruang dan mendorong header ke atas */}
			<div className='flex-grow'>
				<p className='text-sm text-base-content/80 leading-relaxed'>
					"{testimonialItem.content}"
				</p>
			</div>
		</div>
	);
}
