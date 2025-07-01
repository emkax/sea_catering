import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Subscription from './subscription'; // ✅ No .tsx extension

export default async function SubscriptionPage() {
  const cookieStore = await cookies(); // ✅ Add await for Next.js 15+
  const user = cookieStore.get('user');

  console.log('All cookies:', cookieStore.getAll());
  console.log('User cookie:', user);

  if (!user) {
    console.log('No user cookie found, redirecting to login');
    redirect('/login');
  }

  console.log("User authenticated, showing subscription page");
  
  // Pass the user session info to the client component
  return <Subscription userSession={user.value} />;
}