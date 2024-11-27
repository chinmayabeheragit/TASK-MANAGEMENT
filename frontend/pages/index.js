import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Task Management</h1>
        <p className="text-lg mb-6">Manage your tasks efficiently and effectively!</p>
        <div>
          {/* No need for <a> tag inside <Link> anymore */}
          <Link href="/auth/login">
            <span className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              Go to Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
