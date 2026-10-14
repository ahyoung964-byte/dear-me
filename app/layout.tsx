import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dear me',
  description: '나만의 사용설명서, 로딩화면, NPC 카드를 AI로 만들어보세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        {children}
      </body>
    </html>
  );
}
