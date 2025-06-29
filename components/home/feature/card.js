'use client';
import React from 'react';

export default function FeatureCard({ featureItem }) {
	return (
		<div className="flex flex-col items-center justify-start text-center border-2 border-base-content rounded-xl p-5 h-[220px] w-full shadow transition-all duration-300 hover:shadow-xl">
			<div className="text-3xl mb-2">{<featureItem.icon />}</div>
			<h3 className="font-bold text-base">{featureItem.title}</h3>
			<p className="text-sm opacity-80 line-clamp-2">{featureItem.description}</p>
		</div>
	);
}
