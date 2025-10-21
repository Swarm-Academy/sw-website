'use client'

import { useEffect, useMemo, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
}

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  className?: string
}

export default function FloatingParticles({
  count = 20,
  colors = ['#fef08a', '#bfdbfe', '#fde047'],
  className = ''
}: FloatingParticlesProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  // Memoize colors to prevent infinite re-renders
  const memoizedColors = useMemo(() => colors, [colors])

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Generate particles only when dimensions or count changes
  const particles = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return []

    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.6 + 0.2,
        color: memoizedColors[Math.floor(Math.random() * memoizedColors.length)]
      })
    }
    return newParticles
  }, [dimensions.width, dimensions.height, count, memoizedColors])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )
}
