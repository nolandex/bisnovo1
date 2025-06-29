import { reportLanguage } from './lib/function/lang';
// PERUBAHAN 1: Impor locales dan defaultLocale dari file i18n
import { locales, defaultLocale } from './lib/i18n'; 
import { NextRequest, NextResponse } from 'next/server';

// PERUBAHAN 2: Gunakan variabel `defaultLocale` untuk tujuan rewrite
const rewritePaths = [
    { pattern: /^\/$/, destination: `/${defaultLocale}/` },
	{ pattern: /^\/about(\/)?$/, destination: `/${defaultLocale}/about` },
    { pattern: /^\/blog(\/)?$/, destination: `/${defaultLocale}/blog` },
    { pattern: /^\/blog\/([^\/]+)(\/)?$/, destination: `/${defaultLocale}/blog/$1` },
    // Anda bisa menambahkan aturan lain di sini jika perlu
];

export function middleware(request) {
	const { pathname } = request.nextUrl;
	console.log("当前路径:", pathname);

	const lang = reportLanguage(pathname);
	request.headers.set('x-pathname', pathname);
	request.headers.set('x-language-directory', lang);

	const isExit = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

	// Aplikasi aturan rewrite
	for (const { pattern, destination } of rewritePaths) {
		const match = pathname.match(pattern);
		if (match) {
			console.log(`重写路径: ${pathname} -> ${destination}`);
			// Logika replace di sini tidak perlu diubah karena sudah menggunakan pattern
			request.nextUrl.pathname = pathname.replace(pattern, destination);
			return NextResponse.rewrite(request.nextUrl);
		}
	}

	if (isExit) return NextResponse.next();

	// Jika tidak ada aturan yang cocok, redirect ke halaman utama (yang akan di-rewrite lagi)
	console.log(`重定向到根路径: ${pathname} -> /`);
	request.nextUrl.pathname = `/`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: ['/((?!_next)(?!.*\\.(?:ico|png|gif|svg|jpg|jpeg|xml|txt|mp4)$)(?!/api).*)'],
};
