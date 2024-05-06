import { useRef, useEffect, useCallback } from 'react';

const useAnimationFrame = (callback: (deltaTime: number) => void): void => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]); // Make sure the effect runs only once
};

export default useAnimationFrame;
