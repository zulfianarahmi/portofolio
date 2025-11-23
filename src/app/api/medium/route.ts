import { NextResponse } from 'next/server'

interface MediumArticle {
  title: string
  link: string
  pubDate: string
  content: string
  contentSnippet?: string
  guid?: string
}

export async function GET() {
  try {
    // Medium RSS feed format: https://medium.com/feed/@username
    const mediumUsername = 'zulfianarahmi4'
    // Try multiple RSS feed URL formats
    const rssUrls = [
      `https://medium.com/feed/@${mediumUsername}`,
      `https://${mediumUsername}.medium.com/feed`,
      `https://medium.com/@${mediumUsername}/feed`
    ]
    
    let xmlText = ''
    let lastError: Error | null = null
    
    // Try each URL format until one works
    for (const rssUrl of rssUrls) {
      try {
        console.log(`Trying RSS feed URL: ${rssUrl}`)
        // Fetch RSS feed with no cache for real-time updates
        const response = await fetch(rssUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          },
          cache: 'no-store' // No caching for real-time updates
        })

        if (response.ok) {
          xmlText = await response.text()
          console.log(`Successfully fetched RSS feed from: ${rssUrl}`)
          break
        } else {
          console.warn(`Failed to fetch from ${rssUrl}: ${response.statusText}`)
        }
      } catch (err) {
        lastError = err as Error
        console.warn(`Error fetching from ${rssUrl}:`, err)
        continue
      }
    }
    
    if (!xmlText) {
      throw lastError || new Error('Failed to fetch RSS feed from all URL formats')
    }
    
    // Parse RSS XML manually
    const articles = parseRSSFeed(xmlText)
    
    // Limit to 6 most recent articles
    const recentArticles = articles.slice(0, 6).map(article => ({
      title: article.title,
      url: article.link,
      description: extractDescription(article.content || article.contentSnippet || ''),
      date: formatDate(article.pubDate),
      category: extractCategory(article.title)
    }))

    return NextResponse.json({ articles: recentArticles }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching Medium articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles', articles: [] },
      { status: 500 }
    )
  }
}

function parseRSSFeed(xmlText: string): MediumArticle[] {
  const articles: MediumArticle[] = []
  
  // Extract all <item> tags
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  const items = xmlText.match(itemRegex) || []
  
  items.forEach(item => {
    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/i)
    const linkMatch = item.match(/<link>(.*?)<\/link>/i)
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/i)
    const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i)
    const descriptionMatch = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i)
    
    if (titleMatch && linkMatch) {
      articles.push({
        title: titleMatch[1] || titleMatch[2] || '',
        link: linkMatch[1] || '',
        pubDate: pubDateMatch ? pubDateMatch[1] : new Date().toISOString(),
        content: contentMatch ? contentMatch[1] : (descriptionMatch ? descriptionMatch[1] : ''),
        contentSnippet: descriptionMatch ? descriptionMatch[1] : ''
      })
    }
  })
  
  // Sort by date (newest first)
  articles.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime()
    const dateB = new Date(b.pubDate).getTime()
    return dateB - dateA
  })
  
  return articles
}

function extractDescription(content: string): string {
  // Remove HTML tags
  let text = content.replace(/<[^>]*>/g, '')
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ')
  text = text.replace(/&amp;/g, '&')
  text = text.replace(/&lt;/g, '<')
  text = text.replace(/&gt;/g, '>')
  text = text.replace(/&quot;/g, '"')
  text = text.replace(/&#39;/g, "'")
  
  // Get first 150 characters
  const snippet = text.trim().substring(0, 150)
  return snippet.length < text.length ? snippet + '...' : snippet
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  } catch {
    return 'Recent'
  }
}

function extractCategory(title: string): string {
  const titleLower = title.toLowerCase()
  
  if (titleLower.includes('vapt') || titleLower.includes('penetration') || titleLower.includes('owasp')) {
    return 'Penetration Testing'
  }
  if (titleLower.includes('phishing') || titleLower.includes('machine learning') || titleLower.includes('ml')) {
    return 'Machine Learning'
  }
  if (titleLower.includes('chatbot') || titleLower.includes('automation') || titleLower.includes('telegram')) {
    return 'Automation'
  }
  if (titleLower.includes('workflow') || titleLower.includes('n8n') || titleLower.includes('security operations') || titleLower.includes('secops')) {
    return 'Security Operations'
  }
  if (titleLower.includes('malware') || titleLower.includes('reverse engineering')) {
    return 'Malware Analysis'
  }
  if (titleLower.includes('network') || titleLower.includes('reconnaissance')) {
    return 'Network Security'
  }
  if (titleLower.includes('cryptography') || titleLower.includes('crypto')) {
    return 'Cryptography'
  }
  if (titleLower.includes('incident') || titleLower.includes('response') || titleLower.includes('triage')) {
    return 'Incident Response'
  }
  
  return 'Cybersecurity'
}
