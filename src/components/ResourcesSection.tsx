'use client'

import { useState } from 'react'
import { BookOpen, Video, FileText, ExternalLink, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const resourceCategories = [
  { id: 'all', name: 'All Resources', count: 20 },
  { id: 'books', name: 'Books', count: 8 },
  { id: 'articles', name: 'Articles', count: 6 },
  { id: 'videos', name: 'Videos', count: 4 },
  { id: 'case-studies', name: 'Case Studies', count: 2 }
]

const resources = [
  {
    id: 1,
    title: "The Starfish and The Spider",
    author: "Ori Brafman & Rod Beckstrom",
    type: "books",
    description: "The foundational theory book behind decentralized leadership and leaderless systems. This will explain the 'why' behind how leaderless and decentralized organizations and systems can operate with unstoppable power.",
    url: "https://www.amazon.com/Starfish-Spider-Unstoppable-Power-Leaderless/dp/1591841836",
    featured: true,
    tags: ["decentralized leadership", "leaderless systems", "organizational theory"]
  },
  {
    id: 2,
    title: "The Wisdom of Crowds",
    author: "James Surowiecki",
    type: "books",
    description: "Considered by many to be the staple textbook of collective intelligence theory. Explains the history and use case studies in enlightening details. A must read for all serious Swarm Theory explorers.",
    url: "https://www.amazon.com/Wisdom-Crowds-James-Surowiecki/dp/0385721706",
    featured: true,
    tags: ["collective intelligence", "decision making", "group dynamics"]
  },
  {
    id: 3,
    title: "Human Swarm Intelligence: The Most Powerful Tool For Humanity You Likely Never Heard Of",
    author: "The Society of Problem Solvers",
    type: "articles",
    description: "The Society of Problem Solvers explores some of the modern options and applications with technology used to enhance the wisdom of crowds and Swarm Theory.",
    url: "https://www.societyofproblemsolvers.com/human-swarm-intelligence",
    featured: true,
    tags: ["swarm intelligence", "technology", "human collaboration"]
  },
  {
    id: 4,
    title: "What's our Problem by Tim Urban",
    author: "Tim Urban",
    type: "books",
    description: "A must read for all serious Swarm Explorers and Problem Solvers. One of the best books in recent times explains why groups of people collaborating and problem solving together can often emerge as almost magical beings creating amazing worlds.",
    url: "https://www.amazon.com/Whats-Our-Problem-Tim-Urban/dp/1732265143",
    featured: true,
    tags: ["problem solving", "group dynamics", "collaboration"]
  },
  {
    id: 5,
    title: "The Network State by Balaji Srinivasan",
    author: "Balaji Srinivasan",
    type: "books",
    description: "Explores the concept of decentralized, technology-driven governance models known as network states. It delves into the potential of these network states to reshape traditional structures of power and influence.",
    url: "https://www.amazon.com/Network-State-Balaji-Srinivasan/dp/1732265143",
    featured: false,
    tags: ["network states", "decentralization", "governance"]
  },
  {
    id: 6,
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    type: "books",
    description: "Carol S. Dweck, a Stanford University psychologist, discovered the profound impact of mindset on success in various aspects of life, including education, work, and sports.",
    url: "https://www.amazon.com/Mindset-Psychology-Success-Carol-Dweck/dp/0345472322",
    featured: false,
    tags: ["psychology", "growth mindset", "success"]
  },
  {
    id: 7,
    title: "Extreme Ownership",
    author: "Jocko Willink & Leif Babin",
    type: "books",
    description: "Navy Seal officers Jocko Willink and Leif Babin emphasize the principles of taking full responsibility for one's actions, fostering leadership accountability, and driving success by embracing a mindset of extreme ownership.",
    url: "https://www.amazon.com/Extreme-Ownership-U-S-Navy-SEALs/dp/1250067057",
    featured: false,
    tags: ["leadership", "accountability", "ownership"]
  },
  {
    id: 8,
    title: "New hope for humans in an A.I. world | Louis Rosenberg | TEDxKC",
    author: "Louis Rosenberg",
    type: "videos",
    description: "TED Talk exploring how collective intelligence and human collaboration can provide hope in an AI-dominated world.",
    url: "https://www.ted.com/talks/louis_rosenberg_new_hope_for_humans_in_an_ai_world",
    featured: true,
    tags: ["TED Talk", "AI", "human collaboration"]
  },
  {
    id: 9,
    title: "CASE STUDY: Using Swarm Theory for Conflict Resolution and Mediation",
    author: "Swarm Academy",
    type: "case-studies",
    description: "Resolved: Transgender & Muslim Athletes Use Human Swarm Theory to Compete in The Same Jiu Jitsu Tournament.",
    url: "https://www.societyofproblemsolvers.com/human-swarm-intelligence",
    featured: true,
    tags: ["conflict resolution", "mediation", "swarm theory"]
  },
  {
    id: 10,
    title: "Embrace Decentralized Systems. Fear Centralized Ones. Know The Difference.",
    author: "Swarm Academy",
    type: "articles",
    description: "Do you know what the 'Last Hand on the Bat' theory of systems is? If not this is a must read.",
    url: "https://www.societyofproblemsolvers.com/human-swarm-intelligence",
    featured: false,
    tags: ["decentralization", "systems theory", "governance"]
  },
  {
    id: 11,
    title: "Fixing Trust Online and In Person",
    author: "Swarm Academy",
    type: "articles",
    description: "Why trust and transparency are important for swarmed systems and systems in general.",
    url: "https://www.societyofproblemsolvers.com/human-swarm-intelligence",
    featured: false,
    tags: ["trust", "transparency", "systems"]
  },
  {
    id: 12,
    title: "DEMANDING TRANSPARENCY: Our Systems Have Been Corrupted. Transparency is the Cure",
    author: "Swarm Academy",
    type: "articles",
    description: "An exploration of how transparency can cure corrupted systems and restore trust in institutions.",
    url: "https://www.societyofproblemsolvers.com/human-swarm-intelligence",
    featured: false,
    tags: ["transparency", "corruption", "systems reform"]
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'books':
      return BookOpen
    case 'videos':
      return Video
    case 'articles':
      return FileText
    case 'case-studies':
      return FileText
    default:
      return FileText
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'books':
      return 'bg-orange-100 text-[#fda932] border-2 border-[#fda932]/30'
    case 'videos':
      return 'bg-orange-100 text-[#fda932] border-2 border-[#fda932]/30'
    case 'articles':
      return 'bg-blue-100 text-blue-800 border-2 border-blue-300'
    case 'case-studies':
      return 'bg-green-100 text-green-800 border-2 border-green-300'
    default:
      return 'bg-gray-100 text-gray-800 border-2 border-gray-300'
  }
}

export default function ResourcesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const featuredResources = filteredResources.filter(resource => resource.featured)
  const regularResources = filteredResources.filter(resource => !resource.featured)

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Hexagon Pattern Background */}
      <div className="absolute inset-0 hex-pattern opacity-50" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/30 to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-24 h-24 border-2 border-swarm-gold-300/20 rotate-45 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-20 h-20 border-2 border-swarm-blue-300/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
            Curated Resources
          </h2>
          <p className="mt-4 text-xl text-gray-700 font-medium leading-relaxed">
            Discover books, articles, videos, and tools that will expand your understanding of collective intelligence.
          </p>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between animate-fade-in">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#fda932] w-5 h-5" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search resources"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#fda932]/30 focus:border-[#fda932] bg-white shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-300 text-base font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {resourceCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-base font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-br from-[#fda932] to-[#fcc530] text-white shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 hover:border-[#fda932]'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          {/* Featured Resources */}
          {featuredResources.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Featured Resources</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredResources.map((resource) => {
                  const Icon = getTypeIcon(resource.type)
                  return (
                    <div
                      key={resource.id}
                      className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#fda932]/30 hover:shadow-xl hover:shadow-[#fda932]/10 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                    >
                      {/* Subtle gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fda932]/3 via-transparent to-[#fda932]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center space-x-3">
                            <div className={`p-3 rounded-xl ${getTypeColor(resource.type)} shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                              <Icon className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <div>
                              <span className={`text-xs font-bold ${getTypeColor(resource.type).split(' ')[1]} tracking-wide uppercase`}>
                                {resource.type.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#fda932]/10">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#fda932] transition-colors duration-300 leading-tight line-clamp-2">
                          {resource.title}
                        </h4>
                        
                        <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                          by {resource.author}
                        </p>
                        
                        <p className="text-gray-700 text-sm mb-5 leading-relaxed line-clamp-3">
                          {resource.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-gray-100 hover:bg-[#fda932]/10 px-2.5 py-1 text-xs font-medium text-gray-700 hover:text-[#fda932] transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Enhanced Regular Resources Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularResources.map((resource, index) => {
              const Icon = getTypeIcon(resource.type)
              return (
                <div
                  key={resource.id}
                  className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#fda932]/30 hover:shadow-xl hover:shadow-[#fda932]/10 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fda932]/3 via-transparent to-[#fda932]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl ${getTypeColor(resource.type)} shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                          <Icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <span className={`text-xs font-bold ${getTypeColor(resource.type).split(' ')[1]} tracking-wide uppercase`}>
                          {resource.type.toUpperCase()}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#fda932]/10">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#fda932] transition-colors duration-300 leading-tight line-clamp-2">
                      {resource.title}
                    </h4>
                    
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                      by {resource.author}
                    </p>
                    
                    <p className="text-gray-700 text-sm mb-5 leading-relaxed line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {resource.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-gray-100 hover:bg-[#fda932]/10 px-2.5 py-1 text-xs font-medium text-gray-700 hover:text-[#fda932] transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 2 && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                          +{resource.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Button size="lg" asChild className="bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-6">
            <Link href="/resources" className="group flex items-center">
              View All Resources
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-200" strokeWidth={3} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
