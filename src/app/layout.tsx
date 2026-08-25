import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KLV // Lohith Robotics & AI Portfolio',
  description: 'Cinematic Command Console portfolio for Lohith — Robotics, AI, Drones, and Hardware Engineering Index.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-space-bg text-gray-100 min-h-screen overflow-x-hidden selection:bg-cyan selection:text-black">
        {children}
      </body>
    </html>
  );
}
