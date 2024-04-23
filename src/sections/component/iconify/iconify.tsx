import { CSSProperties, forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
//
import { IconifyProps } from './types';
import { cn } from 'src/lib/utils';

// ----------------------------------------------------------------------

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconifyProps;
  width?: string | number;
  style?: CSSProperties;
}

const Iconify = forwardRef<HTMLDivElement, Props>(
  ({ style, icon, width = 20, className, ...other }, ref) => (
    <div ref={ref} className={cn('component-iconify', className)} {...other}>
      <Icon icon={icon} width={width} height={width} style={style} />
    </div>
  )
);
Iconify.displayName = 'Iconify';
export default Iconify;
