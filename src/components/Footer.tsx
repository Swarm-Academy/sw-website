import Link from 'next/link'
import { Podcast, BookOpen, Library, MessageCircle, Users, Twitter, Linkedin, Github } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Podcast', href: '/podcast', icon: Podcast },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Resources', href: '/resources', icon: Library },
    { name: 'Forum', href: '/forum', icon: MessageCircle },
    { name: 'About', href: '/about', icon: Users },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: Github,
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-swarm-dark-900 to-gray-900 relative overflow-hidden">
      {/* Subtle hexagon pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="hex-pattern h-full w-full" style={{ filter: 'invert(1)' }} />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8 relative z-10">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.social.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-[#fda932] transition-all duration-300 transform hover:scale-110"
                aria-label={item.name}
              >
                <Icon className="h-6 w-6" />
              </a>
            )
          })}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <div className="flex items-center">
              <img 
                src="/swarm-academy-logo.svg" 
                alt="Swarm Academy Logo" 
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Swarm Academy. All rights reserved.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap justify-center space-x-6 md:justify-start">
            {navigation.main.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-gray-400 hover:text-[#fda932] transition-all duration-300 transform hover:translate-x-1"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex flex-col items-center space-y-2 text-center text-sm text-gray-400 md:flex-row md:justify-between md:space-y-0">
            <p>
              Empowering collective intelligence through knowledge sharing and collaboration.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-[#fda932] transition-colors duration-200 font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#fda932] transition-colors duration-200 font-medium">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-[#fda932] transition-colors duration-200 font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
