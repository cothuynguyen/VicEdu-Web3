import { createClient } from '@supabase/supabase-js';
import ArticleListClient from './ArticleListClient';

// Kích hoạt tính năng ISR (Tạo trang tĩnh và Cache). 
// 3600 = Máy chủ Vercel sẽ lấy dữ liệu mới từ Supabase đúng 1 tiếng 1 lần.
export const revalidate = 3600;

// Kết nối Supabase Server-side (Tốc độ bàn thờ, SEO điểm tuyệt đối)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function ArticlesPage() {
  // Máy chủ chỉ lấy đúng 7 cột dữ liệu siêu nhẹ cần thiết, BỎ QUA cột content khổng lồ
  const { data: articles, error } = await supabase
    .from('marketing_articles')
    .select('id, slug, title, excerpt, thumbnail_url, category, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Lỗi khi lấy dữ liệu bài viết:', error);
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Tin tức & Sự kiện</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Cập nhật những kiến thức giáo dục, phương pháp nuôi dạy con và các hoạt động nổi bật tại VicEdu.
        </p>
      </div>

      {/* Đẩy dữ liệu siêu nhẹ xuống cho Client Component xử lý Bộ lọc tức thời */}
      <ArticleListClient initialArticles={articles || []} />
    </div>
  );
}
