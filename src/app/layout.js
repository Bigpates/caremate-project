import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Care Mate',
  description: 'Your Intelligent NDIS Companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}