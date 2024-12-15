'use client';

import { useState, useEffect } from 'react';


export default function useMobile () {
  const [ isMobile, setIsMobile ] = useState(false);

  const checkMobile = () => {
    const mobileBreakpoint = 768;
    setIsMobile(window.innerWidth <= mobileBreakpoint);
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
};
