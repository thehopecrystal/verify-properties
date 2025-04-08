
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t mt-auto py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-500">
          © {currentYear} Verify Owners. All rights reserved.
        </div>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          Securely verifying property ownership since 2023
        </div>
      </div>
    </footer>
  );
};

export default Footer;
