'use client'

import { ArrowRight, Calendar, Clock, User, Search, BookOpen, Star, Award, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDate, generateRandomGradient } from '@/lib/utils'
import Link from 'next/link'
import { useBlog } from '@/hooks/useBlog'
import { useState } from 'react'

export default function BlogPage() {
  const { data, loading, error } = useBlog()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts based on category and search
  const filteredPosts = data.posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPost = filteredPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  // Generate categories from actual posts
  const categories = [
    { id: 'all', name: 'All Articles', count: data.posts.length },
    ...Array.from(new Set(data.posts.map(post => post.category))).map(category => ({
      id: category,
      name: category,
      count: data.posts.filter(post => post.category === category).length
    }))
  ]

  const handlePostClick = (post: any) => {
    window.open(post.link, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fda932] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">Error loading blog posts: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 hex-pattern-accent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl mb-6">
              Insights & Analysis
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-700 font-medium text-balance">
              Deep dives into collective intelligence, community building, and the future of collaboration. 
              Written by experts and practitioners in the field.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Hexagon Pattern Background */}
        <div className="absolute inset-0 hex-pattern opacity-40" />
        {/* Decorative elements */}
        <div className="absolute top-8 right-16 w-16 h-16 border-2 border-[#fda932]/20 rounded-full" />
        <div className="absolute bottom-8 left-16 w-12 h-12 bg-[#fda932]/10 rounded-full" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#fda932] w-6 h-6" strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 border-3 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#fda932]/30 focus:border-[#fda932] bg-white shadow-xl hover:shadow-2xl text-lg font-bold placeholder-gray-500 transition-all duration-300"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 max-w-4xl">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-br from-[#fda932] to-[#fcc530] text-white shadow-2xl'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#fda932] hover:text-[#fda932]'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Featured Article
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/40 hover:border-[#fda932] transition-all duration-300 hover-glow">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                <div className={`aspect-video lg:aspect-square ${generateRandomGradient()} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:20px_20px]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/20 via-transparent to-black/10">
                    <div className="text-center relative z-10">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <Award className="w-12 h-12 text-gray-700" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 bg-gradient-to-b from-white to-gray-50">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-orange-200 px-4 py-2 text-sm font-bold text-[#fda932] border-2 border-[#fda932]/30">
                      <Star className="w-5 h-5 mr-2 fill-[#fda932]" strokeWidth={0} />
                      Featured
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-800 border-2 border-gray-300">
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-8 text-lg leading-relaxed font-medium">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex items-center bg-gray-100 px-4 py-2.5 rounded-full border-2 border-gray-200 shadow-sm">
                      <User className="w-5 h-5 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-bold text-gray-900">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center bg-gray-100 px-4 py-2.5 rounded-full border-2 border-gray-200 shadow-sm">
                      <Calendar className="w-5 h-5 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-bold text-gray-900">{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                    <div className="flex items-center bg-gray-100 px-4 py-2.5 rounded-full border-2 border-gray-200 shadow-sm">
                      <Clock className="w-5 h-5 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-bold text-gray-900">{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredPost.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePostClick(featuredPost)}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    Read Full Article
                    <ExternalLink className="ml-3 h-6 w-6" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
                All Articles
              </h2>
              <p className="mt-4 text-xl text-gray-700 font-medium">
                Browse our complete library of insights and analysis.
              </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/40 hover:border-[#fda932] transform hover:scale-105 transition-all duration-300 group hover-glow"
              >
                <div className={`aspect-video ${generateRandomGradient()} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:20px_20px]" />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/20 via-transparent to-black/10">
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="w-10 h-10 text-gray-700" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  {/* Single Category at top - matching resources styling */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-[#fda932] tracking-wide uppercase">
                      {post.category.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#fd9d31] transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 text-base mb-5 line-clamp-3 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      <User className="w-4 h-4 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      <Clock className="w-4 h-4 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-medium">{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      <Calendar className="w-4 h-4 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-medium">{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePostClick(post)}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Read Article
                    <ExternalLink className="ml-2 h-5 w-5" strokeWidth={3} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-to-br from-[#fda932] via-[#fcc530] to-[#fdaa32] gradient-animate">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black text-white sm:text-5xl mb-6">
              Stay Updated
            </h2>
            <p className="mt-4 text-xl text-white font-medium">
              Get the latest articles delivered to your inbox. No spam, just insights.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-5 rounded-xl border-0 text-gray-900 placeholder-gray-600 focus:ring-4 focus:ring-white/50 focus:outline-none bg-white shadow-2xl text-lg font-medium"
              />
              <button className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#fda932] hover:bg-gray-50 hover:text-[#fd9d31] font-black shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-xl text-lg whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-3 h-6 w-6" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
