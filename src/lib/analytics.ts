import ReactGA from "react-ga4";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

let initialized = false;

export function isAnalyticsEnabled() {
  return Boolean(measurementId);
}

export function initializeAnalytics() {
  if (!measurementId || initialized) {
    return;
  }

  ReactGA.initialize(measurementId, {
    gaOptions: {
      anonymize_ip: true
    }
  });

  initialized = true;
}

export function trackPageView(path: string) {
  if (!measurementId) {
    return;
  }

  ReactGA.send({
    hitType: "pageview",
    page: path,
    title: document.title
  });
}
