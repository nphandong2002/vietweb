import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';

//
import { IconifyProps } from './types';

// ----------------------------------------------------------------------

interface Props  {
  icon: IconifyProps;
  width?: string | number;
}

const Iconify = forwardRef<HTMLSpanElement, Props>(({ icon, width = 20, ...other }, ref) => (
  <span
    ref={ref}
    className="component-iconify"
    {...other}
  ><Icon icon={icon} width={width} height={width} /> </span>
));

export default Iconify;
