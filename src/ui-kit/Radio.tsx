import { cn } from './utils/cn';
import { InputHTMLAttributes, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  handleClick: () => void;
}

export const Radio = ({ isChecked, handleClick, className, ...nativeProps }: RadioProps) => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run animations in browser environment
    if (typeof window !== 'undefined' && circleRef.current) {
      if (isChecked) {
        gsap.to(circleRef.current, {
          scale: 1,
          ease: 'elastic.out(1.2,1)',
        });
      } else {
        gsap.to(circleRef.current, {
          scale: 0,
          ease: 'power2.inOut',
        });
      }
    }
  }, [isChecked]);

  return (
    <div className={cn('inline-block', className)}>
      <input
        type="radio"
        hidden
        data-testid="radio-input"
        checked={isChecked}
        onClick={handleClick}
        onChange={() => null}
        disabled={nativeProps.disabled}
        {...nativeProps}
      />
      <label
        htmlFor={nativeProps.id}
        className={cn(
          'border-2 bg-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer',
          'transition-colors duration-200',
          isChecked ? 'border-blue-600' : 'border-gray-200',
          nativeProps.disabled && 'border-gray-100 pointer-events-none'
        )}
      >
        <div
          ref={circleRef}
          className={cn('w-3 h-3 rounded-full bg-blue-600')}
          style={{ transform: 'scale(0)' }}
        />
      </label>
    </div>
  );
};

Radio.displayName = 'Radio';
