import { NextResponse } from 'next/server'

// Substack podcast RSS feed URL
const SUBSTACK_RSS_URL = 'https://joshketry.substack.com/podcast/feed'

// Parse RSS feed and extract podcast episodes
async function fetchSubstackEpisodes() {
  try {
    const response = await fetch(SUBSTACK_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SwarmAcademy/1.0)'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch Substack RSS: ${response.status}`)
    }

    const xmlText = await response.text()
    
    // Parse XML to extract episode data
    const episodes = parseRSSFeed(xmlText)
    
    return episodes
  } catch (error) {
    console.error('Error fetching Substack episodes:', error)
    throw error
  }
}

// Simple RSS parser for podcast episodes
function parseRSSFeed(xmlText: string) {
  const episodes: any[] = []
  
  // Extract items from RSS feed
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match
  
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemXml = match[1]
    
    // Extract title
    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)
    const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : 'Untitled Episode'
    
    // Extract description
    const descriptionMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/)
    const description = descriptionMatch ? (descriptionMatch[1] || descriptionMatch[2]) : ''
    
    // Extract pubDate
    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)
    const pubDate = pubDateMatch ? pubDateMatch[1] : new Date().toISOString()
    
    // Extract enclosure (audio URL)
    const enclosureMatch = itemXml.match(/<enclosure[^>]*url="([^"]*)"[^>]*type="audio\/[^"]*"[^>]*\/>/)
    const audioUrl = enclosureMatch ? enclosureMatch[1] : ''
    
    // Extract link
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/)
    const link = linkMatch ? linkMatch[1] : ''
    
    // Extract GUID
    const guidMatch = itemXml.match(/<guid[^>]*>(.*?)<\/guid>/)
    const guid = guidMatch ? guidMatch[1] : link
    
    // Only include episodes that have audio content
    if (audioUrl) {
      episodes.push({
        id: guid,
        title: title.trim(),
        description: description.trim().replace(/<[^>]*>/g, ''), // Remove HTML tags
        duration: 0, // Substack doesn't provide duration in RSS
        publishedAt: new Date(pubDate).toISOString().split('T')[0],
        audioUrl: audioUrl,
        imageUrl: '', // Substack doesn't provide episode images in RSS
        category: 'Collective Intelligence',
        featured: false,
        spotifyUrl: link,
        explicit: false,
        language: 'en',
        source: 'substack'
      })
    }
  }
  
  return episodes
}

export async function GET() {
  try {
    console.log('Fetching Substack podcast data...')
    
    const episodes = await fetchSubstackEpisodes()
    
    return NextResponse.json({
      episodes,
      total: episodes.length,
      source: 'substack'
    })
    
  } catch (error) {
    console.error('Error in Substack podcast API:', error)
    
    // Return empty array as fallback
    return NextResponse.json({
      episodes: [],
      total: 0,
      source: 'substack',
      error: 'Failed to fetch Substack episodes'
    })
  }
}
