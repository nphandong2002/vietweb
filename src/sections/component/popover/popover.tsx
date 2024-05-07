import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface PropoverType {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

function PopoverCustom({ trigger, content, className }: PropoverType) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={className}>{content}</PopoverContent>
    </Popover>
  );
}

export default PopoverCustom;
