import { Users, Lightbulb, Globe, Heart, ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const values = [
  {
    icon: Users,
    title: "Inclusive Community",
    description: "We believe that the best ideas come from diverse perspectives. Our community welcomes everyone, regardless of background, experience, or expertise."
  },
  {
    icon: Lightbulb,
    title: "Collective Innovation",
    description: "By working together, we can solve problems that no individual could tackle alone. We harness the power of many minds working in harmony."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Our mission extends beyond borders. We're building a worldwide network of thinkers and doers committed to positive change."
  },
  {
    icon: Heart,
    title: "Empathy & Understanding",
    description: "True collaboration requires understanding and empathy. We foster an environment where every voice is heard and valued."
  }
]

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & Director",
    bio: "Neuroscientist and community builder with 15+ years of experience in collective intelligence research.",
    image: "/images/sarah-chen.jpg"
  },
  {
    name: "Marcus Rodriguez",
    role: "Community Lead",
    bio: "Former tech executive turned community organizer, passionate about creating inclusive spaces for collaboration.",
    image: "/images/marcus-rodriguez.jpg"
  },
  {
    name: "Dr. Elena Vasquez",
    role: "Research Director",
    bio: "Cognitive scientist specializing in group dynamics and decision-making processes in diverse teams.",
    image: "/images/elena-vasquez.jpg"
  },
  {
    name: "Alex Kim",
    role: "Technology Lead",
    bio: "Open source advocate and developer, building tools that enable seamless collaboration across distances.",
    image: "/images/alex-kim.jpg"
  }
]

const stats = [
  { number: "5,000+", label: "Community Members" },
  { number: "50+", label: "Countries Represented" },
  { number: "200+", label: "Collaborative Projects" },
  { number: "95%", label: "Member Satisfaction" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 hex-pattern-accent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl mb-6">
              About Swarm Academy
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-700 font-medium text-balance">
              We're on a mission to democratize collective intelligence and create a world where 
              everyone can contribute to solving humanity's greatest challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-8">
              Our Mission
            </h2>
            <div className="mt-8 relative">
              <Quote className="absolute -top-4 -left-4 w-16 h-16 text-[#fda932]/20" strokeWidth={1.5} />
              <blockquote className="text-2xl text-gray-800 italic leading-relaxed font-medium px-8">
                &ldquo;To harness the collective intelligence of diverse communities worldwide, 
                creating a platform where every voice matters and every idea can flourish. 
                We believe that together, we can solve problems that no individual could tackle alone.&rdquo;
              </blockquote>
              <Quote className="absolute -bottom-4 -right-4 w-16 h-16 text-[#fda932]/20 rotate-180" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
              Our Values
            </h2>
            <p className="mt-4 text-xl text-gray-700 font-medium">
              These principles guide everything we do and shape our community culture.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-md border-2 border-gray-100 hover:shadow-2xl hover:shadow-orange-200/40 hover:border-[#fda932] transition-all duration-300 hover-glow group">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#fda932] to-[#fcc530] rounded-xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#fda932] transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-base font-medium">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">
              Our Story
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Swarm Academy was born from a simple observation: the world's most complex problems 
                require solutions that transcend individual expertise. In 2020, our founder Dr. Sarah Chen 
                was working on a neuroscience research project when she realized that breakthrough insights 
                were emerging not from individual brilliance, but from the collaborative efforts of diverse teams.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                This realization sparked a question: What if we could create a platform that systematically 
                harnesses collective intelligence? What if we could democratize access to collaborative 
                problem-solving tools and methodologies?
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Starting as a small group of researchers, educators, and community builders, we began 
                experimenting with different approaches to collective intelligence. We studied how bees 
                make decisions, how open source communities self-organize, and how indigenous knowledge 
                systems preserve wisdom across generations.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Today, Swarm Academy has grown into a global community of over 5,000 members from 50+ 
                countries. We've facilitated hundreds of collaborative projects, from developing 
                sustainable agriculture solutions to creating educational resources for underserved 
                communities. Our podcast has reached millions of listeners, and our resources library 
                has become a go-to destination for anyone interested in collective intelligence.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                But wewe'reapos;re just getting started. Our vision is a world where collective intelligence 
                is not just a concept, but a fundamental way of approaching challenges and opportunities. 
                A world where every voice matters, every perspective is valued, and together we can 
                create solutions that benefit everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-[#fda932] via-[#fcc530] to-[#fdaa32] gradient-animate">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black text-white sm:text-5xl mb-6">
              Our Impact
            </h2>
            <p className="mt-4 text-xl text-white font-medium">
              Numbers tell a story, but our community's impact goes far beyond statistics.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
                <div className="text-5xl font-black text-white mb-3">
                  {stat.number}
                </div>
                <div className="text-white text-lg font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
              Meet Our Team
            </h2>
            <p className="mt-4 text-xl text-gray-700 font-medium">
              The passionate individuals who make Swarm Academy possible.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-md border-2 border-gray-100 hover:shadow-2xl hover:shadow-orange-200/40 hover:border-[#fda932] transition-all duration-300 hover-glow group">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#fda932] to-[#fcc530] rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-3xl font-black text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#fda932] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[#fda932] font-bold mb-4 text-lg">
                      {member.role}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base font-medium">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-6">
              Join Our Mission
            </h2>
            <p className="mt-4 text-xl text-gray-700 font-medium">
              Ready to be part of something bigger? Join our community and help us build 
              a more collaborative, intelligent world.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-6">
                <Link href="/forum" className="group flex items-center">
                  Join the Community
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-200" strokeWidth={3} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-3 border-gray-900 hover:border-black hover:bg-gray-50 bg-white transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-6 shadow-xl">
                <Link href="/contact" className="text-gray-900 group-hover:text-black">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
