import './Dropdown.scss';

import clsx from 'clsx';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import ChevronDownIcon from '../icons/ChevronDownIcon';

type DropdownProps<T> = {
  defaultOption: {
    title: string;
    key: T;
  };
  options: { title: string; key: T }[];
  onChange: (selectedOption: { title: string; key: T }) => void;
};

function Dropdown<T>({ defaultOption, options, onChange }: PropsWithChildren<DropdownProps<T>>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<{
    title: string;
    key: T;
  }>(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: { title: string; key: T }) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      onChange(option);
    }
  };

  const handleClickOutside = (event: Event) => {
    const target = event.target as Element;
    if (dropdownRef.current && event.target && !dropdownRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  // Detect clicks outside of dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='dropdown-container' ref={dropdownRef}>
      <div
        className={clsx('btn dropdown-btn', isOpen && 'is-open')}
        onClick={toggleDropdown}
        onKeyDown={() => {}}
        role='button'
        tabIndex={-1}
      >
        <div className='dropdown-btn-label'>{selectedOption.title || 'Select an option'}</div>
        <ChevronDownIcon />
      </div>
      {isOpen && (
        <ul className='dropdown-list'>
          {options.map((option, idx) => (
            <li key={option.title} className='dropdown-list-item'>
              <div
                className='btn'
                onClick={() => handleOptionClick(option)}
                onKeyDown={() => {}}
                tabIndex={idx}
                role='button'
              >
                {option.title}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
