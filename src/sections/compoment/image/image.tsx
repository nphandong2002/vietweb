import { forwardRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ImageProps } from './type';



const Image = forwardRef<HTMLSpanElement, ImageProps>(({ src,className ,customFallback = '/no-image.png', ...props }, ref) => {
  const [fallback, setFallback] = useState<string>('');

  const handleError = () => {
    setFallback(customFallback);
  };
  return (
   <span ref={ref} className={className}>
     <LazyLoadImage src={fallback || src} placeholderSrc='/cool-loading-animated-gif-1.gif' {...props} onError={handleError} />
   </span>
  );
});

export default Image;
