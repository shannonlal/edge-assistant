import React, { useState, useRef, useEffect } from 'react';
import { IconCheck } from './icons/IconCheck';

interface DropdownItem {
  code: string;
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  selectedItem?: DropdownItem;
  items: DropdownItem[];
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ items, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(null);
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

  const renderItem = (item: DropdownItem) => (
    <div className="flex items-center text-base">
      <span className="text-gray-400 font-normal">({item.code})</span>
      <span className="ml-2 font-normal">{item.label}</span>
    </div>
  );

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    item.onClick();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white border border-gray-200 rounded-2xl hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
      >
        {selected ? renderItem(selected) : 'Select an option'}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
              onClick={() => handleSelect(item)}
            >
              {renderItem(item)}
              {selected?.code === item.code && (
                <IconCheck data-testid="check-icon" className="w-5 h-5 text-blue-600 ml-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
