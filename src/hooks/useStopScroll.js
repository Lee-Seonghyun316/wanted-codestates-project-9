import { useEffect } from 'react';

export const useStopScroll = (shareModal) =>
  useEffect(() => {
    if (shareModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [shareModal]);
