import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Blackwell & Associates | Elite Prestige Law Firm',
  description: 'Distinguished, serious, and results-driven legal representation specializing in corporate governance, criminal defense, real estate trust, family law, immigration, and intellectual property.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-[#1A1A1A] text-gray-200 antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
