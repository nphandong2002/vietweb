"use client";

import { forwardRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { ImageProps } from "./type";

const Image = forwardRef<HTMLDivElement, ImageProps>(({ src, className, customFallback = "/no-image.png", ...props }, ref) => {
  const [fallback, setFallback] = useState<string>("");

  const handleError = () => {
    setFallback(customFallback);
  };
  return (
    <div ref={ref} className={"overflow-hidden relative" + className}>
      <LazyLoadImage src={fallback || src} placeholderSrc="/cool-loading-animated-gif-1.gif" {...props} onError={handleError} />
    </div>
  );
});

export default Image;
