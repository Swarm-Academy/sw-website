'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Users, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message and wewe'llapos;ll get back to you within 24 hours.",
    contact: "hello@swarmacademy.com",
    action: "mailto:hello@swarmacademy.com"
  },
  {
    icon: MessageCircle,
    title: "Join the Forum",
    description: "Connect with our community and participate in discussions.",
    contact: "community.swarmacademy.com",
    action: "/forum"
  },
  {
    icon: Users,
    title: "Partner With Us",
    description: "Interested in collaboration? Let's explore opportunities together.",
    contact: "partnerships@swarmacademy.com",
    action: "mailto:partnerships@swarmacademy.com"
  }
]

const faqs = [
  {
    question: "How can I join the Swarm Academy community?",
    answer: "You can join our community by subscribing to our newsletter, participating in our forum discussions, or attending our virtual events. Simply visit our forum page to get started."
  },
  {
    question: "Is there a cost to participate?",
    answer: "Most of our content and community features are free to access. We do offer premium memberships for exclusive content and advanced collaboration tools, but the core community experience is open to everyone."
  },
  {
    question: "How often do you publish new podcast episodes?",
    answer: "We publish new podcast episodes every two weeks, featuring conversations with thought leaders, researchers, and community members about collective intelligence and collaboration."
  },
  {
    question: "Can I contribute content to Swarm Academy?",
    answer: "Absolutely! We welcome contributions from our community. You can submit articles, suggest podcast topics, or propose collaborative projects through our forum or by contacting us directly."
  },
  {
    question: "Do you offer educational resources for organizations?",
    answer: "Yes, we provide workshops, training programs, and consulting services for organizations looking to implement collective intelligence practices. Contact our partnerships team to learn more."
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fda932] via-[#fcc530] to-[#fdaa32] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-[#fda932]" strokeWidth={2} />
          </div>
          <h1 className="text-4xl font-black text-white mb-6">
            Message Sent Successfully!
          </h1>
          <p className="text-white text-xl font-medium mb-8">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="bg-white text-[#fda932] hover:bg-gray-50 font-bold text-lg px-8 py-4 shadow-xl">
            Send Another Message
          </Button>
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
              Get in Touch
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-700 font-medium text-balance">
              Have a question, idea, or want to collaborate? We'd love to hear from you. 
              Reach out and let's start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-md border-2 border-gray-100 hover:shadow-2xl hover:shadow-orange-200/40 hover:border-[#fda932] transition-all duration-300 hover-glow">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#fda932] to-[#fcc530] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {method.title}
                  </h3>
                  <p className="text-gray-700 mb-6 font-medium text-base leading-relaxed">
                    {method.description}
                  </p>
                  <a
                    href={method.action}
                    className="text-[#fda932] font-bold hover:text-[#fd9d31] transition-colors duration-200 text-lg"
                  >
                    {method.contact}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
                Send us a Message
              </h2>
              <p className="mt-4 text-xl text-gray-700 font-medium">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#fda932]/30 focus:border-[#fda932] bg-white shadow-sm hover:shadow-md text-base font-medium"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-[#fda932]/30 focus:border-[#fda932] bg-white shadow-sm hover:shadow-md text-base font-medium"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swarm-gold-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership</option>
                  <option value="media">Media/Press</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="mt-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swarm-gold-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swarm-gold-500 focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-br from-[#fda932] to-[#fcc530] hover:from-[#fd9d31] hover:to-[#fda932] text-white border-0 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 text-lg font-bold px-8 py-6"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-3 h-6 w-6" strokeWidth={2.5} />
                      Send Message
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-xl text-gray-700 font-medium">
                Can't find what you're looking for? Send us a message above.
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b-2 border-gray-200 pb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base font-medium">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
