import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the static routes to generate SEO pages for
const routes = [
  {
    path: '/',
    title: '🔴 Live: Indiana Fever Game Score Today - Real-Time WNBA Stats',
    description: 'Get the live Indiana Fever game score today. Track real-time WNBA updates, Caitlin Clark stats, and watch the Fever game tonight.',
    h1: 'Indiana Fever Game Score Today & Live WNBA Updates',
    content: 'Welcome to Fever Game Today. Follow live Indiana Fever scores, Caitlin Clark highlights, and real-time WNBA game updates. Discover how to watch Fever games tonight, view the complete season schedule, and get detailed player statistics.'
  },
  {
    path: '/schedule',
    title: 'Indiana Fever 2026 Schedule - TV & Streaming Guide',
    description: 'View the complete 2026 Indiana Fever WNBA schedule. Find out when and where to watch Caitlin Clark and the Fever play on TV and Prime Video.',
    h1: 'Indiana Fever 2026 Game Schedule',
    content: 'The official 2026 Indiana Fever schedule. Never miss a game with our complete list of upcoming WNBA matchups. Find broadcast information including Prime Video, ION TV, and ESPN networks.'
  },
  {
    path: '/news',
    title: 'Indiana Fever News & Caitlin Clark Updates',
    description: 'Latest news, highlights, and tactical breakdowns for the Indiana Fever and Caitlin Clark.',
    h1: 'Indiana Fever Latest News & Updates',
    content: 'Stay updated with the latest Indiana Fever news, post-game recaps, and in-depth analysis of Caitlin Clark\'s performance. Read our expert breakdowns and team coverage.'
  },
  {
    path: '/videos',
    title: 'Indiana Fever & Caitlin Clark Video Highlights',
    description: 'Watch the best video highlights, deep threes, and assists from Caitlin Clark and the Indiana Fever.',
    h1: 'Caitlin Clark & Indiana Fever Video Highlights',
    content: 'Curated video highlights of the Indiana Fever. Watch Caitlin Clark\'s deep three-pointers, incredible assists, and game-winning moments from the 2026 WNBA season.'
  },
  {
    path: '/player/caitlin-clark',
    title: 'Caitlin Clark Stats, Bio & Impact - Indiana Fever',
    description: 'Comprehensive statistics, biography, and analysis of Caitlin Clark\'s impact on the Indiana Fever and the WNBA.',
    h1: 'Caitlin Clark: Player Profile & Statistics',
    content: 'Deep dive into Caitlin Clark\'s rookie season with the Indiana Fever. Explore her points per game, assists, 3-point shooting percentage, and cultural impact on women\'s basketball.'
  },
  {
    path: '/guides/how-to-watch-fever',
    title: 'How to Watch Indiana Fever Games - Free & TV Guide',
    description: 'Complete guide on how to stream and watch Indiana Fever games live. Coverage includes Prime Video, ION TV, ESPN, and regional sports networks.',
    h1: 'How to Watch Indiana Fever Games Live',
    content: 'Learn exactly where to stream every Indiana Fever game. We break down the WNBA TV deals, how to use Amazon Prime Video for sports, and how to watch games for free on local channels.'
  },
  {
    path: '/guides/caitlin-clark-impact',
    title: 'Caitlin Clark\'s Impact on the Indiana Fever & WNBA',
    description: 'Analyzing the Caitlin Clark effect: how her arrival transformed the Indiana Fever\'s viewership, ticket sales, and team dynamics.',
    h1: 'The Caitlin Clark Effect: Analyzing Her WNBA Impact',
    content: 'A comprehensive statistical and cultural analysis of Caitlin Clark\'s impact on the WNBA. From sold-out arenas to record-breaking TV ratings, understand why she is a generational talent.'
  },
  {
    path: '/guides/fever-season-preview',
    title: 'Indiana Fever 2026 Season Preview & Roster Analysis',
    description: 'Preview the Indiana Fever\'s 2026 season with deep roster analysis, playoff predictions, and key matchups.',
    h1: 'Indiana Fever 2026 Season Preview',
    content: 'Everything you need to know about the Indiana Fever\'s 2026 campaign. Read our expert roster analysis, coach strategies, and predictions for their WNBA playoff push.'
  }
];

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

try {
  // Check if build exists
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  routes.forEach(route => {
    let routeDir = distDir;
    let routeHtmlPath = indexHtmlPath;

    // If it's not the root path, we create a subfolder and an index.html inside it
    if (route.path !== '/') {
      routeDir = path.join(distDir, route.path);
      routeHtmlPath = path.join(routeDir, 'index.html');
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
    }

    // Replace Title
    let newHtml = baseHtml.replace(
      /<title>.*?<\/title>/g,
      `<title>${route.title}</title>`
    );

    // Replace Description
    newHtml = newHtml.replace(
      /<meta name="description" content=".*?"\s*\/>/g,
      `<meta name="description" content="${route.description}" />`
    );

    // Inject Canonical URL
    const canonicalHtml = `<link rel="canonical" href="https://fevergame.space${route.path === '/' ? '' : route.path}" />`;
    newHtml = newHtml.replace(
      /<\/head>/,
      `  ${canonicalHtml}\n  </head>`
    );

    // Inject Rich Content into noscript for crawlers
    const contentHtml = `
    <noscript>
      <div style="padding: 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
        <h1>${route.h1}</h1>
        <article>
          <p>${route.content}</p>
          <h2>About Fever Game Today</h2>
          <p>This page provides live WNBA basketball information. Navigate our site for schedules, player stats, and live broadcast links.</p>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/schedule">Game Schedule</a></li>
            <li><a href="/news">Latest News</a></li>
            <li><a href="/videos">Highlights</a></li>
          </ul>
        </article>
      </div>
    </noscript>`;

    // Replace existing noscript or inject new one before script tag
    if (newHtml.includes('<noscript>')) {
      newHtml = newHtml.replace(/<noscript>[\s\S]*?<\/noscript>/, contentHtml);
    } else {
      newHtml = newHtml.replace(/<script type="module"/, `${contentHtml}\n    <script type="module"`);
    }

    fs.writeFileSync(routeHtmlPath, newHtml);
    console.log(`✅ Generated SEO static page: ${route.path === '/' ? '/index.html' : route.path + '/index.html'}`);
  });

  console.log('🎉 SEO static generation complete!');
} catch (error) {
  console.error('Error generating SEO pages:', error);
  process.exit(1);
}
