// app/providers.tsx
'use client'
import { posthog } from '@/lib/posthog'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import PostHogPageView from "./PostHogPageView"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <FeatureFlagLoader />
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}
function FeatureFlagLoader() {
  useEffect(() => {
    posthog.reloadFeatureFlags()
  }, [])
  return null
}
