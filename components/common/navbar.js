'use client';

// Import dari React dan Next.js
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Import komponen dan utilitas Anda
import ThemeToggle from './themeToggle';
import LangSwitch from './langSwitch';
import { defaultLocale } from '@/lib/i18n';
// NavLinksList tidak lagi diperlukan karena navigasi dihapus
// import { NavLinksList } from '@/lib/navLinksList';

export default function Navbar() {
	const pathname = usePathname();
	const [langName, setLangName] = useState(defaultLocale);

	// useState untuk linkList dan useEffect untuk mengambil data link sudah dihapus
	useEffect(() => {
		// Logika ini tetap dibutuhkan untuk membuat link logo dan LangSwitch berfungsi benar
		if (pathname === '/') {
			setLangName(defaultLocale);
		} else {
			setLangName(pathname.split('/')[1] || defaultLocale);
		}
	}, [pathname]);

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-base-100/80 backdrop-blur-md shadow-sm'>
			<nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Link
						href={`/${langName}`}
						className='text-2xl font-bold text-base-content'
						aria-label='brand logo'
						title='brand logo'
					>
						Bisnovo
					</Link>

					{/* Bagian Navigasi (<ul>) sudah dihapus seluruhnya */}

					{/* Tombol Aksi di sisi kanan */}
					<div className='flex items-center gap-2'>
						<ThemeToggle />
						<LangSwitch />
					</div>
				</div>
			</nav>
		</header>
	);
}
