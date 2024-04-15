'use client';

import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0">
      <div className="bg-[var(--bg-body)] h-screen w-screen"></div>
    </div>
  );
}
