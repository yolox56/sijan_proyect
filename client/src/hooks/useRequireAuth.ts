'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export function useRequireAuth() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
   
      router.replace('/login');
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  return isAuthorized;
}
