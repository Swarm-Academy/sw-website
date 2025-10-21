import { useState, useEffect } from 'react'

export interface PodcastEpisode {
  id: string
  title: string
  description: string
  duration: number
  publishedAt: string
  audioUrl: string
  imageUrl: string
  category: string
  featured: boolean
  spotifyUrl: string
  explicit: boolean
  language: string
  source?: string // 'spotify', 'substack', 'mock', 'fallback'
}

export interface PodcastData {
  episodes: PodcastEpisode[]
  total: number
  source: string
  sources?: string[]
  error?: string
}

export function usePodcast() {
  const [data, setData] = useState<PodcastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPodcastData() {
      try {
        setLoading(true)
        const response = await fetch('/api/podcast')
        
        if (!response.ok) {
          throw new Error('Failed to fetch podcast data')
        }

        const podcastData = await response.json()
        setData(podcastData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching podcast data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPodcastData()
  }, [])

  return { data, loading, error }
}
