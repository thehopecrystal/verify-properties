
import React from 'react';
import Navigation from '@/components/Navigation';
import DashboardHeader from '@/components/DashboardHeader';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <DashboardHeader title={title} description={description} />
        {children}
      </div>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
