'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileMenuHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Automatically close the mobile menu when the route changes
    const checkbox = document.getElementById('mobile-menu-toggle') as HTMLInputElement;
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
    }
  }, [pathname]);

  return null;
}
