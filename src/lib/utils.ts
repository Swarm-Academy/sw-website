import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function generateRandomGradient(): string {
  const gradients = [
    'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300',
    'bg-gradient-to-br from-green-100 via-green-200 to-green-300',
    'bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300',
    'bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300',
    'bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300',
    'bg-gradient-to-br from-red-100 via-red-200 to-red-300',
    'bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300',
    'bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300',
    'bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300',
    'bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300',
    'bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300',
    'bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300',
  ]
  const randomIndex = Math.floor(Math.random() * gradients.length)
  return gradients[randomIndex]
}
