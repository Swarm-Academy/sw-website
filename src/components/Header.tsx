'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Podcast, BookOpen, Library, MessageCircle, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Podcast', href: '/podcast', icon: Podcast },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Resources', href: '/resources', icon: Library },
  { name: 'Forum', href: 'https://forum.swarmacademy.ai/', icon: MessageCircle },
  { name: 'About', href: '/about', icon: Users },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <span className="sr-only">Swarm Academy</span>
            <div className="flex items-center space-x-3">
              <img 
                src="/swarm-academy-logo.svg" 
                alt="Swarm Academy Logo" 
                className="h-14 w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group relative text-sm font-semibold leading-6 text-gray-900 hover:text-[#fda932] transition-all duration-300 flex items-center space-x-1"
              >
                {Icon && <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-gray-600 group-hover:text-[#fda932]" />}
                <span className="relative">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fda932] group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            )
          })}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="group text-sm font-semibold leading-6 text-gray-900 hover:text-[#fda932] transition-all duration-300 flex items-center space-x-1"
          >
            <span>Contact</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      
      {/* Enhanced Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "block animate-fade-in" : "hidden")}>
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 backdrop-blur-sm px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl animate-slide-in">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Swarm Academy</span>
              <div className="flex items-center">
                <img 
                  src="/swarm-academy-logo.svg" 
                  alt="Swarm Academy Logo" 
                  className="h-12 w-auto"
                />
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center space-x-3 -mx-3 rounded-lg px-3 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 transform hover:scale-105 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {Icon && <Icon className="h-5 w-5 text-[#fda932] group-hover:text-orange-600 transition-colors duration-300" />}
                      <span className="group-hover:text-[#fda932] transition-colors duration-300">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="group -mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="group-hover:text-[#fda932] transition-colors duration-300">Contact</span>
                  <span className="text-[#fda932] group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
