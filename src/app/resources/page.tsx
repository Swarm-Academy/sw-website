'use client'

import { useState } from 'react'
import { BookOpen, Video, FileText, ExternalLink, Search, Filter, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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
    description: "The foundational theory book behind decentralized leadership and leaderless systems. This will explain the 'why' behind how leaderless and decentralized organizations and systems can operate with unstoppable power. This is an easy read, under 200 pages/under 6 hours as an audiobook.",
    url: "https://www.amazon.com/Starfish-Spider-Unstoppable-Power-Leaderless/dp/1591841836",
    featured: true,
    tags: ["decentralized leadership", "leaderless systems", "organizational theory"],
    rating: 4.8,
    year: 2006
  },
  {
    id: 2,
    title: "The Wisdom of Crowds",
    author: "James Surowiecki",
    type: "books",
    description: "Considered by many to be the staple textbook of collective intelligence theory. Explains the history and use case studies in enlightening details. A must read for all serious Swarm Theory explorers. About 10 hours as an audio book, 340 pages.",
    url: "https://www.amazon.com/Wisdom-Crowds-James-Surowiecki/dp/0385721706",
    featured: true,
    tags: ["collective intelligence", "decision making", "group dynamics"],
    rating: 4.7,
    year: 2004
  },
  {
    id: 3,
    title: "Human Swarm Intelligence: The Most Powerful Tool For Humanity You Likely Never Heard Of",
    author: "The Society of Problem Solvers",
    type: "articles",
    description: "The Society of Problem Solvers explores some of the modern options and applications with technology used to enhance the wisdom of crowds and Swarm Theory.",
    url: "https://www.societyofproblemsolvers.com/human-swarm-intelligence",
    featured: true,
    tags: ["swarm intelligence", "technology", "human collaboration"],
    rating: 4.6,
    year: 2023
  },
  {
    id: 4,
    title: "What's our Problem by Tim Urban",
    author: "Tim Urban",
    type: "books",
    description: "A must read for all serious Swarm Explorers and Problem Solvers. One of the best books in recent times explains why groups of people collaborating and problem solving together can often emerge as almost magical beings creating amazing worlds, or why groups can also sometimes lead to some of the dangers often found in groups, and how to avoid these dangers with proper thinking and training. Amazing yet simple illustrations help drive the points home.",
    url: "https://www.amazon.com/Whats-Our-Problem-Tim-Urban/dp/1732265143",
    featured: true,
    tags: ["problem solving", "group dynamics", "collaboration"],
    rating: 4.9,
    year: 2023
  },
  {
    id: 5,
    title: "The Network State by Balaji Srinivasan",
    author: "Balaji Srinivasan",
    type: "books",
    description: "Balaji Srinivasan's book 'The Network State' explores the concept of decentralized, technology-driven governance models known as network states. It delves into the potential of these network states to reshape traditional structures of power and influence through the use of digital platforms and decentralized technologies such as blockchains and more.",
    url: "https://www.amazon.com/Network-State-Balaji-Srinivasan/dp/1732265143",
    featured: false,
    tags: ["network states", "decentralization", "governance"],
    rating: 4.5,
    year: 2022
  },
  {
    id: 6,
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    type: "books",
    description: "Carol S. Dweck, a Stanford University psychologist, discovered the profound impact of mindset on success in various aspects of life, including education, work, and sports. In 'Mindset,' she explains how people with a growth mindset, who believe abilities can be developed, are more likely to succeed compared to those with a fixed mindset, who see abilities as unchangeable.",
    url: "https://www.amazon.com/Mindset-Psychology-Success-Carol-Dweck/dp/0345472322",
    featured: false,
    tags: ["psychology", "growth mindset", "success"],
    rating: 4.6,
    year: 2006
  },
  {
    id: 7,
    title: "Extreme Ownership",
    author: "Jocko Willink & Leif Babin",
    type: "books",
    description: "Navy Seal officers Jocko Willink and Leif Babin emphasize the principles of taking full responsibility for one's actions, fostering leadership accountability, and driving success by embracing a mindset of extreme ownership in both personal and professional aspects of life. At Swarm Academy we aim for everyone to be leaders, and understanding what that means starts here.",
    url: "https://www.amazon.com/Extreme-Ownership-U-S-Navy-SEALs/dp/1250067057",
    featured: false,
    tags: ["leadership", "accountability", "ownership"],
    rating: 4.8,
    year: 2015
  },
  {
    id: 8,
    title: "New hope for humans in an A.I. world | Louis Rosenberg | TEDxKC",
    author: "Louis Rosenberg",
    type: "videos",
    description: "TED Talk exploring how collective intelligence and human collaboration can provide hope in an AI-dominated world.",
    url: "https://www.ted.com/talks/louis_rosenberg_new_hope_for_humans_in_an_ai_world",
    featured: true,
    tags: ["TED Talk", "AI", "human collaboration"],
    rating: 4.7,
    year: 2023
  },
  {
    id: 9,
    title: "OXFORD UNIVERSITY - THE ROYAL SOCIETY - THE WISDOM OF THE CROWD with Professor Marcus du Sautoy",
    author: "Professor Marcus du Sautoy",
    type: "videos",
    description: "Oxford University and The Royal Society presentation on the wisdom of crowds with Professor Marcus du Sautoy.",
    url: "https://www.ted.com/talks/marcus_du_sautoy_the_wisdom_of_crowds",
    featured: false,
    tags: ["Oxford University", "Royal Society", "wisdom of crowds"],
    rating: 4.8,
    year: 2023
  },
  {
    id: 10,
    title: "ConSciCom and The Royal Society - Citizen Science and The Wisdom of Crowds",
    author: "ConSciCom & The Royal Society",
    type: "videos",
    description: "Exploration of citizen science and how it leverages the wisdom of crowds for scientific advancement.",
    url: "https://www.royalsociety.org/science-events-and-lectures/2023/03/citizen-science-wisdom-crowds/",
    featured: false,
    tags: ["citizen science", "Royal Society", "crowd wisdom"],
    rating: 4.5,
    year: 2023
  },
  {
    id: 11,
    title: "THE SWARM - Lorenzo Canonico - Episode 2 with John Knox - Collective Intelligence Overview",
    author: "Lorenzo Canonico & John Knox",
    type: "videos",
    description: "Episode 2 of The Swarm podcast featuring John Knox providing an overview of collective intelligence.",
    url: "https://www.youtube.com/watch?v=swarm-podcast-episode-2",
    featured: false,
    tags: ["podcast", "collective intelligence", "swarm theory"],
    rating: 4.6,
    year: 2023
  },
  {
    id: 12,
    title: "Embrace Decentralized Systems. Fear Centralized Ones. Know The Difference.",
    author: "Swarm Academy",
    type: "articles",
    description: "Do you know what the 'Last Hand on the Bat' theory of systems is? If not this is a must read.",
    url: "https://swarmacademy.ai/embrace-decentralized-systems",
    featured: false,
    tags: ["decentralization", "systems theory", "governance"],
    rating: 4.4,
    year: 2023
  },
  {
    id: 13,
    title: "Fixing Trust Online and In Person",
    author: "Swarm Academy",
    type: "articles",
    description: "Why trust and transparency are important for swarmed systems and systems in general.",
    url: "https://swarmacademy.ai/fixing-trust-online",
    featured: false,
    tags: ["trust", "transparency", "systems"],
    rating: 4.5,
    year: 2023
  },
  {
    id: 14,
    title: "DEMANDING TRANSPARENCY: Our Systems Have Been Corrupted. Transparency is the Cure",
    author: "Swarm Academy",
    type: "articles",
    description: "An exploration of how transparency can cure corrupted systems and restore trust in institutions.",
    url: "https://swarmacademy.ai/demanding-transparency",
    featured: false,
    tags: ["transparency", "corruption", "systems reform"],
    rating: 4.7,
    year: 2023
  },
  {
    id: 15,
    title: "Why Doesn't This Exist? A Platform for Human 'Super Collaboration'",
    author: "Swarm Academy",
    type: "articles",
    description: "So you want to start a movement? Change things? We do too. So why don't we have the tools to do just that? Use your imagination and explore with us some possibilities that Swarm Academy could become.",
    url: "https://swarmacademy.ai/platform-human-super-collaboration",
    featured: false,
    tags: ["collaboration", "platforms", "movements"],
    rating: 4.6,
    year: 2023
  },
  {
    id: 16,
    title: "Understanding the theory of knowledge with David Deutsch, Naval Ravikant, And Tim Ferris",
    author: "David Deutsch, Naval Ravikant, Tim Ferris",
    type: "videos",
    description: "This podcast shows us how to understand the entire universe and explains simply that problems are everywhere, yet all problems are solvable (within the laws of physics). Mind altering podcast.",
    url: "https://www.youtube.com/watch?v=knowledge-theory-podcast",
    featured: false,
    tags: ["knowledge theory", "problem solving", "philosophy"],
    rating: 4.9,
    year: 2023
  },
  {
    id: 17,
    title: "Understanding the Iterated Prisoner's Dilemma",
    author: "Swarm Academy",
    type: "articles",
    description: "Why trust is important when collaborating in groups.",
    url: "https://swarmacademy.ai/iterated-prisoners-dilemma",
    featured: false,
    tags: ["game theory", "trust", "collaboration"],
    rating: 4.3,
    year: 2023
  },
  {
    id: 18,
    title: "Decentralized Science and fixing corrupted systems - Balaji Srinivasan on Lex Fridman",
    author: "Balaji Srinivasan & Lex Fridman",
    type: "videos",
    description: "How science has been corrupted and how to decentralize it to fix it. This is a SUPER podcast both in quality and density of knowledge.",
    url: "https://www.youtube.com/watch?v=balaji-srinivasan-lex-fridman",
    featured: false,
    tags: ["decentralized science", "corruption", "reform"],
    rating: 4.8,
    year: 2023
  },
  {
    id: 19,
    title: "CASE STUDY: Using Swarm Theory for Conflict Resolution and Mediation",
    author: "Swarm Academy",
    type: "case-studies",
    description: "Resolved: Transgender & Muslim Athletes Use Human Swarm Theory to Compete in The Same Jiu Jitsu Tournament.",
    url: "https://swarmacademy.ai/case-study-conflict-resolution",
    featured: true,
    tags: ["conflict resolution", "mediation", "swarm theory"],
    rating: 4.9,
    year: 2023
  },
  {
    id: 20,
    title: "Coming Soon... How to run a Business with a Swarm",
    author: "Swarm Academy",
    type: "articles",
    description: "Upcoming content on how to run a business using swarm intelligence principles.",
    url: "https://swarmacademy.ai/how-to-run-business-with-swarm",
    featured: false,
    tags: ["business", "swarm intelligence", "coming soon"],
    rating: 0,
    year: 2024
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

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return b.featured ? 1 : -1
      case 'rating':
        return b.rating - a.rating
      case 'year':
        return b.year - a.year
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const featuredResources = sortedResources.filter(resource => resource.featured)
  const regularResources = sortedResources.filter(resource => !resource.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 hex-pattern-accent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl mb-6">
              Resource Library
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-700 font-medium text-balance">
              Discover books, articles, videos, and tools that will expand your understanding 
              of collective intelligence and collaborative practices.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#fda932] w-5 h-5" strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#fda932]/30 focus:border-[#fda932] bg-white shadow-md hover:shadow-lg text-base font-medium"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swarm-gold-500 focus:border-transparent"
                >
                  <option value="featured">Featured First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="year">Most Recent</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {resourceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-5 py-2.5 rounded-full text-base font-bold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-br from-[#fda932] to-[#fcc530] text-white shadow-xl'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 hover:border-[#fda932]'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
                Featured Resources
              </h2>
              <p className="mt-4 text-xl text-gray-700 font-medium">
                Hand-picked resources that our community highly recommends.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {featuredResources.map((resource) => {
                const Icon = getTypeIcon(resource.type)
                return (
                  <div
                    key={resource.id}
                    className="group bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-[#fda932]/30 hover:shadow-2xl hover:shadow-[#fda932]/10 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fda932]/5 via-transparent to-[#fda932]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-4 rounded-2xl ${getTypeColor(resource.type)} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                            <Icon className="w-7 h-7" />
                          </div>
                          <div>
                            <span className={`text-sm font-bold ${getTypeColor(resource.type).split(' ')[1]} tracking-wide uppercase`}>
                              {resource.type.toUpperCase()}
                            </span>
                            <div className="flex items-center mt-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-semibold text-gray-600">{resource.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#fda932]/10">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </Button>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#fda932] transition-colors duration-300 leading-tight">
                        {resource.title}
                      </h3>
                      
                      <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                        by {resource.author} • {resource.year}
                      </p>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed text-base">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {resource.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-gray-100 hover:bg-[#fda932]/10 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-[#fda932] transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center">
                        <Button size="lg" asChild className="bg-gradient-to-r from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            View Resource
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Resources */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
                All Resources
              </h2>
              <p className="mt-4 text-xl text-gray-700 font-medium">
                Browse our complete collection of resources organized by type and topic.
              </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularResources.map((resource) => {
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
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <span className={`text-xs font-bold ${getTypeColor(resource.type).split(' ')[1]} tracking-wide uppercase`}>
                              {resource.type.toUpperCase()}
                            </span>
                          <div className="flex items-center mt-1.5">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                            <span className="ml-1 text-xs font-semibold text-gray-600">{resource.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#fda932]/10">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#fda932] transition-colors duration-300 leading-tight line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                      by {resource.author} • {resource.year}
                    </p>
                    
                    <p className="text-gray-700 text-sm mb-5 leading-relaxed line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-gray-100 hover:bg-[#fda932]/10 px-2.5 py-1 text-xs font-medium text-gray-700 hover:text-[#fda932] transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                          +{resource.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center">
                      <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          View Resource
                          <ExternalLink className="ml-2 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {filteredResources.length === 0 && (
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#fda932] via-[#fcc530] to-[#fdaa32] gradient-animate">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black text-white sm:text-5xl mb-6">
              Have a Resource to Share?
            </h2>
            <p className="mt-4 text-xl text-white font-medium">
              Help us grow our library by suggesting resources that have helped you 
              understand collective intelligence and collaboration.
            </p>
            
            <div className="mt-10">
              <Button size="lg" className="bg-white text-[#fda932] hover:bg-gray-50 font-black text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
                Suggest a Resource
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
