# Swarm Academy Website

A modern, dynamic website for Swarm Academy - a platform dedicated to collective intelligence, community building, and collaborative learning. This website features real-time content integration, dynamic podcast and blog feeds, and a comprehensive resource library.

## 🚀 Key Features

### 🎧 **Dynamic Podcast Integration**
- **Spotify API Integration**: Real-time podcast episodes from Spotify
- **Substack RSS Integration**: Automatic podcast episode fetching from Substack
- **Combined Feed**: Unified podcast experience from multiple sources
- **Smart Filtering**: Automatic detection and filtering of podcast content
- **Source Attribution**: Clear indication of content source (Spotify/Substack)
- **Responsive Design**: Optimized podcast cards for all screen sizes

### 📝 **Dynamic Blog Integration**
- **Substack RSS Integration**: Real-time blog post fetching from Substack
- **Automatic Categorization**: Smart content categorization based on keywords
- **Image Extraction**: Automatic thumbnail extraction from blog content
- **Read Time Calculation**: Automatic reading time estimation
- **Content Filtering**: Separation of blog posts from podcast episodes
- **Dynamic Categories**: Auto-generated categories based on content

### 📚 **Comprehensive Resource Library**
- **Curated Content**: Hand-picked resources from Swarm Academy
- **Multiple Categories**: Books, Articles, Videos, Case Studies
- **External Linking**: Direct links to original resources
- **Search & Filter**: Advanced filtering and search functionality
- **Rating System**: Community-driven resource ratings
- **Featured Resources**: Highlighted premium content

### 🎨 **Advanced UI/UX Features**
- **Dynamic Gradients**: Random gradient backgrounds for visual variety
- **Hover Effects**: Sophisticated hover animations and transitions
- **Mobile-First Design**: Fully responsive across all devices
- **Loading States**: Elegant loading indicators and error handling
- **Video Integration**: Local video player with custom controls
- **Interactive Elements**: Engaging micro-interactions throughout

### 🔧 **Technical Excellence**
- **TypeScript**: Full type safety throughout the application
- **Custom Hooks**: Reusable data fetching and state management
- **API Routes**: Server-side data processing and caching
- **Error Handling**: Comprehensive error states and fallbacks
- **Performance**: Optimized loading and rendering
- **SEO Ready**: Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout
- **Icons**: Lucide React
- **Animations**: CSS animations and transitions
- **RSS Parsing**: rss-parser for Substack integration
- **API Integration**: Spotify Web API, Substack RSS feeds
- **State Management**: React hooks and custom hooks
- **Deployment**: Vercel-ready

## 🎨 Design System

### Colors
- **Swarm Gold**: Primary brand color (#eab308)
- **Swarm Blue**: Secondary brand color (#3b82f6)
- **Swarm Dark**: Text and accents (#0f172a)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Display Font**: Cal Sans (for headings)

### Components
- Consistent button styles with variants
- Accessible form components
- Responsive grid layouts
- Custom utility classes

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── podcast/       # Podcast data API (Spotify + Substack)
│   │   └── blog/          # Blog data API (Substack RSS)
│   ├── about/             # About page
│   ├── blog/              # Dynamic blog listing page
│   ├── contact/           # Contact page
│   ├── forum/             # Forum page
│   ├── podcast/           # Dynamic podcast page
│   ├── resources/         # Curated resources page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage with dynamic content
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, etc.)
│   ├── Header.tsx        # Site header with navigation
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Homepage hero with video player
│   ├── PodcastSection.tsx # Dynamic podcast section
│   ├── BlogSection.tsx   # Dynamic blog section
│   ├── ResourcesSection.tsx # Curated resources section
│   ├── NewsletterSection.tsx # Newsletter signup
│   └── FloatingParticles.tsx # Background animations
├── hooks/                 # Custom React hooks
│   ├── usePodcast.ts     # Podcast data fetching hook
│   └── useBlog.ts        # Blog data fetching hook
└── lib/                  # Utility functions
    └── utils.ts          # Common utilities + gradient generator
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd swarm-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Setup

For full functionality, create a `.env.local` file in the root directory:

```bash
# Spotify API credentials (for podcast integration)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Substack RSS feeds (automatically configured)
# Podcast: https://joshketry.substack.com/feed
# Blog: https://joshketry.substack.com/feed
```

**Note**: The website works without Spotify credentials, but podcast integration will be limited to Substack content only.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Pages

### Homepage (`/`)
- **Dynamic Hero Section**: Video player with "The Connection Engine" content
- **Live Podcast Feed**: Real-time episodes from Spotify and Substack
- **Live Blog Feed**: Latest posts from Substack with dynamic categorization
- **Curated Resources**: Hand-picked educational content
- **Newsletter Integration**: Email signup with validation
- **Mobile-Optimized**: Responsive design with touch-friendly interactions

### Podcast (`/podcast`)
- **Multi-Source Integration**: Combined Spotify and Substack episodes
- **Smart Filtering**: Automatic podcast detection and filtering
- **Source Attribution**: Clear indication of content origin
- **Dynamic Categories**: Auto-generated based on content
- **External Links**: Direct links to Spotify/Substack
- **Responsive Cards**: Optimized for all screen sizes

### Blog (`/blog`)
- **Dynamic Content**: Real-time posts from Substack RSS
- **Smart Categorization**: Automatic keyword-based categorization
- **Image Extraction**: Automatic thumbnail generation
- **Read Time**: Calculated reading time estimates
- **Search & Filter**: Advanced content discovery
- **External Links**: Direct links to Substack posts

### Resources (`/resources`)
- **Curated Library**: Hand-picked educational resources
- **Multiple Categories**: Books, Articles, Videos, Case Studies
- **External Integration**: Direct links to original sources
- **Advanced Search**: Filter by type, category, and keywords
- **Rating System**: Community-driven resource ratings
- **Featured Content**: Highlighted premium resources

### About (`/about`)
- Mission and values
- Team information
- Storytelling content
- Statistics and impact
- Call-to-action sections

### Contact (`/contact`)
- Contact form with validation
- Multiple contact methods
- FAQ section
- Form submission handling


## 🔧 Customization

### Adding New Pages
1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Import and use existing components
4. Follow the established design patterns

### Modifying Colors
Update the color palette in `tailwind.config.ts`:
```typescript
colors: {
  swarm: {
    gold: { /* color values */ },
    blue: { /* color values */ },
    dark: { /* color values */ }
  }
}
```

### Adding Components
1. Create component file in `src/components/`
2. Use TypeScript interfaces for props
3. Follow accessibility guidelines
4. Include proper ARIA labels

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance (WCAG AA)
- Screen reader optimization
- Alt text for images

## 🚀 Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for below-the-fold content
- Code splitting and tree shaking
- CSS optimization
- Font optimization
- Bundle size optimization

## 🔌 Dynamic Content Integration

### 🎧 Podcast Integration
- **Spotify Web API**: Real-time episode fetching with authentication
- **Substack RSS**: Automatic podcast episode detection and parsing
- **Smart Filtering**: Distinguishes between podcast and blog content
- **Image Processing**: Automatic thumbnail extraction and filtering
- **Source Attribution**: Clear indication of content origin
- **Fallback Handling**: Graceful degradation when APIs are unavailable

### 📝 Blog Integration
- **Substack RSS**: Real-time blog post fetching
- **Content Parsing**: Automatic extraction of titles, descriptions, and metadata
- **Image Extraction**: Smart thumbnail detection from content
- **Categorization**: Keyword-based automatic categorization
- **Read Time**: Calculated based on content length
- **Content Filtering**: Separation of blog posts from podcast episodes

### 🔧 API Architecture
- **Server-Side Processing**: All external API calls handled server-side
- **Caching**: Efficient data caching to reduce API calls
- **Error Handling**: Comprehensive error states and fallbacks
- **Rate Limiting**: Built-in protection against API rate limits
- **Data Transformation**: Consistent data format across all sources

### 📊 Data Flow
1. **Client Request**: User visits page
2. **API Route**: Server-side data fetching
3. **External APIs**: Spotify and Substack integration
4. **Data Processing**: Parsing, filtering, and transformation
5. **Client Delivery**: Formatted data sent to frontend
6. **UI Rendering**: Dynamic content display

## 📈 Analytics & SEO

- Meta tags for social sharing
- Open Graph tags
- Twitter Card support
- Structured data ready
- Sitemap generation ready
- Analytics integration points

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Other Platforms
The site is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting platform

## ✨ Recent Features & Improvements

### 🎨 **UI/UX Enhancements**
- **Dynamic Gradients**: Random gradient backgrounds for visual variety
- **Mobile Optimization**: Fixed hero section buttons for mobile devices
- **Hover Effects**: Enhanced card interactions and animations
- **Loading States**: Elegant loading indicators and error handling
- **Responsive Design**: Improved mobile and tablet layouts

### 🔧 **Technical Improvements**
- **Custom Hooks**: `usePodcast` and `useBlog` for data management
- **Type Safety**: Full TypeScript interfaces for all data structures
- **Error Handling**: Comprehensive error states and fallbacks
- **Performance**: Optimized API calls and data processing
- **Code Organization**: Clean separation of concerns and reusable components

### 📱 **Mobile Experience**
- **Touch-Friendly**: Optimized button sizes and spacing
- **Responsive Text**: Proper text scaling across devices
- **Mobile Navigation**: Improved header and navigation on mobile
- **Touch Interactions**: Enhanced touch feedback and interactions

## 📝 Content Management

The website now features **dynamic content integration**:

### ✅ **Currently Implemented**
- **Real-time Podcast Feeds**: Spotify + Substack integration
- **Live Blog Content**: Substack RSS integration
- **Automatic Updates**: New content appears automatically
- **Smart Categorization**: AI-powered content organization
- **Image Processing**: Automatic thumbnail extraction

### 🔮 **Future Enhancements**
1. **CMS Integration**: Connect to a headless CMS (Strapi, Contentful, Sanity)
2. **User-Generated Content**: Community contributions and reviews
3. **Advanced Analytics**: Content performance tracking
4. **Content Scheduling**: Planned content releases

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Data Sources & Integrations

### 📡 **External APIs**
- **Spotify Web API**: Podcast episode data and metadata
- **Substack RSS**: Blog posts and podcast episodes via RSS feeds
- **Joshua Ketry's Substack**: Primary content source (https://joshketry.substack.com/)

### 🎯 **Content Sources**
- **Podcast Episodes**: Combined from Spotify and Substack
- **Blog Posts**: Exclusively from Substack RSS feed
- **Resources**: Curated by Swarm Academy team
- **Video Content**: Local video files (The Connection Engine)

### 🔄 **Update Frequency**
- **Real-time**: Content updates automatically when published
- **RSS Refresh**: Substack content refreshed on each page load
- **Spotify Sync**: Podcast episodes synced via API calls
- **Manual Curation**: Resources updated manually by team

## 🆘 Support

For questions or support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team

## 📊 **Website Statistics**
- **Dynamic Content**: 100% real-time integration
- **Mobile Responsive**: Optimized for all devices
- **Performance**: Fast loading with optimized assets
- **Accessibility**: WCAG compliant design
- **SEO Ready**: Meta tags and structured data

---

Built with ❤️ for the Swarm Academy community

**Last Updated**: January 2025