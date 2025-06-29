'use client';

export default function FeatureCard({ featureItem }) {
	return (
		<div className="flex flex-col items-center text-center border-2 border-base-content rounded-xl p-5 min-h-[220px] flex-1 shadow hover:shadow-xl transition-all duration-300">
			<div className="text-4xl mb-2">{<featureItem.icon />}</div>
			<h3 className="font-bold text-lg">{featureItem.title}</h3>
			<p className="text-sm opacity-80">{featureItem.description}</p>
		</div>
	);
}
