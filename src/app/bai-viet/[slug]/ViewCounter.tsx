'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client-side (với anon key, an toàn cho trình duyệt)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ViewCounter({ slug }: { slug: string }) {
  useEffect(() => {
    // Gọi hàm RPC trực tiếp từ trình duyệt đến Supabase
    // Bỏ qua Server Vercel hoàn toàn -> Tiết kiệm 100% tài nguyên Server
    const incrementView = async () => {
      try {
        await supabase.rpc('increment_article_views', { article_slug: slug });
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };

    // Delay 3 giây để lọc bớt các click nhầm (chỉ tính view khi đọc đủ 3s)
    const timer = setTimeout(() => {
      incrementView();
    }, 3000);

    return () => clearTimeout(timer);
  }, [slug]);

  return null; // Component này chạy ngầm, không hiển thị gì cả
}
