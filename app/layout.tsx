import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'G&F Logistics | Time is money, we save you both',
  description: 'Premium logistics and transportation specialists based in Ibadan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans selection:bg-primary selection:text-secondary`}>
        {children}
      </body>
    </html>
  );
}