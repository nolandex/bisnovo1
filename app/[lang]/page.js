// File: app/[lang]/page.jsx (atau file halaman utama Anda)

import { defaultLocale, getDictionary } from '@/lib/i18n';

import Hero from '@/components/home/hero';
import Feature from '@/components/home/feature';
import Pricing from '@/components/home/pricing';
import Testimonial from '@/components/home/testimonial';
import Faq from '@/components/home/faq';
// import Cta from '@/components/home/cta'; // Import Cta dihapus

export default async function Home({ params }) {
	const langName = params.lang || defaultLocale;
	const dict = await getDictionary(langName); // 获取内容

	return (
		<div className='container mx-auto md:px-5'>
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
			{/* Komponen Cta telah dihapus dari sini */}
		</div>
	);
}
