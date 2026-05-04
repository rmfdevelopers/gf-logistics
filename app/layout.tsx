import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700']
});

const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata = {
  title: 'G&F Logistics | Luxury Velocity',
  description: 'Premium logistics and transportation services in Nigeria and beyond.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}