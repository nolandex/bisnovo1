'use client';
import Image from 'next/image';
// MdMenu dan MdClose dihapus karena tidak digunakan lagi
import { useEffect, useState } from 'react';
import ThemeToggle from './themeToggle';
import LangSwitch from './langSwitch';

import { usePathname } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { NavLinksList } from '@/lib/navLinksList';

export default function Navbar() {
	const pathname = usePathname();
	const [langName, setLangName] = useState(defaultLocale);
	const [linkList, setLinkList] = useState([]);
	
	// State dan ref untuk menu mobile dihapus
	// const [isMenuOpen, setIsMenuOpen] = useState(false);
	// const dropdownRef = useRef(null);

	// Logika untuk mengubah dan memfilter link navigasi
	useEffect(() => {
		const fetchLinksList = () => {
			if (pathname === '/') {
				setLangName(defaultLocale);
			} else {
				setLangName(pathname.split('/')[1]);
			}
			
			let originalLinks = NavLinksList[`LINK_${langName.toUpperCase()}`] || [];

			let modifiedLinks = originalLinks.map(link => {
				if (link.name.toLowerCase() === 'blog') {
					return { ...link, name: 'Kontak' };
				}
				return link;
			});
			
			const linksToRemove = ['faq', 'testimoni', 'feature', 'about']; 
			
			let filteredLinks = modifiedLinks.filter(link => 
				!linksToRemove.includes(link.name.toLowerCase())
			);

			setLinkList(filteredLinks);
		};

		fetchLinksList();
	}, [pathname, langName]);

	// useEffect untuk menutup menu saat klik di luar area dihapus

	return (
		<header className='w-full relative z-50 bg-base-100 px-5 container mx-auto flex justify-between items-center'>
			<a
				aria-label='brand logo'
				className='flex items-center'
				title='brand logo'
				href={`/${langName}`}
			>
				<h2 className='font-bold text-2xl'>Bisnovo</h2>
			</a>

			<ul className='hidden md:flex flex-nowrap items-center justify-center gap-10 font-medium'>
				{linkList.map((link, index) => (
					<li key={index} className='group py-3 text-center'>
						<a
							aria-label={link.name}
							className='group relative'
							title={link.name}
							href={`/${langName}${link.url}`}
						>
							{link.name}
							<div className='absolute left-[50%] group-hover:left-0 w-0 group-hover:w-full h-[3px] transition-all duration-300 bg-base-content/90'></div>
						</a>
					</li>
				))}
			</ul>

			<div className='flex items-center justify-end gap-2'>
				<ThemeToggle />
				<LangSwitch />
				{/* PERUBAHAN DI SINI: Menu hamburger telah dihapus */}
			</div>
		</header>
	);
}
