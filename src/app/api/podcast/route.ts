import { NextRequest, NextResponse } from 'next/server'

// Spotify API configuration
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_SHOW_ID = process.env.SPOTIFY_SHOW_ID || '6Qr2KclA2z4YOfuaX1kLcB' // From the URL you provided

// Substack RSS feed URL (confirmed working)
const SUBSTACK_RSS_URL = 'https://joshketry.substack.com/feed'

// Get Spotify access token
async function getSpotifyAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    body: 'grant_type=client_credentials'
  })

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token')
  }

  const data = await response.json()
  return data.access_token
}

// Fetch podcast episodes from Spotify
async function getPodcastEpisodes() {
  try {
    const accessToken = await getSpotifyAccessToken()
    
    const response = await fetch(`https://api.spotify.com/v1/shows/${SPOTIFY_SHOW_ID}/episodes?market=US&limit=50`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch podcast episodes')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching podcast episodes:', error)
    throw error
  }
}

// Fetch podcast episodes from Substack RSS
async function getSubstackEpisodes() {
  try {
    console.log(`Fetching from Substack RSS: ${SUBSTACK_RSS_URL}`)
    const response = await fetch(SUBSTACK_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SwarmAcademy/1.0)'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch Substack RSS: ${response.status}`)
    }

    const xmlText = await response.text()
    const episodes = parseRSSFeed(xmlText)
    console.log(`Successfully fetched ${episodes.length} episodes from Substack`)
    return episodes
  } catch (error) {
    console.error('Error fetching Substack episodes:', error)
    return []
  }
}

// Enhanced RSS parser for podcast episodes
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
    
    // Extract enclosure (audio URL) - try multiple patterns, but only for actual audio files
    const enclosurePatterns = [
      /<enclosure[^>]*url="([^"]*)"[^>]*type="audio\/[^"]*"[^>]*\/>/,
      /<enclosure[^>]*type="audio\/[^"]*"[^>]*url="([^"]*)"[^>]*\/>/
    ]
    
    let audioUrl = ''
    for (const pattern of enclosurePatterns) {
      const enclosureMatch = itemXml.match(pattern)
      if (enclosureMatch) {
        const url = enclosureMatch[1]
        // Only accept URLs that are actually audio files
        if (url.includes('.mp3') || url.includes('.m4a') || url.includes('.wav') || url.includes('.ogg')) {
          audioUrl = url
          break
        }
      }
    }

    // Extract image URL from content - look for images in the description/content
    const imagePatterns = [
      /<img[^>]*src="([^"]*)"[^>]*\/>/g,
      /<media:thumbnail[^>]*url="([^"]*)"[^>]*\/>/g,
      /<itunes:image[^>]*href="([^"]*)"[^>]*\/>/g
    ]
    
    let imageUrl = ''
    let allImages: string[] = []
    
    // Extract all images from the main content
    for (const pattern of imagePatterns) {
      let match
      while ((match = pattern.exec(itemXml)) !== null) {
        allImages.push(match[1])
      }
    }
    
    // Look for images in the description content
    const descriptionImagePattern = /<img[^>]*src="([^"]*)"[^>]*\/>/g
    let descMatch
    while ((descMatch = descriptionImagePattern.exec(description)) !== null) {
      allImages.push(descMatch[1])
    }
    
    // Look for images in the content:encoded section (this is where Substack puts the main images)
    const contentEncodedMatch = itemXml.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/)
    if (contentEncodedMatch) {
      const contentEncoded = contentEncodedMatch[1]
      const contentImagePattern = /<img[^>]*src="([^"]*)"[^>]*\/>/g
      let contentMatch
      while ((contentMatch = contentImagePattern.exec(contentEncoded)) !== null) {
        allImages.push(contentMatch[1])
      }
    }
    
    
    // Filter out only the specific problematic political cartoon image
    const goodImages = allImages.filter(img => {
      // Only filter out the specific political cartoon image you mentioned
      return !img.includes('c2e331a0-b886-43d5-9593-4d7b8907ede8')
    })
    
    // Select the best image (prefer larger ones)
    if (goodImages.length > 0) {
      // Sort by preference: larger images first, then by position in content
      goodImages.sort((a, b) => {
        const aSize = a.match(/(\d+)x(\d+)/)
        const bSize = b.match(/(\d+)x(\d+)/)
        
        if (aSize && bSize) {
          const aArea = parseInt(aSize[1]) * parseInt(aSize[2])
          const bArea = parseInt(bSize[1]) * parseInt(bSize[2])
          return bArea - aArea
        }
        
        return 0
      })
      
      imageUrl = goodImages[0]
    }
    
    // Extract link
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/)
    const link = linkMatch ? linkMatch[1] : ''
    
    // Extract GUID
    const guidMatch = itemXml.match(/<guid[^>]*>(.*?)<\/guid>/)
    const guid = guidMatch ? guidMatch[1] : link
    
    // Check if this is a podcast episode (look for audio or podcast-related keywords)
    const isPodcast = audioUrl || 
                     title.toLowerCase().includes('podcast') ||
                     description.toLowerCase().includes('podcast') ||
                     itemXml.toLowerCase().includes('audio')
    
    if (isPodcast) {
        episodes.push({
          id: `substack-${guid}`,
          title: title.trim(),
          description: description.trim().replace(/<[^>]*>/g, ''), // Remove HTML tags
          duration: 0, // Substack doesn't provide duration in RSS
          publishedAt: new Date(pubDate).toISOString().split('T')[0],
          audioUrl: audioUrl,
          imageUrl: imageUrl, // Use filtered image URL or empty string
          category: 'Collective Intelligence',
          featured: false,
          spotifyUrl: link,
          explicit: false,
          language: 'en',
          source: 'substack'
        })
    }
  }
  
  console.log(`Parsed ${episodes.length} podcast episodes from RSS feed`)
  return episodes
}

// Transform Spotify episode data to our format
function transformEpisodeData(spotifyEpisode: any, index: number) {
  return {
    id: `spotify-${spotifyEpisode.id}`,
    title: spotifyEpisode.name,
    description: spotifyEpisode.description || spotifyEpisode.name,
    duration: Math.floor(spotifyEpisode.duration_ms / 1000), // Convert to seconds
    publishedAt: spotifyEpisode.release_date,
    audioUrl: spotifyEpisode.external_urls?.spotify || '',
    imageUrl: spotifyEpisode.images?.[0]?.url || '',
    category: 'Science', // Default category, you can customize this
    featured: index === 0, // Make first episode featured
    spotifyUrl: spotifyEpisode.external_urls?.spotify || '',
    explicit: spotifyEpisode.explicit || false,
    language: spotifyEpisode.language || 'en',
    source: 'spotify'
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching podcast data from multiple sources...')
    
    const allEpisodes: any[] = []
    const sources: string[] = []
    
    // Fetch from Substack
    try {
      console.log('Fetching from Substack...')
      const substackEpisodes = await getSubstackEpisodes()
      allEpisodes.push(...substackEpisodes)
      sources.push('substack')
      console.log(`Found ${substackEpisodes.length} Substack episodes`)
    } catch (error) {
      console.error('Failed to fetch Substack episodes:', error)
    }
    
    // Fetch from Spotify (if credentials available)
    if (SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET) {
      try {
        console.log('Fetching from Spotify...')
        const spotifyData = await getPodcastEpisodes()
        const spotifyEpisodes = spotifyData.items.map((episode: any, index: number) => 
          transformEpisodeData(episode, index)
        )
        allEpisodes.push(...spotifyEpisodes)
        sources.push('spotify')
        console.log(`Found ${spotifyEpisodes.length} Spotify episodes`)
      } catch (error) {
        console.error('Failed to fetch Spotify episodes:', error)
      }
    } else {
      console.log('Spotify credentials not found, skipping Spotify')
    }
    
    // If no episodes found from any source, use mock data
    if (allEpisodes.length === 0) {
      console.log('No episodes found, using mock data')
      const mockEpisodes = [
        {
          id: 'mock-1',
          title: "Help Us Build One Of Tim Urban's Genies - Welcome to Swarm Academy",
          description: "In this episode we introduce the idea of running systems of people using a newly enhanced form of epistemology known as collective 'swarm' intelligence. We also explain how the principles in Tim Urban's book 'What's Our Problem?' teach us how to make what he calls 'genies' (but we just call groups of high trust problem solvers).",
          duration: 360, // 6 minutes
          publishedAt: "2024-06-01",
          audioUrl: "",
          imageUrl: "",
          category: "Science",
          featured: true,
          spotifyUrl: "https://open.spotify.com/show/6Qr2KclA2z4YOfuaX1kLcB?si=5c8c2cf19eb74aa4",
          explicit: false,
          language: "en",
          source: 'mock'
        }
      ]
      
      return NextResponse.json({
        episodes: mockEpisodes,
        total: mockEpisodes.length,
        sources: ['mock'],
        source: 'mock'
      })
    }
    
    // Sort episodes by publication date (newest first)
    allEpisodes.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    
    // Mark the first episode as featured
    if (allEpisodes.length > 0) {
      allEpisodes[0].featured = true
    }

    return NextResponse.json({
      episodes: allEpisodes,
      total: allEpisodes.length,
      sources: sources,
      source: sources.join(', ')
    })

  } catch (error) {
    console.error('Error in podcast API:', error)
    
    // Return mock data as fallback
    const mockEpisodes = [
      {
        id: 'fallback-1',
        title: "Help Us Build One Of Tim Urban's Genies - Welcome to Swarm Academy",
        description: "In this episode we introduce the idea of running systems of people using a newly enhanced form of epistemology known as collective 'swarm' intelligence.",
        duration: 360,
        publishedAt: "2024-06-01",
        audioUrl: "",
        imageUrl: "",
        category: "Science",
        featured: true,
        spotifyUrl: "https://open.spotify.com/show/6Qr2KclA2z4YOfuaX1kLcB?si=5c8c2cf19eb74aa4",
        explicit: false,
        language: "en",
        source: 'fallback'
      }
    ]

    return NextResponse.json({
      episodes: mockEpisodes,
      total: mockEpisodes.length,
      sources: ['fallback'],
      source: 'fallback',
      error: 'Failed to fetch from all sources, using fallback data'
    })
  }
}
