'use client';
import React from 'react';

export default function FeatureCard({ featureItem = {} }) {
	return (
		// PERUBAHAN DI SINI:
		// 1. `aspect-square` ditambahkan untuk membuat rasio 1:1 (kotak).
		// 2. `justify-center` ditambahkan agar konten berada di tengah secara vertikal.
		<div
			className='w-full p-4 border-2 border-base-content rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-100 shadow-none hover:shadow-2xl hover:scale-110 bg-base-100 aspect-square'
		>
			<div className="text-center">
				{featureItem.icon && React.createElement(featureItem.icon, { className: 'text-2xl mx-auto' })}
				<h2 className='mt-2 text-base font-bold'>{featureItem.title}</h2>
				<p className='text-xs'>{featureItem.description}</p>
			</div>
		</div>
	);
}
