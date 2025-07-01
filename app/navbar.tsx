'use client';

import { useState, useEffect } from 'react';
import Navbar from './navbarElement';

export default function DynamicDiv({ currPage }) {
  const [session, setSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/validate', { method: 'GET' });
        const data = await res.json();
        console.log('Validate response:', data);

        if (data.valid === true) {
          setSession(true);
        } else {
          setSession(false);
        }
      } catch (err) {
        console.error('Error validating session:', err);
        setSession(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession(); // Initial call

    const interval = setInterval(checkSession, 1000); // Optional polling

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <Navbar session={session} currPage={currPage} />;
}
