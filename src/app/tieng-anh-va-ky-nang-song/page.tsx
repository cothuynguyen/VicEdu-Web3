'use client';

import { useState } from 'react';
import Link from 'next/link';

const programs = [
  {
    id: 'kindy',
    name: 'Kindy Level',
    age: '4 - 6 tuổi',
    duration: '30 tháng (10 Level)',
    curriculum: 'Oxford Phonics World',
    schedule: '8 buổi/tháng (2 buổi/tuần)',
    outcome: 'Trẻ tập phát âm cơ bản',
    color: 'var(--primary)',
    englishLevels: [
      'Kindy 1 - 10: 24 buổi/3 tháng (20 buổi Tiếng Anh + 03 buổi KNS + 01 buổi Kết khóa)'
    ],
    lifeSkills: [
      'Kỹ năng Tự chăm sóc & Bảo vệ bản thân',
      'Ứng xử văn minh, lịch sự',
      'Giải quyết xung đột',
      'Nhận diện & Làm chủ cảm xúc',
      'Yêu thương & Giúp đỡ',
      'Làm việc nhóm',
      'Nhận biết & phòng tránh nguy hiểm',
      'Nhận lỗi & Sống chân thành',
      'Tự tin trước đám đông',
      'Học tập chủ động & Tự học'
    ],
    target: 'Kindy 1 - 9: Beginner | Kindy 10: Pre-A1 Starters (Cambridge)'
  },
  {
    id: 'kids',
    name: 'Kids Level',
    age: '6 - 10 tuổi',
    duration: '36 tháng (12 Level)',
    curriculum: 'Power Up',
    schedule: '8 buổi/tháng (2 buổi/tuần)',
    outcome: 'Giao tiếp Tự tin - Nắm chắc cấu trúc',
    color: 'var(--secondary)',
    englishLevels: [
      'Kids 1A - 6B: 24 buổi/3 tháng (20 buổi Tiếng Anh + 03 buổi KNS + 01 buổi Kết khóa)'
    ],
    lifeSkills: [
      'Nhận thức bản thân, quản lý thời gian',
      'Lắng nghe - chia sẻ, tư duy phản biện',
      'Tư duy sáng tạo & kỹ năng đặt mục tiêu',
      'Tự tin trước đám đông, ứng phó áp lực',
      'Làm việc nhóm, tư duy thành công',
      'Tìm kiếm nguồn lực, thiết lập sứ mệnh'
    ],
    target: 'Kids 1A-2B: Starters | Kids 3A-4B: Movers | Kids 5A-6B: Flyers (Cambridge)'
  },
  {
    id: 'teens',
    name: 'Teens Level',
    age: '11 - 16 tuổi',
    duration: '16 tháng (4 Level)',
    curriculum: 'Cambridge English Prepare! (2nd Ed)',
    schedule: '8 buổi/tháng (2 buổi/tuần)',
    outcome: 'Nắm chắc Cấu trúc - Phát âm Chuẩn - Tiền đề IELTS',
    color: '#8b5cf6', // Purple
    englishLevels: [
      'Teens 1A - 2B: 32 buổi/4 tháng (27 buổi Tiếng Anh + 04 buổi KNS + 01 buổi Kết khóa)'
    ],
    lifeSkills: [
      'Quản lý Tài chính cá nhân - Quản trị Cảm xúc',
      'Sử dụng công nghệ - Nghệ thuật Giao tiếp',
      'Giải quyết vấn đề - Tư duy sáng tạo - Đưa ra quyết định',
      'Đàm phán - Tư duy chiến lược - Lập kế hoạch'
    ],
    target: 'Đầu B1 (CEFR) - Key (KET) for Schools - IELTS 3.5'
  },
  {
    id: 'ielts',
    name: 'IELTS Level',
    age: '11 - 18 tuổi',
    duration: '24 giờ / cam kết lên 01 band',
    curriculum: 'Mindset For IELTS',
    schedule: '8 buổi/tháng (2 buổi/tuần)',
    outcome: 'Đạt Band điểm như mong muốn',
    color: '#10b981', // Emerald
    englishLevels: [
      'Pre IELTS đến IELTS 6.0: Cam kết sau 24h đào tạo',
      'IELTS 6.0 đến IELTS 7.5: Cam kết sau 30h đào tạo',
      'Over 7.5: Cam kết sau 24h đào tạo'
    ],
    lifeSkills: [
      'Các Kỹ năng sống của cấp độ Teens',
      'Tư vấn và Định hướng Nghề nghiệp chuyên sâu'
    ],
    target: 'Chứng chỉ IELTS (Miễn thi THPT, Xét tuyển Đại học/Du học)'
  }
];

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState('kindy');
  const activeProgram = programs.find(p => p.id === activeTab) || programs[0];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', 
        padding: '100px 20px 60px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container animate-fade-in">
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '20px' }}>Lộ trình Học tập Toàn diện</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Bắt đầu bằng đích đến. Cùng một thời gian, chi phí và công đưa đón, con trẻ nhận được chương trình "2 trong 1" Tiếng Anh kết hợp Kỹ năng sống trọn đời.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          
          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            gap: '10px', 
            marginBottom: '50px' 
          }}>
            {programs.map(prog => (
              <button 
                key={prog.id}
                onClick={() => setActiveTab(prog.id)}
                style={{
                  padding: '15px 30px',
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeTab === prog.id ? prog.color : 'white',
                  color: activeTab === prog.id ? 'white' : 'var(--text-muted)',
                  boxShadow: activeTab === prog.id ? `0 10px 20px -10px ${prog.color}` : 'var(--shadow-sm)',
                  transition: 'all 0.3s'
                }}
              >
                {prog.name}
              </button>
            ))}
          </div>

          {/* Program Details */}
          <div className="glass-panel animate-fade-in program-card-panel">
            
            <div className="program-details-grid">
              {/* Left Col - Overview */}
              <div>
                <h2 style={{ fontSize: '2.5rem', color: activeProgram.color, marginBottom: '20px' }}>
                  {activeProgram.name}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ fontWeight: 600, minWidth: '130px' }}>Độ tuổi:</span>
                    <span style={{ color: 'var(--text-muted)' }}>{activeProgram.age}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ fontWeight: 600, minWidth: '130px' }}>Giáo trình:</span>
                    <span style={{ color: 'var(--text-muted)' }}>{activeProgram.curriculum}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ fontWeight: 600, minWidth: '130px' }}>Thời gian học:</span>
                    <span style={{ color: 'var(--text-muted)' }}>{activeProgram.duration}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ fontWeight: 600, minWidth: '130px' }}>Lịch học:</span>
                    <span style={{ color: 'var(--text-muted)' }}>{activeProgram.schedule}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ fontWeight: 600, minWidth: '130px' }}>Mục tiêu đầu ra:</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{activeProgram.target}</span>
                  </div>
                </div>

                <div style={{ marginTop: '30px', padding: '20px', background: 'var(--bg-color)', borderRadius: '12px', borderLeft: `4px solid ${activeProgram.color}` }}>
                  <h4 style={{ marginBottom: '10px' }}>Kết quả đạt được:</h4>
                  <p style={{ color: 'var(--text-muted)' }}>{activeProgram.outcome}</p>
                </div>
              </div>

              {/* Right Col - Details */}
              <div>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--text-main)' }}>Chương trình Tiếng Anh</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeProgram.englishLevels.map((lvl, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '10px', color: 'var(--text-muted)' }}>
                        <span style={{ color: activeProgram.color }}>✓</span> {lvl}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--text-main)' }}>Kỹ năng sống tích hợp</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                    {activeProgram.lifeSkills.map((skill, idx) => (
                      <div key={idx} style={{ 
                        padding: '12px 16px', 
                        background: 'rgba(0,0,0,0.02)', 
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem'
                      }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Link href="https://hoc.viceduvn.com/all-dang-ky-tu-van" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                Đăng ký Tư vấn Lộ trình {activeProgram.name}
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
