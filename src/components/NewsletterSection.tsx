'use client'

import { useState } from 'react'
import { Mail, Check, ArrowRight, Sparkles, Users, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  if (isSubscribed) {
    return (
      <section className="py-24 bg-gradient-to-br from-[#fda932] via-[#fcc530] to-[#fdaa32] relative overflow-hidden gradient-animate">
        {/* Floating celebration elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-3 h-3 bg-white/30 rounded-full animate-ping" />
          <div className="absolute top-40 right-20 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-48 right-1/3 w-3 h-3 bg-white/35 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-10 h-10 text-white" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to the Swarm!
                <Sparkles className="absolute -top-2 -right-8 w-8 h-8 text-white/80 animate-pulse" />
              </h2>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              You're now part of our collective intelligence community. Check your email for next steps.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#fda932] via-[#fcc530] to-[#fdaa32] relative overflow-hidden gradient-animate">
      {/* Decorative geometric shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-white rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 border-4 border-white rounded-lg rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border-4 border-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Subtle hexagon pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="hex-pattern h-full w-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center animate-fade-in">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl font-black text-white sm:text-5xl leading-tight mb-6">
            Stay Connected
          </h2>

          <p className="mt-4 text-xl text-white font-medium leading-relaxed">
            Join our newsletter for the latest insights on collective intelligence,
            community building, and collaborative innovation.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto animate-slide-up">
            <div className="flex-1">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-5 rounded-xl border-0 text-gray-900 placeholder-gray-600 focus:ring-4 focus:ring-white/50 focus:outline-none bg-white shadow-2xl text-lg font-medium"
                placeholder="Enter your email address"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#fda932] hover:bg-gray-50 hover:text-[#fd9d31] font-black shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-[#fda932] border-t-transparent rounded-full animate-spin mr-3" />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={3} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-base text-white font-medium">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 animate-fade-in">
            <div className="text-center group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-white/30 transition-all duration-300">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Weekly Insights</h3>
              <p className="text-sm text-white/80 leading-relaxed">Curated content delivered to your inbox</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-white/30 transition-all duration-300">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Podcast Updates</h3>
              <p className="text-sm text-white/80 leading-relaxed">New episodes and exclusive content</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-white/30 transition-all duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community Access</h3>
              <p className="text-sm text-white/80 leading-relaxed">Connect with like-minded individuals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
