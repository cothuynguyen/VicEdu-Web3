import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import ViewCounter from './ViewCounter';
import { isValidPreview, createPreviewClient } from '@/lib/preview';

// Kết nối Supabase Server-side (không dùng 'use client' để tối ưu SEO)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type PageProps = {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ preview?: string; exp?: string; sig?: string }>
};

// Chế độ Xem trước chỉ bật khi link có chữ ký hợp lệ từ Web 1 (xem src/lib/preview.ts).
// Link cũ dạng ?preview=true không còn mở được bài nháp.
async function resolvePreview(props: PageProps) {
  const { slug } = await props.params;
  const sp = await props.searchParams;
  return { slug, isPreview: isValidPreview(slug, sp) };
}

// cache(): generateMetadata và trang dùng chung 1 lần gọi DB cho mỗi request.
const getArticle = cache(async (slug: string, isPreview: boolean) => {
  const client = isPreview ? createPreviewClient() : supabase;
  if (!client) return null;
  let query = client.from('marketing_articles').select('*').eq('slug', slug);
  if (!isPreview) {
    query = query.eq('status', 'published'); // Chỉ lấy bài đã xuất bản nếu không phải xem trước
  }
  const { data } = await query.single();
  return data;
});

export async function generateMetadata(props: PageProps) {
  const { slug, isPreview } = await resolvePreview(props);
  const article = await getArticle(slug, isPreview);

  if (!article) {
    return {
      title: 'Bài viết không tồn tại - VicEdu',
      description: 'Không tìm thấy bài viết yêu cầu.',
      robots: { index: false, follow: false },
    };
  }

  const title = `${article.title} - Hệ thống Giáo dục VicEdu`;
  const description = article.excerpt || 'Đọc bài viết mới nhất từ Hệ thống giáo dục Anh ngữ và Kỹ năng sống VicEdu';
  return {
    title: isPreview ? `[XEM TRƯỚC] ${title}` : title,
    description,
    alternates: { canonical: `/bai-viet/${article.slug}` },
    // Bản xem trước (có thể là bài nháp) tuyệt đối không cho Google lập chỉ mục
    robots: isPreview ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/bai-viet/${article.slug}`,
      images: article.thumbnail_url ? [{ url: article.thumbnail_url }] : [],
    }
  };
}


export default async function ArticleDetailPage(props: PageProps) {
  const { slug, isPreview } = await resolvePreview(props);
  const article = await getArticle(slug, isPreview);

  if (!article) {
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
      {!isPreview && article.facebook_pixel_id && (
        <script dangerouslySetInnerHTML={{ __html: fbPixelCode }} />
      )}
      {isPreview && (
        <div style={{ background: '#fef3c7', color: '#92400e', borderBottom: '1px solid #fcd34d', padding: '10px 20px', textAlign: 'center', fontWeight: 600 }}>
          👁️ Chế độ XEM TRƯỚC: {article.status === 'published' ? 'bài đã xuất bản' : 'bài NHÁP, khách chưa xem được'} · Link hết hạn sau 1 giờ
        </div>
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

        <article 
          className="article-content"
          dangerouslySetInnerHTML={{ 
            __html: (() => {
              if (!article.content) return '<p>Nội dung đang được cập nhật...</p>';
              let html = article.content.replace(/&nbsp;/g, ' ');
              // Tự động quét và biến các link YouTube bị lỗi (lưu thành thẻ <a>) trở lại thành khung Video (iframe)
              html = html.replace(
                /<a[^>]*href="([^"]*(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)[^"]+)"[^>]*>.*?<\/a>/gi,
                (match: string, url: string) => {
                  // Đảm bảo url là dạng embed để hiển thị được trong iframe
                  let embedUrl = url;
                  if (url.includes('watch?v=')) {
                    embedUrl = url.replace('watch?v=', 'embed/');
                  } else if (url.includes('youtu.be/')) {
                    embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
                  }
                  return `<iframe style="width: 100%; aspect-ratio: 16/9; border-radius: 12px; margin: 30px 0; display: block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                }
              );
              
              // Tự động quét và biến các link Cloudflare Stream (thẻ <a> hoặc <iframe> bị sai) thành khung Video
              html = html.replace(
                /<a[^>]*href="([^"]*cloudflarestream\.com\/[a-zA-Z0-9]+)[^"]*"[^>]*>.*?<\/a>|<iframe[^>]*src="([^"]*cloudflarestream\.com\/[a-zA-Z0-9]+)[^"]*"[^>]*>.*?<\/iframe>/gi,
                (match: string, aUrl: string, iframeUrl: string) => {
                  const baseUrl = aUrl || iframeUrl;
                  return `<iframe style="width: 100%; aspect-ratio: 16/9; border-radius: 12px; margin: 30px 0; display: block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" src="${baseUrl}/iframe" frameborder="0" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>`;
                }
              );
              
              // Tự động quét và biến các link MP3 (lưu thành thẻ <a>) thành Trình phát nhạc (Audio Player)
              html = html.replace(
                /<a[^>]*href="([^"]*\.mp3(?:[?#][^"]*)?)"[^>]*>.*?<\/a>/gi,
                (match: string, mp3Url: string) => {
                  return `<div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;"><audio controls style="width: 100%; max-width: 500px; outline: none;"><source src="${mp3Url}" type="audio/mpeg">Trình duyệt của bạn không hỗ trợ phát âm thanh.</audio></div>`;
                }
              );
              
              return html;
            })()
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
