
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useInternalNavigation = () => {
  const navigate = useNavigate();

  const navigateWithScrollToTop = useCallback((path: string) => {
    navigate(path);
    // Small delay to ensure navigation is complete before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, [navigate]);

  return { navigateWithScrollToTop };
};
