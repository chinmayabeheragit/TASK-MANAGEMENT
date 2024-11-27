import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">User Dashboard</h1>
        {/* Dashboard content */}
        <p>Welcome to your user dashboard.</p>
      </div>
    </div>
  );
}