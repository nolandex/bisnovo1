import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// PERUBAHAN 1: Hanya menyisakan locale 'en' dan 'zh'
export const locales = ['', 'en', 'en-US', 'zh', 'zh-CN', 'zh-TW', 'zh-HK'];

// PERUBAHAN 2: Hanya menyisakan nama locale untuk 'en' dan 'zh'
export const localeNames = {
	en: '🇺🇸 English',
	zh: '🇨🇳 中文',
};

// PERUBAHAN 3: Mengubah bahasa default menjadi 'zh'
export const defaultLocale = 'zh';

// Fungsi ini tidak perlu diubah, akan bekerja dengan variabel yang sudah diubah di atas.
export function getLocale(headers) {
	let languages = new Negotiator({ headers }).languages();
	return match(languages, locales, defaultLocale);
}

// PERUBAHAN 4: Hanya menyisakan dictionary untuk 'en' dan 'zh'
const dictionaries = {
	en: () => import('@/locales/en.json').then((module) => module.default),
	zh: () => import('@/locales/zh.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
	// Logika ini tetap relevan untuk menangani varian 'zh'
	if (['zh-CN', 'zh-TW', 'zh-HK'].includes(locale)) {
		locale = 'zh';
	}

	// Logika fallback diubah agar lebih dinamis menggunakan defaultLocale
	if (!Object.keys(dictionaries).includes(locale)) {
		locale = defaultLocale;
	}

	return dictionaries[locale]();
};
