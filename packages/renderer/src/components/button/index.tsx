import React from 'react';
import cs from 'classnames';

export type TButtonProps = {
  /**
   * Button Variant
   */
  variant?: 'default' | 'ghost' | 'link';
  width?: 'default' | 'wide' | 'full';
  disabled?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button Component
 */
export const Button = (props: TButtonProps) => {
  const { children, variant, width, loading = false, disabled = false, className, ...others } = props;

  const cn = cs(
    'btn',
    { loading },
    { 'btn-ghost': variant === 'ghost', 'btn-link': variant === 'link' },
    {
      'btn-wide': width === 'wide',
      'btn-block': width === 'full',
    },
    className,
  );

  return (
    <button className={cn} disabled={disabled || loading} {...others}>
      {children}
    </button>
  );
};
