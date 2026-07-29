import Link from 'next/link';
import { Globe, Target, Heart } from '@/components/LucideIcons';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40%', height: '60%', background: 'var(--primary-light)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '30%', height: '50%', background: 'var(--secondary-light)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%', zIndex: 0 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div className="animate-fade-in">
            <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(21, 94, 239, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '20px' }}>
              Nơi tốt nhất giúp trẻ phát triển toàn diện cả tiếng Anh và Kỹ năng sống 🌟
            </div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
              Hệ thống Anh ngữ & <br />
              <span style={{ color: 'transparent', background: 'var(--gradient-secondary)', WebkitBackgroundClip: 'text' }}>Kỹ năng sống</span> VicEdu
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '90%' }}>
              Giúp trẻ làm chủ Tiếng Anh, rèn luyện Kỷ luật thép và Kỹ năng sống thế kỷ 21, tự tin bước ra thế giới.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/tieng-anh-va-ky-nang-song" className="btn btn-primary">
                Tìm hiểu Chương trình
              </Link>
              <Link href="https://hoc.viceduvn.com/all-dang-ky-tu-van" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Đăng ký Tư vấn
              </Link>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-panel" style={{ padding: '20px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <img 
                src="https://imagedelivery.net/zy23MrAbBJtVssV7IZf3Cg/e4dfec95-b749-40cd-9b0a-4b9121db9600/public" 
                alt="Học sinh VicEdu ném cờ màu" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Vì sao chọn VicEdu?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>
            Sự kết hợp hoàn hảo giữa đào tạo Học thuật và rèn luyện Nhân cách.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {[
              { title: 'Tiếng Anh chuẩn Quốc tế', desc: 'Lộ trình Cambridge bài bản, giúp trẻ tự tin giao tiếp và đạt điểm cao.', icon: Globe },
              { title: 'Rèn luyện Kỷ luật', desc: 'Môi trường huấn luyện kỹ năng sống, giúp trẻ tự lập và bản lĩnh.', icon: Target },
              { title: 'Phát triển Nhân cách', desc: 'Ứng dụng "7 THÓI QUEN HIỆU QUẢ" và tư duy hệ thống trong giáo dục.', icon: Heart }
            ].map((f, i) => (
              <div key={i} className="glass-panel feature-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--primary-light)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <f.icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
