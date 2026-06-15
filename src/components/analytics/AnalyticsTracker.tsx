import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initializeAnalytics, isAnalyticsEnabled, trackPageView } from "../../lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    initializeAnalytics();
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    const path = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(path);
  }, [location]);

  return null;
};

export default AnalyticsTracker;
