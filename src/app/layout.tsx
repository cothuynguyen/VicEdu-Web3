import type { Metadata } from 'next';
import Link from 'next/link';
import MobileMenuHandler from '@/components/MobileMenuHandler';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hệ thống Anh ngữ Quốc tế & Kỹ năng sống VicEdu',
  description: 'Trang bị kỹ năng Tiếng Anh chuẩn Quốc tế và Kỹ năng sống thế kỷ 21 cho thế hệ trẻ Việt Nam.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <MobileMenuHandler />
        <header className="header">
          <div className="container header-inner">
            <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/logo.png" alt="VicEdu Logo" style={{ height: '40px', width: 'auto' }} />
              <div>Vic<span>Edu</span></div>
            </Link>
            <input type="checkbox" id="mobile-menu-toggle" className="mobile-menu-toggle" />
            <label htmlFor="mobile-menu-toggle" className="hamburger-icon">
              <span></span><span></span><span></span>
            </label>
            <nav className="nav-container">
              <ul className="nav-menu">
                <li><Link href="/" className="nav-link">Trang chủ</Link></li>
                <li><Link href="/tieng-anh-va-ky-nang-song" className="nav-link">Chương trình học</Link></li>
                <li><Link href="/danh-cho-phu-huynh" className="nav-link">Dành cho Phụ huynh</Link></li>
                <li><Link href="/bai-viet" className="nav-link">Bài viết</Link></li>
                <li>
                  <Link href="https://hoc.viceduvn.com/all-dang-ky-tu-van" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 20px' }}>
                    Tư vấn ngay
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 350px)' }}>
          {children}
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <Link href="/" className="logo" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: 'white' }}>
                  <img src="/logo.png" alt="VicEdu Logo" style={{ height: '45px', width: 'auto' }} />
                  <div>Vic<span>Edu</span></div>
                </Link>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Nơi tốt nhất để trẻ phát triển toàn diện cả Tiếng Anh và Kỹ năng sống. Kiến tạo môi trường giáo dục toàn diện, giúp học sinh phát triển cả tài năng và nhân cách, vươn tầm quốc tế.
                </p>
              </div>
              <div className="hide-on-mobile">
                <h3 className="footer-title">Chương trình</h3>
                <ul className="footer-links">
                  <li><Link href="#">Tiếng Anh Trẻ em</Link></li>
                  <li><Link href="#">Kỹ năng sống</Link></li>
                  <li><Link href="#">Luyện thi Chứng chỉ</Link></li>
                  <li><Link href="#">Trại hè Quốc tế</Link></li>
                </ul>
              </div>
              <div className="hide-on-mobile">
                <h3 className="footer-title">Liên kết</h3>
                <ul className="footer-links">
                  <li><Link href="#">Về chúng tôi</Link></li>
                  <li><Link href="/danh-cho-phu-huynh">Dành cho Phụ huynh</Link></li>
                  <li><Link href="/bai-viet">Tin tức & Sự kiện</Link></li>
                  <li><Link href="#">Tuyển dụng</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="footer-title">Liên hệ</h3>
                <ul className="footer-links">
                  <li><Link href="https://hoc.viceduvn.com/vt-kns-dang-ky-tu-van" target="_blank" rel="noopener noreferrer">📍 Chi nhánh Việt Trì</Link></li>
                  <li><Link href="https://hoc.viceduvn.com/tq-kns-dang-ky-tu-van" target="_blank" rel="noopener noreferrer">📍 Chi nhánh Tuyên Quang</Link></li>
                  <li><Link href="https://hoc.viceduvn.com/lt-kns-dang-ky-tu-van" target="_blank" rel="noopener noreferrer">📍 Chi nhánh Lâm Thao</Link></li>
                  <li><Link href="https://hoc.viceduvn.com/dh-kns-dang-ky-tu-van" target="_blank" rel="noopener noreferrer">📍 Chi nhánh Dân Hòa</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Hệ thống Anh ngữ & Kỹ năng sống VicEdu. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
