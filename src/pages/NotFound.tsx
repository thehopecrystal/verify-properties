
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';

const NotFound = () => {
  const { user } = useAuth();
  const homePath = user?.role === 'admin' ? '/admin' : '/';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-6">
        <Logo />
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Page not found</p>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to={homePath}>Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
