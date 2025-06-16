import { useCallback } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    trackGetStarted?: (packageType: string) => void;
    trackContactUs?: (location: string) => void;
    trackNavigation?: (section: string) => void;
    trackPhoneClick?: () => void;
    trackEmailClick?: () => void;
    trackSocialClick?: (platform: string) => void;
    trackFormSubmit?: (formType: string) => void;
    trackPortfolioView?: (projectName: string) => void;
  }
}

export const useAnalytics = () => {
  const trackGetStarted = useCallback((packageType: string) => {
    if (typeof window !== 'undefined') {
      // Direct Google Analytics implementation
      if (window.gtag) {
        window.gtag('event', 'get_started_click', {
          event_category: 'engagement',
          event_label: packageType,
        });
      }
      // Fallback to console for now
      console.log('Track Get Started:', packageType);
    }
  }, []);

  const trackContactUs = useCallback((location: string) => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'contact_click', {
          event_category: 'engagement',
          event_label: location,
        });
      }
      console.log('Track Contact Us:', location);
    }
  }, []);

  const trackNavigation = useCallback((section: string) => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'navigation_click', {
          event_category: 'navigation',
          event_label: section,
        });
      }
      console.log('Track Navigation:', section);
    }
  }, []);

  const trackPhoneClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'phone_click', {
          event_category: 'contact',
        });
      }
      console.log('Track Phone Click');
    }
  }, []);

  const trackEmailClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'email_click', {
          event_category: 'contact',
        });
      }
      console.log('Track Email Click');
    }
  }, []);

  const trackSocialClick = useCallback((platform: string) => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'social_click', {
          event_category: 'social',
          event_label: platform,
        });
      }
      console.log('Track Social Click:', platform);
    }
  }, []);

  const trackFormSubmit = useCallback((formType: string) => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'form',
          event_label: formType,
        });
      }
      console.log('Track Form Submit:', formType);
    }
  }, []);

  const trackPortfolioView = useCallback((projectName: string) => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'portfolio_view', {
          event_category: 'portfolio',
          event_label: projectName,
        });
      }
      console.log('Track Portfolio View:', projectName);
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
