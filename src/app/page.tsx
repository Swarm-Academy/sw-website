import Hero from '@/components/Hero'
import PodcastSection from '@/components/PodcastSection'
import BlogSection from '@/components/BlogSection'
import ResourcesSection from '@/components/ResourcesSection'
import NewsletterSection from '@/components/NewsletterSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <PodcastSection />
      <BlogSection />
      <ResourcesSection />
      <NewsletterSection />
    </div>
  )
}
