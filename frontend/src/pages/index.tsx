import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
 // goes directly to /login
  useEffect(() => {
    router.push('/login');
  }, [router]);

  return null;
}