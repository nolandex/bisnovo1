'use client';
import Image from 'next/image';
import { MdMenu, MdClose } from 'react-icons/md';
import { useEffect, useState, useRef } from 'react';
import ThemeToggle from './themeToggle';
import LangSwitch from './langSwitch';

import { usePathname } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { NavLinksList } from '@/lib/navLinksList';

export default function Navbar() {
	const pathname = usePathname();
	const [langName, setLangName] = useState(defaultLocale);
	const [linkList, setLinkList] = useState([]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Logika untuk mengubah dan memfilter link navigasi
	useEffect(() => {
		const fetchLinksList = () => {
			if (pathname === '/') {
				setLangName(defaultLocale);
			} else {
				setLangName(pathname.split('/')[1]);
			}
			
			// Ambil daftar link asli
			let originalLinks = NavLinksList[`LINK_${langName.toUpperCase()}`] || [];

			// Ganti nama 'Blog' menjadi 'Kontak'
			let modifiedLinks = originalLinks.map(link => {
				if (link.name.toLowerCase() === 'blog') {
					return { ...link, name: 'Kontak' };
				}
				return link;
			});
			
			// Hapus link 'FAQ', 'Testimoni', dan 'Feature'
			const linksToRemove = ['faq', 'testimonials', 'features'];
			let filteredLinks = modifiedLinks.filter(link => 
				!linksToRemove.includes(link.name.toLowerCase())
			);

			setLinkList(filteredLinks);
		};

		fetchLinksList();
	}, [pathname, langName]);


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);


	return (
		<header className='w-full relative z-50 bg-base-100 p-5 pb-0 container mx-auto md:mb-5 flex justify-between items-center'>
			{/* Logo dan Nama Brand */}
			<a
				aria-label='brand logo'
				className='flex items-center' // Dihapus: w-1/2 md:w-1/5
				title='brand logo'
				href={`/${langName}`}
			>
				{/* Ikon dihapus, hanya teks */}
				<h2 className='font-bold text-2xl'>Bisnovo</h2>
			</a>

			{/* Navigasi Desktop */}
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

			{/* Tombol Aksi dan Menu Mobile */}
			<div className='flex items-center justify-end gap-2'>
				{/* Ikon GitHub Dihapus */}
				<ThemeToggle />
				<LangSwitch />
				<div ref={dropdownRef} className='flex md:hidden relative'>
					<button
						className='btn btn-ghost p-0'
						aria-label='toggle menu'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <MdClose size={20} /> : <MdMenu size={18} />}
					</button>

					{isMenuOpen && (
						<ul className='menu absolute top-full right-0 mt-2 z-[100] p-2 shadow bg-base-100 rounded-box w-52'>
							{linkList.map((link, index) => (
								<li key={index}>
									<a
										aria-label={link.name}
										title={link.name}
										href={`/${langName}${link.url}`}
										onClick={() => setIsMenuOpen(false)}
									>
										{link.name}
									</a>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</header>
	);
}
