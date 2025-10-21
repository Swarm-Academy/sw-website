'use client'

import { ArrowRight, Calendar, Clock, User, BookOpen, Star, TrendingUp, Award, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDate, generateRandomGradient } from '@/lib/utils'
import Link from 'next/link'
import { useBlog } from '@/hooks/useBlog'

export default function BlogSection() {
  const { data, loading, error } = useBlog()
  
  const handlePostClick = (post: { link: string }) => {
    window.open(post.link, '_blank')
  }

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fda932] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading blog posts...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-4">Error loading blog posts: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  const posts = data.posts.slice(0, 4) // Show only first 4 posts on homepage
  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Hexagon Pattern Background */}
      <div className="absolute inset-0 hex-pattern opacity-40" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border-2 border-swarm-blue-300/20 rounded-lg rotate-12 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-20 h-20 border-2 border-swarm-gold-300/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
            Latest Insights
          </h2>
          <p className="mt-4 text-xl text-gray-700 font-medium leading-relaxed">
            Deep dives into collective intelligence, community building, and the future of collaboration.
          </p>
        </div>

        <div className="mt-16">
          {/* Enhanced Featured Post */}
          {featuredPost && (
            <div className="mb-16 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/40 hover:border-[#fda932] transform hover:scale-[1.02] transition-all duration-300 hover-glow">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className={`aspect-video lg:aspect-square ${generateRandomGradient()} relative overflow-hidden`}>
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:20px_20px]" />

                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/20 via-transparent to-black/10">
                      <div className="text-center relative z-10">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
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

                    <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight group-hover:text-[#fda932] transition-colors duration-300">
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

                    <button
                      onClick={() => handlePostClick(featuredPost)}
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base group"
                    >
                      Read Full Article
                      <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Regular Posts Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {regularPosts.map((post, index) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/40 hover:border-[#fda932] transform hover:scale-105 transition-all duration-300 group hover-glow cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`aspect-video ${generateRandomGradient()} relative overflow-hidden`}>
                  {/* Animated background pattern */}
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

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      <User className="w-4 h-4 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      <Clock className="w-4 h-4 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-medium">{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      <Calendar className="w-4 h-4 mr-2 text-[#fda932]" strokeWidth={2.5} />
                      <span className="font-medium">{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center animate-fade-in">
          <Button size="lg" asChild className="bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-6">
            <Link href="/blog" className="group flex items-center">
              <TrendingUp className="mr-3 h-6 w-6" strokeWidth={2.5} />
              View All Articles
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-200" strokeWidth={3} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
