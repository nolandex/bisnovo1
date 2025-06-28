'use client';
import Image from 'next/image';
import { MdMenu, MdClose } from 'react-icons/md'; // Impor ikon Close
import { SiGithub } from 'react-icons/si';
import { useEffect, useState, useRef } from 'react'; // Impor useRef
import ThemeToggle from './themeToggle';
import LangSwitch from './langSwitch';

import { usePathname } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { NavLinksList } from '@/lib/navLinksList';

export default function Navbar() {
	const pathname = usePathname();
	const [langName, setLangName] = useState(defaultLocale);
	const [linkList, setLinkList] = useState([]);
	
	// 1. State untuk mengontrol visibilitas menu mobile
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dropdownRef = useRef(null); // Ref untuk dropdown menu

	useEffect(() => {
		const fetchLinksList = async () => {
			if (pathname === '/') {
				setLangName(defaultLocale);
			} else {
				setLangName(pathname.split('/')[1]);
			}
			setLinkList(NavLinksList[`LINK_${langName.toUpperCase()}`] || []);
		};
		fetchLinksList();
	}, [pathname, langName]);

	// 2. useEffect untuk menutup menu saat klik di luar area menu
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
		// Tambahkan event listener saat komponen dimuat
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Hapus event listener saat komponen dibongkar
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);


	return (
		<header className='w-full relative z-50 bg-base-100 p-5 pb-0 container mx-auto md:mb-5 flex justify-between items-center'>
			<a
				aria-label='landing page template'
				className='flex items-center w-1/2 md:w-1/5'
				title='landing page template'
				href={`/${langName}`}
			>
				<Image
					width={200}
					height={200}
					src={'/logo.gif'}
					className='transition-all hover:scale-110 w-6 md:w-10 h-6 md:h-10'
					alt='logo'
				></Image>
				<h2 className='ml-3 font-bold leading-5'>Landing Page</h2>
			</a>

			<ul className='w-3/5 px-5 font-medium hidden md:flex flex-nowrap items-center justify-around'>
				{linkList.map((link, index) => {
					return (
						<li
							key={index}
							className='group py-3 text-center'
						>
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
					);
				})}
			</ul>

			<div className='md:w-1/5 flex items-center justify-end gap-2'>
				<label className='flex items-center justify-center md:bg-base-100 md:rounded-full w-5 md:w-8 h-5 md:h-8 md:shadow-sm md:hover:shadow-md transition-all'>
					<a
						aria-label='get template source code'
						title='get template source code'
						href='https://github.com/huglemon/inwind-landing-page'
					>
						<SiGithub size={14} />
					</a>
				</label>
				<ThemeToggle />
				<LangSwitch />

				{/* 3. Modifikasi Menu Hamburger */}
				<div ref={dropdownRef} className='flex md:hidden relative'>
					<button
						className='btn btn-ghost p-0'
						aria-label='toggle menu'
						onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle state saat tombol diklik
					>
						{/* Ganti ikon berdasarkan state */}
						{isMenuOpen ? <MdClose size={20} /> : <MdMenu size={18} />}
					</button>

					{/* Tampilkan menu jika isMenuOpen bernilai true */}
					{isMenuOpen && (
						<ul className='menu absolute top-full right-0 mt-2 z-[100] p-2 shadow bg-base-100 rounded-box w-52'>
							{linkList.map((link, index) => {
								return (
									<li key={index}>
										<a
											aria-label={link.name}
											title={link.name}
											href={`/${langName}${link.url}`}
											onClick={() => setIsMenuOpen(false)} // 4. Tutup menu saat link diklik
										>
											{link.name}
										</a>
									</li>
								);
							})}
						</ul>
					)}
				</div>

			</div>
		</header>
	);
}
