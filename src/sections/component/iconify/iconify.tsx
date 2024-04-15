import { CSSProperties, forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
//
import { IconifyProps } from './types';

// ----------------------------------------------------------------------

interface Props {
  icon: IconifyProps;
  width?: string | number;
  style?: CSSProperties;
}

const Iconify = forwardRef<HTMLSpanElement, Props>(({ style, icon, width = 20, ...other }, ref) => (
  <span ref={ref} className="component-iconify" {...other}>
    <Icon icon={icon} width={width} height={width} style={style} />
  </span>
));
Iconify.displayName = 'Iconify';
export default Iconify;
