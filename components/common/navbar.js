'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import ThemeToggle from './themeToggle';
import LangSwitch from './langSwitch';
import { defaultLocale } from '@/lib/i18n';

export default function Navbar() {
	const pathname = usePathname();
	const [langName, setLangName] = useState(defaultLocale);

	useEffect(() => {
		if (pathname === '/') {
			setLangName(defaultLocale);
		} else {
			setLangName(pathname.split('/')[1] || defaultLocale);
		}
	}, [pathname]);

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-base-100/80 backdrop-blur-md shadow-sm'>
			<nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
                {/* --- PERUBAHAN TINGGI NAVBAR DI SINI --- */}
				<div className='flex items-center justify-between h-14'>
					{/* --- PERUBAHAN UKURAN FONT LOGO DI SINI --- */}
					<Link
						href={`/${langName}`}
						className='text-xl font-bold text-base-content' // Diubah dari text-2xl menjadi text-xl
						aria-label='brand logo'
						title='brand logo'
					>
						Bisnovo
					</Link>

					<div className='flex items-center gap-2'>
						<ThemeToggle />
						<LangSwitch />
					</div>
				</div>
			</nav>
		</header>
	);
}
