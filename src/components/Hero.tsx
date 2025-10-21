'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, ArrowRight, Users, BookOpen, Mic, Sparkles, Brain, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Temporarily disable animation to prevent React errors
    // TODO: Re-implement counter animation using a different approach
    setCount(end)
  }, [isVisible, end])

  return { count, ref }
}

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const episodesCount = useAnimatedCounter(50)
  const articlesCount = useAnimatedCounter(100)
  const membersCount = useAnimatedCounter(5000)

  const handlePlayVideo = useCallback(() => {
    setIsVideoPlaying(true)
  }, [])

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true)
    console.log('Background video loaded successfully')
  }, [])

  const handleVideoError = useCallback((e: any) => {
    setVideoError(true)
    console.error('Background video failed to load:', e)
  }, [])

  // Temporarily disable mouse tracking to prevent React errors
  // TODO: Re-implement mouse tracking using a different approach
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <div className="relative overflow-hidden bg-white min-h-screen flex items-center w-full">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full hero-video-container">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`hero-video-bg transition-opacity duration-1000 ${videoLoaded ? 'opacity-30' : 'opacity-0'}`}
            poster="/TheConnectionEngine.mp4"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            loading="lazy"
          >
            <source src="/TheConnectionEngine.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
          </video>
        ) : (
          /* Fallback background when video fails to load */
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
        )}
        
        {/* Loading indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30" />

      {/* Floating decorative hexagons */}
      <div className="absolute top-20 left-10 w-12 h-12 border-2 border-swarm-gold-400/20 rotate-45 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 border-2 border-swarm-blue-400/20 rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-10 h-10 border-2 border-swarm-gold-300/20 -rotate-12 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-48 right-1/3 w-14 h-14 border-2 border-swarm-blue-300/20 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Accent dots */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-swarm-gold-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-swarm-blue-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.5s' }} />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 w-full">
        <div className="mx-auto max-w-2xl text-center">
          {/* Animated title with sparkle effect */}
          <div className="relative">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-fade-in">
              Collective Intelligence
              <span className="block text-swarm-gold-600 relative">
                for Everyone
                <Sparkles className="absolute -top-2 -right-8 w-8 h-8 text-swarm-gold-400 animate-pulse" />
              </span>
            </h1>
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-600 text-balance animate-slide-up">
            Join our community of thinkers, creators, and innovators as we explore the power of
            collective intelligence through podcasts, discussions, and collaborative learning.
          </p>
          
          {/* Enhanced Video Preview Section */}
          <div className="mt-10 animate-slide-up">
            <div className="relative group">
              {!isVideoPlaying ? (
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-swarm-gold-400/20 to-swarm-blue-400/20 animate-pulse" />
                  </div>

                  <div className="aspect-video bg-gradient-to-br from-swarm-dark-800 to-swarm-dark-900 flex items-center justify-center relative">
                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-swarm-gold-300 rounded-full animate-ping opacity-60" />
                      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-swarm-blue-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }} />
                      <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-swarm-gold-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }} />
                    </div>

                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-swarm-gold-400 to-swarm-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Welcome to Swarm Academy</h3>
                      <p className="text-gray-300">Watch The Connection Engine</p>
                      <div className="mt-2 flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-swarm-gold-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-400">Interactive Experience</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 w-full h-full bg-black/20 hover:bg-black/30 transition-all duration-300 group"
                    aria-label="Play introduction video"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="sr-only">Play video</span>
                  </button>
                </div>
              ) : (
                <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src="/TheConnectionEngine.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Call to Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-slide-up">
            <Button size="lg" className="group bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 text-base sm:text-lg font-bold px-6 py-4 sm:px-8 sm:py-6 w-full sm:w-auto min-h-[56px]">
              <Mic className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
              <span className="flex items-center">
                <span>Explore Podcast</span>
              </span>
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform duration-200" strokeWidth={2.5} />
            </Button>
            <Button variant="outline" size="lg" asChild className="group border-3 border-gray-900 hover:border-black hover:bg-gray-50 bg-white transform hover:scale-110 transition-all duration-300 text-base sm:text-lg font-bold px-6 py-4 sm:px-8 sm:py-6 shadow-xl w-full sm:w-auto min-h-[56px]">
              <Link href="/about" className="flex items-center justify-center">
                <Brain className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-gray-900" strokeWidth={2.5} />
                <span className="text-gray-900 group-hover:text-black">
                  Learn More
                </span>
              </Link>
            </Button>
          </div>

          {/* Enhanced Quick Stats with Animated Counters */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 animate-fade-in">
            <div ref={episodesCount.ref} className="group flex flex-col items-center p-8 bg-white rounded-2xl border-3 border-gray-200 hover:border-[#fda932] hover:shadow-2xl hover:shadow-orange-200/50 transform hover:scale-105 transition-all duration-300 hover-glow">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fda932] to-[#fcc530] group-hover:from-[#fd9d31] group-hover:to-[#fda932] transition-all duration-300 shadow-xl group-hover:shadow-2xl">
                <Mic className="h-12 w-12 text-white" strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-4xl font-black text-gray-900 group-hover:text-[#fda932] transition-colors duration-300">
                {episodesCount.count}+
              </h3>
              <p className="mt-3 text-lg text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300 font-bold">
                Podcast Episodes
              </p>
              <div className="mt-3 w-20 h-1.5 bg-gradient-to-r from-[#fda932] to-[#fcc530] rounded-full group-hover:w-24 transition-all duration-300 shadow-lg" />
            </div>

            <div ref={articlesCount.ref} className="group flex flex-col items-center p-8 bg-white rounded-2xl border-3 border-gray-200 hover:border-black hover:shadow-2xl hover:shadow-gray-200/50 transform hover:scale-105 transition-all duration-300 hover-glow">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-black group-hover:from-gray-800 group-hover:to-gray-900 transition-all duration-300 shadow-xl group-hover:shadow-2xl">
                <BookOpen className="h-12 w-12 text-white" strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-4xl font-black text-gray-900 group-hover:text-black transition-colors duration-300">
                {articlesCount.count}+
              </h3>
              <p className="mt-3 text-lg text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300 font-bold">
                Expert Articles
              </p>
              <div className="mt-3 w-20 h-1.5 bg-gradient-to-r from-gray-800 to-black rounded-full group-hover:w-24 transition-all duration-300 shadow-lg" />
            </div>

            <div ref={membersCount.ref} className="group flex flex-col items-center p-8 bg-white rounded-2xl border-3 border-gray-200 hover:border-[#fda932] hover:shadow-2xl hover:shadow-orange-200/50 transform hover:scale-105 transition-all duration-300 hover-glow">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fda932] to-[#fcc530] group-hover:from-[#fd9d31] group-hover:to-[#fda932] transition-all duration-300 shadow-xl group-hover:shadow-2xl">
                <Users className="h-12 w-12 text-white" strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-4xl font-black text-gray-900 group-hover:text-[#fda932] transition-colors duration-300">
                {membersCount.count.toLocaleString()}+
              </h3>
              <p className="mt-3 text-lg text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300 font-bold">
                Community Members
              </p>
              <div className="mt-3 w-20 h-1.5 bg-gradient-to-r from-[#fda932] to-[#fcc530] rounded-full group-hover:w-24 transition-all duration-300 shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
