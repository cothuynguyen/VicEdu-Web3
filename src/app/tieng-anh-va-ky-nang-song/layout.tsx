import type { Metadata } from 'next';

// page.tsx là Client Component nên metadata (canonical) đặt ở layout này.
export const metadata: Metadata = {
  title: 'Chương trình Tiếng Anh & Kỹ năng sống - VicEdu',
  alternates: { canonical: '/tieng-anh-va-ky-nang-song' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
