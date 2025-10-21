import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if environment variables are loaded
    const hasClientId = !!process.env.SPOTIFY_CLIENT_ID
    const hasClientSecret = !!process.env.SPOTIFY_CLIENT_SECRET
    
    if (!hasClientId || !hasClientSecret) {
      return NextResponse.json({
        success: false,
        error: 'Missing Spotify credentials',
        hasClientId,
        hasClientSecret
      })
    }

    // Test Spotify API connection
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({
        success: false,
        error: 'Failed to authenticate with Spotify',
        status: response.status,
        details: errorText
      })
    }

    const tokenData = await response.json()
    
    // Test fetching the podcast show
    const showResponse = await fetch(`https://api.spotify.com/v1/shows/6Qr2KclA2z4YOfuaX1kLcB?market=US`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    if (!showResponse.ok) {
      const errorText = await showResponse.text()
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch podcast show',
        status: showResponse.status,
        details: errorText
      })
    }

    const showData = await showResponse.json()

    return NextResponse.json({
      success: true,
      message: 'Spotify integration working!',
      show: {
        name: showData.name,
        description: showData.description,
        total_episodes: showData.total_episodes,
        publisher: showData.publisher
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
