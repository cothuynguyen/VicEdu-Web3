import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'crypto';

// Xóa cache trang Bài viết + sitemap khi Web 1 lưu bài.
// Chỉ server Web 1 gọi tới (POST, mã bí mật trong header x-revalidate-secret).
// Bắt buộc có biến REVALIDATE_SECRET; KHÔNG còn mã mặc định ghi cứng (mã cũ đã lộ trong code trình duyệt Web 1).
function isValidSecret(given: string | null) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!isValidSecret(request.headers.get('x-revalidate-secret'))) {
    return NextResponse.json({ message: 'Từ chối truy cập (Sai mã bí mật)' }, { status: 401 });
  }

  try {
    revalidatePath('/bai-viet');
    revalidatePath('/sitemap.xml');
    return NextResponse.json({ revalidated: true, message: 'Xóa Cache thành công!' });
  } catch (err) {
    return NextResponse.json({ message: 'Có lỗi xảy ra khi xóa Cache' }, { status: 500 });
  }
}
