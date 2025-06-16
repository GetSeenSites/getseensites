import { useCallback } from 'react';

declare global {
  interface Window {
    trackGetStarted: (packageType: string) => void;
    trackContactUs: (location: string) => void;
    trackNavigation: (section: string) => void;
    trackPhoneClick: () => void;
    trackEmailClick: () => void;
    trackSocialClick: (platform: string) => void;
    trackFormSubmit: (formType: string) => void;
    trackPortfolioView: (projectName: string) => void;
  }
}

export const useAnalytics = () => {
  const trackGetStarted = useCallback((packageType: string) => {
    if (typeof window !== 'undefined' && window.trackGetStarted) {
      window.trackGetStarted(packageType);
    }
  }, []);

  const trackContactUs = useCallback((location: string) => {
    if (typeof window !== 'undefined' && window.trackContactUs) {
      window.trackContactUs(location);
    }
  }, []);

  const trackNavigation = useCallback((section: string) => {
    if (typeof window !== 'undefined' && window.trackNavigation) {
      window.trackNavigation(section);
    }
  }, []);

  const trackPhoneClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.trackPhoneClick) {
      window.trackPhoneClick();
    }
  }, []);

  const trackEmailClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.trackEmailClick) {
      window.trackEmailClick();
    }
  }, []);

  const trackSocialClick = useCallback((platform: string) => {
    if (typeof window !== 'undefined' && window.trackSocialClick) {
      window.trackSocialClick(platform);
    }
  }, []);

  const trackFormSubmit = useCallback((formType: string) => {
    if (typeof window !== 'undefined' && window.trackFormSubmit) {
      window.trackFormSubmit(formType);
    }
  }, []);

  const trackPortfolioView = useCallback((projectName: string) => {
    if (typeof window !== 'undefined' && window.trackPortfolioView) {
      window.trackPortfolioView(projectName);
    }
  }, []);

  return {
    trackGetStarted,
    trackContactUs,
    trackNavigation,
    trackPhoneClick,
    trackEmailClick,
    trackSocialClick,
    trackFormSubmit,
    trackPortfolioView,
  };
};
