'use client'
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  // Define the host based on environment
  const host = process.env.NODE_ENV === 'production' 
    ? window.location.origin  // Use our domain in production for proxying
    : 'https://app.posthog.com'  // Use direct connection in development
    
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: host,
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
    }
  })
}

export { posthog }