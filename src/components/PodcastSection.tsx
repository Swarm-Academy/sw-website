'use client'

import { Clock, Calendar, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDuration, formatDate } from '@/lib/utils'
import { usePodcast, PodcastEpisode } from '@/hooks/usePodcast'
import Link from 'next/link'

export default function PodcastSection() {
  const { data, loading, error } = usePodcast()


  const handleEpisodeClick = (episode: PodcastEpisode) => {
    if (episode.source === 'spotify' && episode.spotifyUrl) {
      window.open(episode.spotifyUrl, '_blank', 'noopener,noreferrer')
    } else if (episode.source === 'substack' && episode.spotifyUrl) {
      window.open(episode.spotifyUrl, '_blank', 'noopener,noreferrer')
    } else if (episode.audioUrl) {
      window.open(episode.audioUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // Show loading state
  if (loading) {
    return (
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
              Latest Podcast Episodes
            </h2>
            <p className="mt-4 text-xl text-gray-700 font-medium leading-relaxed">
              Loading episodes...
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error || !data) {
    return (
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
              Latest Podcast Episodes
            </h2>
            <p className="mt-4 text-xl text-gray-700 font-medium leading-relaxed">
              Unable to load episodes at this time. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const episodes = data.episodes.slice(0, 3) // Show only first 3 episodes on homepage

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Hexagon Pattern Background */}
      <div className="absolute inset-0 hex-pattern opacity-60" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-swarm-gold-50/10 to-transparent" />
      
      {/* Decorative geometric shapes */}
      <div className="absolute top-10 right-20 w-20 h-20 border-2 border-swarm-gold-300/20 rounded-full" />
      <div className="absolute bottom-10 left-20 w-16 h-16 border-2 border-swarm-blue-300/20 rotate-45" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
            Latest Podcast Episodes
          </h2>
          <p className="mt-4 text-xl text-gray-700 font-medium leading-relaxed">
            Dive deep into conversations about collective intelligence, community building, and the future of collaboration.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {episodes.map((episode, index) => (
            <article
              key={episode.id}
              className="group relative rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-white border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Content */}
              <div className="p-6">
                {/* Source Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 shadow-sm">
                    {episode.source === 'spotify' ? '🎵 Spotify' : 
                     episode.source === 'substack' ? '📝 Substack' : 
                     '🎧 Podcast'}
                  </span>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                    {episode.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-emerald-800 transition-colors duration-300 line-clamp-2">
                  {episode.title}
                </h3>

                {/* Author */}
                <p className="text-sm text-gray-600 mb-4 font-medium">
                  Joshua Ross Ketry
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {episode.description}
                </p>

                {/* Duration and date */}
                <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" strokeWidth={2} />
                    <span>{formatDuration(episode.duration)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" strokeWidth={2} />
                    <span>{formatDate(episode.publishedAt)}</span>
                  </div>
                </div>

                {/* Episode button */}
                <button
                  onClick={() => handleEpisodeClick(episode)}
                  className="w-full bg-gradient-to-r from-[#1db954] to-[#1ed760] hover:from-[#1aa34a] hover:to-[#1db954] text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" strokeWidth={2.5} />
                  {episode.source === 'spotify' ? 'Listen on Spotify' : 
                   episode.source === 'substack' ? 'Listen on Substack' : 
                   'Listen Now'}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" asChild className="bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-6">
            <Link href="/podcast" className="group flex items-center">
              View All Episodes
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-200 font-bold" strokeWidth={3} />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
