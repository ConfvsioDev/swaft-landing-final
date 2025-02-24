'use client'
import posthog from 'posthog-js'

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
    }
  })
}

export { posthog }