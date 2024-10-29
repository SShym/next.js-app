import React from 'react';
import { cn } from '@/shared/lib/utils';
import { CountIconButton } from './count-icon-button';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: (type: 'plus' | 'minus') => void;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
  disabled
}) => {
  return (    
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClick?.('minus')}
        disabled={value === 1 || disabled}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton 
        onClick={() => onClick?.('plus')} 
        disabled={disabled}
        size={size} 
        type="plus" 
      />
    </div>
  );
};
