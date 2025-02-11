import { Analytics } from '@vercel/analytics/react';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Drawing App | @junsobi',
  description: 'A simple drawing app | Next.js + Zustand + Konva',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Analytics />
      <body>{children}</body>
    </html>
  );
}
