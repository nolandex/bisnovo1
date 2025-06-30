import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  weight: ['500', '800'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const fontClass = jakarta.className || '';

  return (
    <html lang="en" data-theme="corporate" className={fontClass}>
      <body>
        <div className="w-full min-h-svh text-base-content bg-base-100">
          {children}
        </div>
      </body>
    </html>
  );
}
