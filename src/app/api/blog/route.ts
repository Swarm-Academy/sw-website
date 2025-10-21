import { NextResponse } from 'next/server'

const SUBSTACK_RSS_URL = 'https://joshketry.substack.com/feed'

// Helper function to parse RSS feed
function parseRSSFeed(xmlText: string) {
  const items = xmlText.match(/<item>[\s\S]*?<\/item>/g) || []
  
  return items.map((itemXml, index) => {
    // Extract title
    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)
    const title = titleMatch ? (titleMatch[1] || titleMatch[2]).trim() : `Blog Post ${index + 1}`
    
    // Extract description
    const descriptionMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/)
    let description = descriptionMatch ? (descriptionMatch[1] || descriptionMatch[2]) : ''
    
    // Clean up description - remove HTML tags and limit length
    description = description
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim()
    
    // Limit description length
    if (description.length > 200) {
      description = description.substring(0, 200) + '...'
    }
    
    // Extract pubDate
    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)
    const pubDate = pubDateMatch ? pubDateMatch[1] : new Date().toISOString()
    
    // Extract link
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/)
    const link = linkMatch ? linkMatch[1] : ''
    
    // Extract GUID
    const guidMatch = itemXml.match(/<guid[^>]*>(.*?)<\/guid>/)
    const guid = guidMatch ? guidMatch[1] : link
    
    // Extract image URL from content:encoded section
    const contentEncodedMatch = itemXml.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/)
    let imageUrl = ''
    
    if (contentEncodedMatch) {
      const contentEncoded = contentEncodedMatch[1]
      const imageMatch = contentEncoded.match(/<img[^>]*src="([^"]*)"[^>]*\/>/)
      if (imageMatch) {
        imageUrl = imageMatch[1]
      }
    }
    
    // Determine if this is a podcast (has audio) or blog post
    const hasAudio = itemXml.includes('<enclosure') && itemXml.includes('type="audio/')
    
    // Skip if it's a podcast episode
    if (hasAudio) {
      return null
    }
    
    // Extract tags from content or use default categories
    const tags = []
    if (description.toLowerCase().includes('collective intelligence')) tags.push('collective intelligence')
    if (description.toLowerCase().includes('decentralization')) tags.push('decentralization')
    if (description.toLowerCase().includes('transparency')) tags.push('transparency')
    if (description.toLowerCase().includes('technology')) tags.push('technology')
    if (description.toLowerCase().includes('discourse')) tags.push('discourse')
    if (description.toLowerCase().includes('problem solving')) tags.push('problem solving')
    if (description.toLowerCase().includes('post scarcity')) tags.push('post scarcity')
    
    // Default category based on content
    let category = 'General'
    if (description.toLowerCase().includes('collective intelligence')) category = 'Collective Intelligence'
    else if (description.toLowerCase().includes('decentralization')) category = 'Decentralization'
    else if (description.toLowerCase().includes('technology')) category = 'Technology'
    else if (description.toLowerCase().includes('discourse')) category = 'Discourse'
    else if (description.toLowerCase().includes('problem solving')) category = 'Problem Solving'
    
    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = description.split(' ').length
    const readTime = Math.max(1, Math.ceil(wordCount / 200))
    
    return {
      id: `substack-${guid}`,
      title,
      excerpt: description,
      author: 'Joshua Ross Ketry',
      publishedAt: new Date(pubDate).toISOString(),
      readTime: `${readTime} min read`,
      imageUrl,
      category,
      featured: index === 0, // First post is featured
      tags: tags.length > 0 ? tags : ['general'],
      link,
      source: 'substack'
    }
  }).filter(Boolean) // Remove null entries (podcast episodes)
}

// Fetch blog posts from Substack
async function getSubstackPosts() {
  try {
    console.log('Fetching from Substack RSS:', SUBSTACK_RSS_URL)
    
    const response = await fetch(SUBSTACK_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SwarmAcademy/1.0)'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch Substack RSS: ${response.status}`)
    }

    const xmlText = await response.text()
    const posts = parseRSSFeed(xmlText)
    
    console.log(`Parsed ${posts.length} blog posts from RSS feed`)
    return posts
  } catch (error) {
    console.error('Error fetching Substack posts:', error)
    return []
  }
}

export async function GET() {
  try {
    console.log('Fetching blog data from Substack...')
    
    const posts = await getSubstackPosts()
    
    if (posts.length === 0) {
      // Fallback to mock data if no posts found
      const mockPosts = [
        {
          id: 'mock-1',
          title: 'Welcome to The Society of Problem Solvers',
          excerpt: 'Using decentralization, transparency, technology and discourse to problem solve and create the best world possible. A post scarcity world.',
          author: 'Joshua Ross Ketry',
          publishedAt: new Date().toISOString(),
          readTime: '3 min read',
          imageUrl: '',
          category: 'General',
          featured: true,
          tags: ['decentralization', 'transparency', 'technology', 'discourse'],
          link: 'https://joshketry.substack.com/',
          source: 'substack'
        }
      ]
      
      return NextResponse.json({
        posts: mockPosts,
        total: mockPosts.length,
        source: 'mock',
        error: 'No blog posts found, using fallback data'
      })
    }
    
    // Sort posts by publication date (newest first)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    
    // Mark the newest post as featured
    if (posts.length > 0) {
      posts[0].featured = true
    }
    
    console.log(`Successfully fetched ${posts.length} posts from Substack`)
    
    return NextResponse.json({
      posts,
      total: posts.length,
      source: 'substack'
    })
    
  } catch (error) {
    console.error('Error in blog API:', error)
    
    return NextResponse.json({
      posts: [],
      total: 0,
      source: 'error',
      error: error.message
    }, { status: 500 })
  }
}
