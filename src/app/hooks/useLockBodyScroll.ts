import { useEffect } from 'react';

const useLockBodyScroll = (enabled: boolean): void => {
  useEffect(() => {
    if (!document || !enabled) return undefined;

    const { style } = document.body;

    style.setProperty('overflow', 'hidden');

    return () => {
      style.removeProperty('overflow');
    };
  }, [enabled]);
};

export default useLockBodyScroll;
