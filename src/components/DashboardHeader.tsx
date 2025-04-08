
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  return (
    <div className="mb-8">
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <span>Verify Owners</span>
        {pathSegments.length > 0 && (
          <>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="capitalize">
              {pathSegments[pathSegments.length - 1]}
            </span>
          </>
        )}
      </div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default DashboardHeader;
