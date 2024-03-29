import { MouseEventHandler } from 'react';
import { cn } from 'src/lib/utils';
import { defaultCompomentType } from 'src/shared/types/compoment';

type IconButtonType = defaultCompomentType & {
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

function IconButton({ children, className = '', active, onClick }: IconButtonType) {
  const ClassName = 'rounded-full m-2 ' + className;
  return (
    <button className={ClassName + cn(active && 'bg-[var(--bg-primary)]')} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
