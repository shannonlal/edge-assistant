import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { IconMenu } from '../../ui-kit/icons/IconMenu';

interface MenuItem {
  label: string;
  href: string;
}

interface MenuDropdownProps {
  items: MenuItem[];
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (href: string) => {
    if (href === '#') {
      alert('Coming Soon!');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Menu"
      >
        <IconMenu size={24} />
      </button>

      {/* Dropdown Panel */}
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown Panel */}
      <div
        className={`
          fixed inset-y-0 right-0 w-64 bg-white z-50 transform transition-all duration-200 ease-in-out
          md:absolute md:inset-auto md:right-0 md:top-full md:mt-1 md:w-48 md:rounded-lg md:shadow-lg
          ${
            isOpen
              ? 'translate-x-0'
              : 'translate-x-full md:translate-y-2 md:opacity-0 md:pointer-events-none'
          }
        `}
      >
        {/* Mobile Close Button */}
        <div className="sticky top-0 p-4 border-b border-gray-200 bg-white md:hidden flex items-center justify-between">
          <span className="font-medium">Menu</span>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-2 bg-white">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => handleItemClick(item.href)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
