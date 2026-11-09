import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Kiểm tra link Xem trước do Web 1 (CRM) ký bằng ARTICLE_PREVIEW_SECRET.
// Link hợp lệ dạng: /bai-viet/[slug]?preview=1&exp=<unix giây>&sig=<hmac hex>
export function isValidPreview(slug: string, params: { preview?: string; exp?: string; sig?: string }): boolean {
  const secret = process.env.ARTICLE_PREVIEW_SECRET;
  if (!secret || params.preview !== '1' || !params.exp || !params.sig) return false;

  const exp = Number(params.exp);
  if (!Number.isInteger(exp) || exp < Math.floor(Date.now() / 1000)) return false;

  const expected = createHmac('sha256', secret).update(`${slug}.${exp}`).digest();
  const given = Buffer.from(params.sig, 'hex');
  return given.length === expected.length && timingSafeEqual(given, expected);
}

// Client quyền cao, CHỈ dùng phía server sau khi isValidPreview() = true (để đọc được bài nháp bị RLS chặn).
export function createPreviewClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
