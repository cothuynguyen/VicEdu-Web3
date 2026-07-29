import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ViewCounter from './ViewCounter';

// Kết nối Supabase Server-side (không dùng 'use client' để tối ưu SEO)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function ArticleDetailPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ preview?: string }>
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreview = resolvedSearchParams.preview === 'true';
  
  // Gọi DB lấy bài viết dựa theo đường dẫn (slug)
  let query = supabase
    .from('marketing_articles')
    .select('*')
    .eq('slug', resolvedParams.slug);
    
  if (!isPreview) {
    query = query.eq('status', 'published'); // Đảm bảo chỉ lấy bài đã xuất bản nếu không phải xem trước
  }
  
  const { data: article, error } = await query.single();

  if (error || !article) {
    notFound(); // Trả về trang 404 nếu không tìm thấy
  }

  // Cấu hình mã Facebook Pixel (nếu có)
  const fbPixelCode = article.facebook_pixel_id ? `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${article.facebook_pixel_id}');
    fbq('track', 'PageView');
  ` : '';

  return (
    <>
      {!isPreview && <ViewCounter slug={article.slug} />}
      {article.facebook_pixel_id && (
        <script dangerouslySetInnerHTML={{ __html: fbPixelCode }} />
      )}
      <div className="container" style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Breadcrumb / Nút quay lại */}
        <div style={{ marginBottom: '30px' }}>
          <Link href="/bai-viet" style={{ color: 'var(--primary)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            ← Quay lại trang Bài viết
          </Link>
        </div>

        {/* Header Bài viết */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--primary-light)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
              {article.category}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              {new Date(article.created_at).toLocaleDateString('vi-VN')}
            </span>
          </div>
          
          <h1 style={{ fontSize: '2.5rem', lineHeight: 1.3, color: 'var(--text-main)', marginBottom: '20px' }}>
            {article.title}
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '30px', fontStyle: 'italic' }}>
            {article.excerpt}
          </p>
        </div>

        {/* Ảnh bìa (Hero Image) */}
        {article.thumbnail_url && (
          <div style={{ marginBottom: '50px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <img 
              src={article.thumbnail_url} 
              alt={article.title} 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
          </div>
        )}

        {/* Nội dung chính (HTML) */}
        <article 
          className="article-content"
          dangerouslySetInnerHTML={{ 
            __html: article.content ? article.content.replace(/&nbsp;/g, ' ') : '<p>Nội dung đang được cập nhật...</p>' 
          }}
        />
        
        {/* CSS nhúng cục bộ cho bài viết đẹp hơn */}
        <style dangerouslySetInnerHTML={{__html: `
          .article-content {
            width: 100%;
            overflow-x: hidden;
            overflow-wrap: break-word;
          }
          .article-content img { max-width: 100% !important; height: auto !important; object-fit: contain; border-radius: 12px; margin: 30px 0; display: block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .article-content h1, .article-content h2 { margin-top: 40px; margin-bottom: 20px; font-size: 1.8rem; color: var(--primary-dark); font-weight: 700; line-height: 1.3; }
          .article-content h3, .article-content h4 { margin-top: 30px; margin-bottom: 15px; font-size: 1.4rem; color: var(--text-main); font-weight: 600; line-height: 1.4; }
          .article-content p { margin-bottom: 20px; line-height: 1.8; font-size: 1.1rem; }
          .article-content ul, .article-content ol { margin-bottom: 20px; padding-left: 20px; line-height: 1.8; }
          .article-content li { margin-bottom: 10px; }
          .article-content a { color: var(--primary); text-decoration: underline; }
          .article-content blockquote { border-left: 4px solid var(--primary); padding-left: 20px; font-style: italic; color: var(--text-muted); margin: 30px 0; background: #f8fafc; padding: 15px 15px 15px 20px; border-radius: 0 8px 8px 0; }
          .article-content strong, .article-content b { font-weight: 700; color: #111827; }
        `}} />
      </div>
    </>
  );
}
