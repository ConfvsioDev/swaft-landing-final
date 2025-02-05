'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import PostHogPageView from '../components/PostHogPageView'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false
    })
  }, [])

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
