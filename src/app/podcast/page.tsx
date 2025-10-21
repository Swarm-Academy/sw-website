'use client'

import { useState } from 'react'
import { Play, Clock, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDuration, formatDate } from '@/lib/utils'
import { usePodcast, PodcastEpisode } from '@/hooks/usePodcast'

export default function PodcastPage() {
  const { data, loading, error } = usePodcast()
  const [selectedCategory, setSelectedCategory] = useState('all')

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
      <div className="min-h-screen">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 hex-pattern-accent" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl mb-6">
                Swarm Academy Podcast
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-gray-700 font-medium text-balance">
                Loading episodes...
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Show error state
  if (error || !data) {
    return (
      <div className="min-h-screen">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 hex-pattern-accent" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl mb-6">
                Swarm Academy Podcast
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-gray-700 font-medium text-balance">
                Unable to load episodes at this time. Please try again later.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const episodes = data.episodes
  
  // Create categories from episodes
  const categories = [
    { id: 'all', name: 'All Episodes', count: episodes.length },
    ...Array.from(new Set(episodes.map(ep => ep.category))).map(category => ({
      id: category,
      name: category,
      count: episodes.filter(ep => ep.category === category).length
    }))
  ]

  const filteredEpisodes = selectedCategory === 'all' 
    ? episodes 
    : episodes.filter(ep => ep.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 hex-pattern-accent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl mb-6">
              Swarm Academy Podcast
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-700 font-medium text-balance">
              Deep conversations about collective intelligence, community building, 
              and the future of collaboration. Available on all major platforms.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-6">
                <Play className="mr-3 h-6 w-6 fill-white" strokeWidth={0} />
                Listen Now
              </Button>
              <Button variant="outline" size="lg" className="border-3 border-gray-900 hover:border-black hover:bg-gray-50 bg-white transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-6 shadow-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
              All Episodes
            </h2>
            <p className="mt-4 text-xl text-gray-700 font-medium">
              Browse our complete library of conversations about collective intelligence.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-base font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-br from-[#fda932] to-[#fcc530] text-white shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 hover:border-[#fda932] shadow-sm'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Episodes Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredEpisodes.map((episode) => (
              <article
                key={episode.id}
                className="group relative rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl bg-white border border-gray-100"
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
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-24 bg-gradient-to-br from-[#fda932] via-[#fcc530] to-[#fdaa32] gradient-animate">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black text-white sm:text-5xl mb-6">
              Subscribe to Our Podcast
            </h2>
            <p className="mt-4 text-xl text-white font-medium">
              Never miss an episode. Subscribe on your favorite platform and join the conversation.
            </p>
            
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <button className="bg-white text-gray-900 hover:bg-gray-50 font-bold text-base py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40">
                Spotify
              </button>
              <button className="bg-white text-gray-900 hover:bg-gray-50 font-bold text-base py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40">
                Apple Podcasts
              </button>
              <button className="bg-white text-gray-900 hover:bg-gray-50 font-bold text-base py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40">
                <div className="text-center">
                  <div className="font-bold">Google</div>
                  <div className="font-bold">Podcasts</div>
                </div>
              </button>
              <button className="bg-white text-gray-900 hover:bg-gray-50 font-bold text-base py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40">
                RSS Feed
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
