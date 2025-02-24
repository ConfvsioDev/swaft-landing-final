'use client'
import posthog from 'posthog-js'

// Import or define the correct types from posthog-js
type CaptureResult = Record<string, any>;

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: false,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    bootstrap: {
      distinctID: posthog.get_distinct_id(),
      featureFlags: {},
    },
    persistence: 'localStorage',
    advanced_disable_feature_flags: true,
    xhr_headers: {
      'Cache-Control': 'max-age=3600'
    },
    // Match the expected function signature
    _onCapture: (eventName: string, eventData: CaptureResult) => {
      // We're only interested in modifying the eventData
      if (eventData && typeof eventData === 'object') {
        return {
          ...eventData,
          $browser_version: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          $modern_browser: typeof window !== 'undefined' && 'IntersectionObserver' in window && 'fetch' in window
        }
      }
      return eventData;
    }
  })
}

export { posthog }