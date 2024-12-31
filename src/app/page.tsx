'use client'
import {motion} from 'motion/react'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <Hero/>
    </main>
  )
}
