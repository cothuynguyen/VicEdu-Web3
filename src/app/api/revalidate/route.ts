import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  // Kiểm tra mã bí mật để tránh bị người lạ lợi dụng phá bộ nhớ đệm
  if (secret !== (process.env.REVALIDATE_SECRET || 'VICEDU_REVALIDATE_2026')) {
    return NextResponse.json({ message: 'Từ chối truy cập (Sai mã bí mật)' }, { status: 401 });
  }

  try {
    // Chỉ định đường dẫn cần xóa Cache (Đập đi xây lại)
    revalidatePath('/bai-viet');
    
    return NextResponse.json({ revalidated: true, message: 'Xóa Cache thành công!' });
  } catch (err) {
    return NextResponse.json({ message: 'Có lỗi xảy ra khi xóa Cache' }, { status: 500 });
  }
}
