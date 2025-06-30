import { locales, defaultLocale } from '@/lib/i18n';
import { SiteConfig } from '@/lib/config/site';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

export async function generateMetadata({ params }) {
  const paramLang = params?.lang;
  const lang = paramLang && locales.includes(paramLang) ? paramLang : defaultLocale;

  if (!SiteConfig[lang]) {
    console.error(`Language config not found: ${lang}`);
    return {
      title: SiteConfig[defaultLocale].name,
    };
  }

  return {
    title: SiteConfig[lang].name,
    description: SiteConfig[lang].description,
    keywords: SiteConfig[lang].keywords,
    authors: SiteConfig[lang].authors,
    creator: SiteConfig[lang].creator,
    icons: SiteConfig[lang].icons,
    metadataBase: SiteConfig[lang].metadataBase,
    openGraph: SiteConfig[lang].openGraph,
    twitter: SiteConfig[lang].twitter,
  };
}

export default function LangLayout({ children, params }) {
  const lang = params?.lang || defaultLocale;

  return (
    <html lang={lang} data-theme="corporate">
      <body>
        <Navbar lang={lang} />
        <div className="px-5 pt-16">{children}</div>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
