import {useState, useEffect, useLayoutEffect} from 'react';
const canUseDOM = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

function useDimensions(targetRef) {
  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => {
    setDimensions(getDimensions());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useIsomorphicLayoutEffect(() => {
    handleResize();
  }, []);
  return dimensions;
}

export default useDimensions;