'use client';
import { FaInstagram, FaTiktok, FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

// Daftar media sosial untuk ditampilkan di footer
const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bisnovo',
    icon: FaInstagram,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@bisnovo',
    icon: FaTiktok,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1H87XB9aw7/',
    icon: FaFacebook,
  },
  {
    name: 'WhatsApp',
    url: 'https://api.whatsapp.com/send/?phone=6285156779923',
    icon: FaWhatsapp,
  },
  {
    name: 'Email',
    url: 'mailto:bisnovohq@gmail.com',
    icon: FaEnvelope,
  },
];

export default function Footer() {
	return (
		<footer className='w-full px-5 py-10 bg-[#202020] text-[#f7f7f7]'>
			<div className='container mx-auto flex flex-col items-center gap-5'>
				{/* Judul atau Nama Brand */}
				<h2 className='text-2xl font-bold'>Bisnovo</h2>
				
				{/* Ikon Media Sosial */}
				<div className='flex items-center justify-center gap-6'>
					{socialLinks.map((social, index) => (
						<a
							key={index}
							href={social.url}
							title={social.name}
							target='_blank'
							rel='noopener noreferrer'
							className='text-2xl text-gray-400 hover:text-white transition-colors'
							aria-label={social.name}
						>
							<social.icon />
						</a>
					))}
				</div>

				{/* Copyright */}
				<p className='text-sm text-gray-500 mt-4'>
					© {new Date().getFullYear()} Bisnovo. All Rights Reserved.
				</p>
			</div>
		</footer>
	);
}
