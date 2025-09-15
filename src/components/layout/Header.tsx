import React from 'react';
import Link from 'next/link';
import { MenuDropdown } from './MenuDropdown';

const menuItems = [
  { label: 'Train', href: '/french-idol' },
  { label: 'Results', href: '/results' },
  { label: 'Profile', href: '/profile' },
  { label: 'Create Stories', href: '/french-idol/create' },
  { label: 'Grade Levels', href: '/grade-levels' },
];

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Secure ChatGPT
        </Link>
        <MenuDropdown items={menuItems} />
      </div>
    </header>
  );
};
