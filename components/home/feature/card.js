'use client';
import React from 'react';

export default function FeatureCard({ featureItem = {} }) {
	return (
		// PERUBAHAN:
		// 1. Ditambahkan `aspect-w-1 aspect-h-1` untuk mencoba membuat kartu persegi.
		// 2. Padding tetap p-4.
		<div
			className='w-full p-4 border-2 border-base-content rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-100 shadow-none hover:shadow-2xl hover:scale-110 bg-base-100 aspect-w-1 aspect-h-1'
		>
			{/* Ukuran ikon disesuaikan */}
			{featureItem.icon && React.createElement(featureItem.icon, { className: 'text-2xl' })}

			{/* Ukuran judul diperkecil */}
			<h2 className='text-base font-bold text-center'>{featureItem.title}</h2>
			
			{/* Ukuran deskripsi diperkecil */}
			<p className='text-center text-xs'>{featureItem.description}</p>
		</div>
	);
}
