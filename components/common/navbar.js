'use client';

// Import dari React dan Next.js
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Import komponen dan utilitas Anda
import ThemeToggle from './themeToggle';
import LangSwitch from './langSwitch';
import { defaultLocale } from '@/lib/i18n'; // Impor defaultLocale
import { NavLinksList } from '@/lib/navLinksList';

// Import ikon untuk menu hamburger dari lucide-react
import { Menu, X } from 'lucide-react';

export default function Navbar() {
	const pathname = usePathname();
	const [langName, setLangName] = useState(defaultLocale);
	const [linkList, setLinkList] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const fetchLinksList = () => {
            // Tetap deteksi bahasa untuk URL tujuan (`href`)
			if (pathname === '/') {
				setLangName(defaultLocale);
			} else {
				setLangName(pathname.split('/')[1] || defaultLocale);
			}

            // --- PERUBAHAN DI SINI ---
			// Selalu gunakan link dari bahasa default untuk teks yang ditampilkan
			let originalLinks = NavLinksList[`LINK_${defaultLocale.toUpperCase()}`] || [];

			let modifiedLinks = originalLinks.map((link) => {
				if (link.name.toLowerCase() === 'blog') {
					return { ...link, name: 'Kontak' };
				}
				return link;
			});

			const linksToRemove = ['faq', 'testimoni', 'feature', 'about'];
			let filteredLinks = modifiedLinks.filter(
				(link) => !linksToRemove.includes(link.name.toLowerCase())
			);

			setLinkList(filteredLinks);
		};

		fetchLinksList();
        // Cukup jalankan saat pathname berubah, karena teks link tidak lagi bergantung pada `langName`
	}, [pathname]);


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-base-100/80 backdrop-blur-md shadow-sm'>
			<nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<Link
						href={`/${langName}`}
						className='text-2xl font-bold text-base-content'
						aria-label='brand logo'
						title='brand logo'
					>
						Bisnovo
					</Link>

					<ul className='hidden lg:flex space-x-8 items-center'>
						{linkList.map((link, index) => (
							<li key={index}>
								<Link
									href={`/${langName}${link.url}`}
									className='text-sm font-medium text-base-content hover:text-primary transition-colors'
									title={link.name}
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>

					<div className='flex items-center gap-2'>
						<ThemeToggle />
						<LangSwitch />
						<div className='lg:hidden' ref={dropdownRef}>
							<button
								onClick={() => setIsOpen(!isOpen)}
								className='p-2 rounded-md text-base-content focus:outline-none'
								aria-label='Toggle Menu'
							>
								{isOpen ? <X size={24} /> : <Menu size={24} />}
							</button>
						</div>
					</div>
				</div>

				{isOpen && (
					<div className='lg:hidden w-full px-2 pb-4 pt-2'>
						<ul className='space-y-1'>
							{linkList.map(({ url, name }, index) => (
								<li key={index}>
									<Link
										href={`/${langName}${url}`}
										onClick={() => setIsOpen(false)}
										className='flex items-center gap-4 p-3 rounded-lg text-base-content hover:bg-base-200 transition-colors'
										title={name}
									>
										<span className='text-base font-medium'>{name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</nav>
		</header>
	);
}
