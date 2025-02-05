'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import PostHogPageView from '../components/PostHogPageView'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isPostHogReady, setIsPostHogReady] = useState(false);

  useEffect(() => {
    if (!posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
          console.log('PostHog initialized in providers')
          setIsPostHogReady(true);
        },
      })
    } else {
      setIsPostHogReady(true);
    }
  }, [])

  if (!isPostHogReady) {
    return <div>Loading...</div>;
  }

  return (
    <PostHogProvider client={posthog}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange
      >
        <PostHogPageView />
        {children}
      </ThemeProvider>
    </PostHogProvider>
  )
}
