'use client';

import { useRouter } from 'next/navigation';
import Dialog from '@mui/material/Dialog';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => router.back()}>
      {children}
    </Dialog>
  );
}
