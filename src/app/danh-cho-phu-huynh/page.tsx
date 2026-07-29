export default function ParentsPage() {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Góc Phụ huynh</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 40px' }}>
        Đồng hành cùng cha mẹ trong hành trình thấu hiểu và phát triển tiềm năng vô hạn của con cái.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
        {[
          {
            title: 'Khám phá 5 ngôn ngữ yêu thương của con',
            img: 'https://imagedelivery.net/zy23MrAbBJtVssV7IZf3Cg/960d2d32-526c-4827-4fc9-4e584de7b200/public',
            href: 'https://hoc.viceduvn.com/quatang-5-ngon-ngu-yeu-thuong',
            features: [
              'Hiểu đúng ngôn ngữ tình yêu bé muốn nhận',
              'Giải mã lý do con đôi khi bướng bỉnh',
              'Biết cách khen ngợi, động viên con đúng lúc',
              'Gắn kết tình cảm gia đình thêm khăng khít',
              'Xây dựng nền tảng tuổi thơ tự tin, hạnh phúc'
            ]
          },
          {
            title: 'Khám phá tính cách và định hướng nghề cho con',
            img: 'https://imagedelivery.net/zy23MrAbBJtVssV7IZf3Cg/10c339f1-375e-467f-14cf-d5c56ed9a700/public',
            href: 'https://hoc.viceduvn.com/quatang-mbti',
            features: [
              'Đánh giá chính xác nhóm tính cách của con',
              'Giúp con tự nhận thức thế mạnh bẩm sinh',
              'Thấu hiểu phong cách học tập của trẻ',
              'Định hướng nghề nghiệp tương lai phù hợp',
              'Giảm mâu thuẫn thế hệ do khác biệt tính cách'
            ]
          },
          {
            title: 'Cẩm nang Lời vàng cho con',
            img: 'https://imagedelivery.net/zy23MrAbBJtVssV7IZf3Cg/cc66ea89-5035-4082-50bd-adedf208e300/public',
            href: 'https://hoc.viceduvn.com/all-nhan-ebook-qua-tang',
            features: [
              'Bí quyết giao tiếp tích cực với trẻ mỗi ngày',
              'Thay đổi thói quen dùng từ ngữ tổn thương',
              'Giúp con nuôi dưỡng trí tuệ cảm xúc (EQ)',
              'Kỹ năng khích lệ khi con gặp thất bại',
              'Ebook thiết kế đẹp, dễ dàng lưu lại áp dụng'
            ]
          }
        ].map((item, idx) => (
          <a 
            key={idx} 
            href={item.href}
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-panel feature-card" 
            style={{ 
              display: 'flex', flexDirection: 'column', overflow: 'hidden', 
              textDecoration: 'none', transition: 'transform 0.3s ease, box-shadow 0.3s ease' 
            }}
          >
            <div style={{ padding: '16px 16px 0 16px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={item.img} 
                alt={item.title} 
                style={{ width: '100%', height: '220px', objectFit: 'contain', display: 'block', borderRadius: '8px' }} 
              />
            </div>
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#111827', margin: '0 0 16px 0', fontWeight: 700, lineHeight: 1.4, textAlign: 'center' }}>
                {item.title}
              </h3>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, flex: 1 }}>
                {item.features.map((feat, fidx) => (
                  <li key={fidx} style={{ position: 'relative', paddingLeft: '20px', marginBottom: '10px', fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, top: '2px', color: '#10b981' }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
