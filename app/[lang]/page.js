'use client';
import { useEffect } from 'react';

function ClearThemeOnce() {
	useEffect(() => {
		localStorage.removeItem('theme');
		document.documentElement.setAttribute('data-theme', 'corporate');
	}, []);
	return null;
}

// File: app/[lang]/page.jsx
import { defaultLocale, getDictionary } from '@/lib/i18n';

import Hero from '@/components/home/hero';
import Feature from '@/components/home/feature';
import Pricing from '@/components/home/pricing';
import Testimonial from '@/components/home/testimonial';
import Faq from '@/components/home/faq';

export default async function Home({ params }) {
	const langName = params.lang || defaultLocale;
	const dict = await getDictionary(langName); // 获取内容

	return (
		<div className='container mx-auto md:px-5'>
			<ClearThemeOnce /> {/* Bersihkan sisa tema gelap */}
			<Hero
				locale={dict.Hero}
				CTALocale={dict.CTAButton}
			/>
			<Pricing
				locale={dict.Pricing}
				langName={langName}
			/>
			<Feature
				locale={dict.Feature}
				langName={langName}
			/>
			<Testimonial
				locale={dict.Testimonial}
				langName={langName}
			/>
			<Faq
				locale={dict.Faq}
				langName={langName}
			/>
		</div>
	);
}
