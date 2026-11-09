import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SITE_URL } from '@/lib/site';

// Sitemap cho Google Search Console: trang tĩnh + toàn bộ bài viết đã xuất bản.
// Làm mới tối đa 1 lần/giờ để tiết kiệm lượt gọi Supabase / Vercel.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/tieng-anh-va-ky-nang-song`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/danh-cho-phu-huynh`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/bai-viet`, changeFrequency: 'daily', priority: 0.8 },
  ];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  const { data: articles, error } = await supabase
    .from('marketing_articles')
    .select('slug, updated_at, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Sitemap: lỗi lấy bài viết', error);
    return staticPages;
  }

  return [
    ...staticPages,
    ...(articles || []).map((a) => ({
      url: `${SITE_URL}/bai-viet/${a.slug}`,
      lastModified: a.updated_at || a.created_at,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
