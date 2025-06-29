'use client';
import { FaCheck } from 'react-icons/fa';

export default function PricingCard({ pricingItem = {} }) {
 	return (
		// PERUBAHAN 1: Kartu dijadikan flex container vertikal dan tinggi penuh (h-full)
		// agar bisa menyesuaikan dengan kartu tertinggi di dalam grid.
		<div className='relative border-2 border-base-content rounded-xl p-5 flex flex-col h-full'>
			<h2 className='text-2xl font-bold mb-2'>{pricingItem.title}</h2>
			<p className='text-base-content/80 mb-5'>{pricingItem.description}</p>
			<div className='mb-5'>
				<span className='text-4xl font-extrabold'>{pricingItem.price}</span>
				<span className='text-base-content/80'>/{pricingItem.duration}</span>
			</div>

			{/* PERUBAHAN 2: Daftar fitur diberi 'flex-grow' agar mengisi ruang kosong
			    dan mendorong tombol ke bawah. */}
			<ul className='space-y-2 mb-10 flex-grow'>
				{pricingItem.features &&
					pricingItem.features.map((feature, featureIndex) => {
						return (
							<li
								key={featureIndex}
								className='flex items-center gap-2'
							>
								<FaCheck className='text-primary' /> {feature}
							</li>
						);
					})}
			</ul>
			
			{/* Tombol ini akan selalu berada di bagian bawah kartu */}
			<button className='w-full text-center py-3 rounded-lg bg-primary text-primary-content font-semibold hover:bg-primary/80 transition-all'>
				Choose Plan
			</button>
		</div>
	);
}
