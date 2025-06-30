'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import LangSwitch from './langSwitch'; // ThemeToggle sudah dihapus
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
		// --- PERUBAHAN PADA HEADER ---
		// Menghapus class 'fixed', 'top-0', 'backdrop-blur-md', dll.
		// Navbar sekarang akan scroll bersama halaman.
		<header className='w-full bg-base-100 shadow-sm'>
			<nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-14'>
					<Link
						href={`/${langName}`}
						className='text-xl font-bold text-base-content'
						aria-label='brand logo'
						title='brand logo'
					>
						Bisnovo
					</Link>

					{/* Toggle Tema sudah dihapus, hanya menyisakan LangSwitch */}
					<div className='flex items-center gap-2'>
						<LangSwitch />
					</div>
				</div>
			</nav>
		</header>
	);
}
