
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import { 
  Home, 
  ClipboardCheck, 
  FileText, 
  LogOut,
  UserCog
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = user?.role === 'admin' 
    ? [
        { path: '/admin', label: 'Dashboard', icon: <Home size={18} /> },
        { path: '/admin/properties', label: 'Properties', icon: <ClipboardCheck size={18} /> },
        { path: '/admin/requests', label: 'Requests', icon: <FileText size={18} /> }
      ]
    : [
        { path: '/', label: 'Dashboard', icon: <Home size={18} /> },
        { path: '/submit', label: 'Submit Property', icon: <ClipboardCheck size={18} /> },
        { path: '/request', label: 'Request Info', icon: <FileText size={18} /> }
      ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-primary text-white w-full py-2">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link to={user?.role === 'admin' ? '/admin' : '/'} className="mr-8">
            <Logo />
          </Link>
          
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "secondary" : "link"}
                className={location.pathname === item.path ? "bg-white/10 text-white" : "text-white"}
                asChild
              >
                <Link to={item.path} className="flex items-center gap-1">
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm">
              What's New?
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8"><AvatarFallback className="bg-white/20">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
