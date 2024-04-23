import * as React from 'react';

import { cn } from 'src/lib/utils';
import Iconify from '../iconify';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const isPassword = type == 'password';
    const [showPassword, setshowPassword] = React.useState(false);
    return (
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={cn(
            'flex h-[56px] w-full rounded-md border border-input bg-[var(--bg-body)] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <Iconify
            onClick={() => setshowPassword((a) => !a)}
            className="absolute right-2 top-[50%] -translate-y-1/2 cursor-pointer"
            icon={showPassword ? 'fluent:eye-12-filled' : 'fluent:eye-off-20-filled'}
          />
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
