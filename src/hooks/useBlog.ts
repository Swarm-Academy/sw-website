import { useState, useEffect } from 'react'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  readTime: string
  imageUrl: string
  category: string
  featured: boolean
  tags: string[]
  link: string
  source: string
}

export interface BlogData {
  posts: BlogPost[]
  total: number
  source: string
  error?: string
}

export function useBlog() {
  const [data, setData] = useState<BlogData>({
    posts: [],
    total: 0,
    source: 'loading'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/blog')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const blogData = await response.json()
        setData(blogData)
      } catch (err) {
        console.error('Error fetching blog data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch blog data')
        setData({
          posts: [],
          total: 0,
          source: 'error',
          error: err instanceof Error ? err.message : 'Failed to fetch blog data'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBlogData()
  }, [])

  return {
    data,
    loading,
    error
  }
}
