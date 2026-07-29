'use client';

import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  'Tất cả',
  'Góc Phụ huynh',
  'Phương pháp Giáo dục',
  'Học thuật',
  'Định hướng nghề nghiệp'
];

export default function ArticleListClient({ initialArticles }: { initialArticles: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  // Lọc bài viết hoàn toàn bằng bộ nhớ trong của trình duyệt (cực kỳ nhanh)
  const filteredArticles = initialArticles.filter(article => {
    const term = searchQuery.toLowerCase();
    const matchesSearch = 
      (article.title && article.title.toLowerCase().includes(term)) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(term)) ||
      (article.category && article.category.toLowerCase().includes(term));
      
    const matchesCategory = activeCategory === 'Tất cả' || article.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Thanh Tìm kiếm */}
      <div style={{ maxWidth: '600px', margin: '0 auto 20px auto', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Tìm kiếm bài viết, chủ đề..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '15px 20px',
            fontSize: '1rem',
            borderRadius: '50px',
            border: '1px solid var(--border)',
            outline: 'none',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color 0.3s'
          }}
        />
        <button 
          className="btn btn-primary" 
          style={{ borderRadius: '50px', padding: '0 30px' }}
        >
          Tìm kiếm
        </button>
      </div>

      {/* Bộ lọc Nhóm (Categories) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexWrap: 'wrap', 
        gap: '10px', 
        marginBottom: '50px' 
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: activeCategory === cat ? 'none' : '1px solid var(--border)',
              background: activeCategory === cat ? 'var(--primary)' : 'white',
              color: activeCategory === cat ? 'white' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s',
              boxShadow: activeCategory === cat ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '30px' }}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Link href={`/bai-viet/${article.slug}`} key={article.id} className="glass-panel" style={{ display: 'block', overflow: 'hidden', textDecoration: 'none', transition: 'transform 0.3s, box-shadow 0.3s' }}>
              <div style={{ 
                height: '200px', 
                background: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                overflow: 'hidden'
              }}>
                {article.thumbnail_url ? (
                  <img src={article.thumbnail_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span>[Chưa có ảnh bìa]</span>
                )}
              </div>
              <div style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', gap: '8px' }}>
                  <span style={{ background: 'var(--primary-light)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {article.category}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {new Date(article.created_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '15px', lineHeight: 1.4 }}>
                  {article.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
            Không tìm thấy bài viết nào phù hợp trong nhóm "{activeCategory}".
          </div>
        )}
      </div>
    </>
  );
}
