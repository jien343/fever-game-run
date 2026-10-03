import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Structured rich routes for Server-Side Rendering (SSR) & AI Crawlers
const routes = [
  {
    path: '/',
    title: 'Indiana Fever Score Today | Fever Game Live Scores & Stats',
    description: 'Check the live Indiana Fever game score today! Real-time WNBA scores, Caitlin Clark stats, full box score, and watch Fever games live. Updated 24/7.',
    h1: 'Indiana Fever Score Today & Live Game Updates',
    sections: [
      {
        h2: 'Indiana Fever Game Today: Live Score & Play-by-Play Updates',
        content: `Welcome to the premier fan destination for checking the official Indiana Fever score today. As Caitlin Clark, Aliyah Boston, and Kelsey Mitchell electrify Gainbridge Fieldhouse, our real-time basketball tracker keeps you updated with instant fever score alerts, period scoring runs, shooting splits, and live game updates. Whether you are following an afternoon matinee or tracking the final score of tonight's Indiana Fever game today, our scoreboard delivers accurate play-by-play coverage every 30 seconds.`
      },
      {
        h2: 'Fever Live Scores, Box Scores & Final Results',
        content: `Every matchup on the Indiana Fever schedule receives comprehensive statistical coverage. Access detailed box score breakdowns including total points scored, field goals made, three-point shooting efficiency, rebounds, and team assists leading directly to scores. Follow every fever game today live score from the opening jump ball through overtime, with quarter-by-quarter scoring analysis, bench scoring contributions, and head-to-head score comparison against top WNBA contenders. If you need live stats wnba fever game coverage, our interactive platform delivers complete player performance metrics.`,
        table: {
          headers: ['Matchup', 'Status', 'Q1', 'Q2', 'Q3', 'Q4', 'Final Score'],
          rows: [
            ['Indiana Fever vs Chicago Sky', 'Final', '28', '25', '24', '23', '100 - 81 (W)'],
            ['Indiana Fever vs New York Liberty', 'Final', '22', '26', '19', '21', '88 - 85 (W)'],
            ['Indiana Fever vs Dallas Wings', 'Final', '26', '31', '25', '28', '110 - 109 (W)'],
            ['Indiana Fever vs Connecticut Sun', 'Final', '21', '23', '24', '20', '88 - 84 (W)']
          ]
        }
      },
      {
        h2: 'Caitlin Clark Scoring Stats, Deep Threes & Offensive Firepower',
        content: `Caitlin Clark has rewritten professional basketball history with signature logo three-pointers, rapid transition pace, and elite playmaking. Track Caitlin Clark points per game (PPG), high-scoring 30-point performances, effective field goal percentages, and clutch fourth-quarter buckets. Clark ability to score from well beyond the arc forces defensive rotations that open up high-percentage inside scoring opportunities for teammates Aliyah Boston and Lexie Hull, propelling the Fever to one of the most exciting scoring offenses in the league.`
      },
      {
        h2: 'WNBA Standings, Playoff Picture & Scoring Differential',
        content: `Monitor the Indiana Fever postseason positioning in the WNBA Eastern Conference and overall league table. Our live updates examine team scoring efficiency, offensive ratings, fast-break point generation, and point differential margins across the regular season and playoffs. Stay informed on tiebreakers, home-court advantage implications, and upcoming matchup previews as Indiana battles elite franchises including the Las Vegas Aces and Minnesota Lynx.`
      },
      {
        h2: 'Frequently Asked Questions: Indiana Fever Scores & Live Coverage',
        faqs: [
          {
            q: 'What is the Indiana Fever score today?',
            a: 'Check our live scoreboard above for the official Indiana Fever score today, updated continuously with live quarter scores, player box scores, and final score summaries.'
          },
          {
            q: 'Where can I find the complete box score for the Fever game?',
            a: 'Our platform provides full box score statistics for every Indiana Fever matchup, including field goals, three-pointers, rebounds, assists, and individual player scoring totals.'
          },
          {
            q: 'How can I watch the Indiana Fever game live today?',
            a: 'Indiana Fever games are broadcast nationally on ESPN, ABC, Prime Video, and free over-the-air on ION Television. Check our TV schedule guide for live broadcast and streaming channels.'
          },
          {
            q: 'What is Caitlin Clark average score per game?',
            a: 'Caitlin Clark averages over 19 points and 8 assists per game in the WNBA, making her one of the premier offensive players and scoring leaders in women basketball.'
          }
        ]
      }
    ]
  },
  {
    path: '/schedule',
    title: 'Indiana Fever 2026 Schedule & TV Broadcast Guide',
    description: 'Complete 2026 Indiana Fever WNBA schedule with tip-off times, opponents, TV channels, and live stream links on Prime Video and ION.',
    h1: 'Indiana Fever 2026 Game Schedule & Score Tracking',
    sections: [
      {
        h2: 'Official 2026 Indiana Fever Schedule & Broadcast Information',
        content: `Follow every matchup on the 2026 Indiana Fever schedule. Find exact tip-off times, home and away venues, television broadcast networks, and live streaming platforms across ESPN, ABC, Prime Video, and ION TV.`
      },
      {
        h2: 'Where to Watch Indiana Fever Live Broadcasts',
        content: `Never miss an Indiana Fever tip-off. ION TV broadcasts free Friday night WNBA doubleheaders without subscription fees, while Prime Video streams exclusive national games with high-definition coverage.`
      }
    ]
  },
  {
    path: '/news',
    title: 'Indiana Fever News & Caitlin Clark Updates',
    description: 'Latest news, highlights, and tactical breakdowns for the Indiana Fever and Caitlin Clark.',
    h1: 'Indiana Fever Latest News, Score Recaps & Tactical Analysis',
    sections: [
      {
        h2: 'Breaking News & Post-Game Score Recaps',
        content: `Stay ahead of the game with the latest Indiana Fever news, post-game scoring recaps, injury reports, roster updates, and expert game commentary.`
      },
      {
        h2: 'Tactical Breakdowns & Scoring Strategy',
        content: `Explore in-depth tactical analysis breaking down the Fever high-pace offensive schemes, pick-and-roll spacing, perimeter shooting accuracy, and defensive adjustments.`
      }
    ]
  },
  {
    path: '/videos',
    title: 'Indiana Fever & Caitlin Clark Video Highlights',
    description: 'Watch the best video highlights, deep threes, and assists from Caitlin Clark and the Indiana Fever.',
    h1: 'Caitlin Clark & Indiana Fever Video Highlights',
    sections: [
      {
        h2: 'Curated Game Highlights, Deep Threes & Game-Winning Plays',
        content: `Relive the most exciting moments of the WNBA season. Watch Caitlin Clark logo 3-pointers, pinpoint full-court transition assists, buzzer beaters, and high-scoring fourth-quarter surges.`
      }
    ]
  },
  {
    path: '/player/caitlin-clark',
    title: 'Caitlin Clark Stats, Bio & Impact - Indiana Fever',
    description: 'Comprehensive statistics, biography, and analysis of Caitlin Clark\'s impact on the Indiana Fever and the WNBA.',
    h1: 'Caitlin Clark: Player Profile, Scoring Records & Career Statistics',
    sections: [
      {
        h2: 'Career Statistics & Scoring Milestones',
        content: `Examine Caitlin Clark statistical profile: points per game, 3-pointers made, assist-to-turnover ratio, and all-time rookie scoring records with the Indiana Fever.`
      },
      {
        h2: 'Offensive Impact & The Caitlin Clark Effect',
        content: `How Caitlin Clark transformed women basketball attendance, television viewership ratings, and offensive scoring efficiency across the WNBA.`
      }
    ]
  },
  {
    path: '/guides/how-to-watch-fever',
    title: 'How to Watch Indiana Fever Games - Free & TV Guide',
    description: 'Complete guide on how to stream and watch Indiana Fever games live. Coverage includes Prime Video, ION TV, ESPN, and regional sports networks.',
    h1: 'How to Watch Indiana Fever Games Live: Streaming & TV Guide',
    sections: [
      {
        h2: 'Free and Paid Broadcast Options for Indiana Fever Fans',
        content: `Complete guide explaining how to watch every Indiana Fever game for free over-the-air via ION TV, or through streaming providers like Amazon Prime Video and WNBA League Pass.`
      }
    ]
  },
  {
    path: '/guides/caitlin-clark-impact',
    title: 'Caitlin Clark\'s Impact on the Indiana Fever & WNBA',
    description: 'Analyzing the Caitlin Clark effect: how her arrival transformed the Indiana Fever\'s viewership, ticket sales, and team dynamics.',
    h1: 'The Caitlin Clark Effect: Analyzing Her WNBA Scoring & Cultural Impact',
    sections: [
      {
        h2: 'Economic, Viewership & Arena Attendance Growth',
        content: `A detailed breakdown of sold-out arenas, record-breaking broadcast ratings, and merchandise demand driven by Caitlin Clark arrival in Indiana.`
      }
    ]
  },
  {
    path: '/guides/fever-season-preview',
    title: 'Indiana Fever 2026 Season Preview & Predictions',
    description: 'Detailed preview of the 2026 Indiana Fever season, including roster analysis, key matchups, and playoff predictions.',
    h1: 'Indiana Fever 2026 Season Preview & Score Projections',
    sections: [
      {
        h2: 'Roster Breakdown, Key Matchups & Win Projections',
        content: `Comprehensive evaluation of the Indiana Fever roster, projected offensive scoring output, schedule difficulty, and postseason prospects.`
      }
    ]
  },
  {
    path: '/guides/fever-playoffs-2026',
    title: '🏆 Indiana Fever 2026 WNBA Playoffs: Schedule, Bracket & Streaming',
    description: 'Indiana Fever 2026 WNBA Playoff hub! Get live game schedules, playoff seeding, Caitlin Clark stats, broadcast channels, and Prime Video stream links.',
    h1: 'Indiana Fever 2026 WNBA Playoff Guide: Schedule, Bracket & Scores',
    sections: [
      {
        h2: '2026 WNBA Playoff Bracket, Seeding & Game Scores',
        content: `Complete playoff coverage tracking the Indiana Fever championship pursuit with live game scores, series standings, and broadcast channels.`
      }
    ]
  }
];

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

try {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  routes.forEach(route => {
    let routeDir = distDir;
    let routeHtmlPath = indexHtmlPath;

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

    // Generate Rich Semantic HTML for Server-Side Rendering
    const sectionsHtml = (route.sections || []).map(sec => {
      let extra = '';
      if (sec.table) {
        extra += `
        <div style="overflow-x:auto;margin:16px 0;">
          <table style="width:100%;border-collapse:collapse;text-align:left;font-size:0.95rem;">
            <thead>
              <tr style="background:#111827;color:#fff;">
                ${sec.table.headers.map(h => `<th style="padding:10px 14px;">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${sec.table.rows.map(row => `
                <tr style="border-bottom:1px solid #e5e7eb;">
                  ${row.map((cell, idx) => `<td style="padding:10px 14px;${idx === row.length - 1 ? 'font-weight:bold;color:#b91c1c;' : ''}">${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>`;
      }
      if (sec.faqs) {
        extra += `
        <div style="margin-top:16px;">
          ${sec.faqs.map(faq => `
            <div style="margin-bottom:16px;background:#f9fafb;padding:12px 16px;border-radius:8px;border:1px solid #e5e7eb;">
              <h3 style="font-size:1.05rem;font-weight:700;color:#111827;margin-bottom:6px;">${faq.q}</h3>
              <p style="color:#4b5563;line-height:1.5;margin:0;">${faq.a}</p>
            </div>
          `).join('')}
        </div>`;
      }

      return `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:1.45rem;font-weight:800;color:#1f2937;margin-bottom:10px;">${sec.h2}</h2>
        <p style="line-height:1.65;color:#374151;margin-bottom:12px;">${sec.content}</p>
        ${extra}
      </section>`;
    }).join('');

    const serverRenderedBody = `
    <div id="ssr-container" style="max-width:1100px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,sans-serif;color:#111827;background:#ffffff;">
      <header style="margin-bottom:28px;text-align:center;">
        <h1 style="font-size:2.2rem;font-weight:900;color:#b91c1c;margin-bottom:8px;letter-spacing:-0.02em;">${route.h1}</h1>
        <p style="font-size:1.1rem;color:#4b5563;max-width:850px;margin:0 auto;line-height:1.6;">${route.description}</p>
      </header>

      <main>
        ${sectionsHtml}
      </main>

      <footer style="margin-top:40px;padding-top:20px;border-top:1px solid #e5e7eb;text-align:center;font-size:0.9rem;color:#6b7280;">
        <p style="margin-bottom:8px;font-weight:bold;color:#111827;">Quick Links & Fever Resources</p>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
          <a href="/" style="color:#b91c1c;text-decoration:underline;">Home</a>
          <a href="/schedule" style="color:#b91c1c;text-decoration:underline;">Game Schedule</a>
          <a href="/news" style="color:#b91c1c;text-decoration:underline;">Latest News</a>
          <a href="/videos" style="color:#b91c1c;text-decoration:underline;">Highlights</a>
          <a href="/player/caitlin-clark" style="color:#b91c1c;text-decoration:underline;">Caitlin Clark Stats</a>
          <a href="/guides/how-to-watch-fever" style="color:#b91c1c;text-decoration:underline;">How to Watch Live</a>
        </div>
      </footer>
    </div>`;

    // 1. Inject directly into <div id="root"> so AI Crawlers & SSR audits see full words & H2 tags!
    newHtml = newHtml.replace('<div id="root"></div>', `<div id="root">${serverRenderedBody}</div>`);

    // 2. Also keep <noscript> for crawlers that look specifically for fallback text
    const noscriptContent = `<noscript>${serverRenderedBody}</noscript>`;
    if (newHtml.includes('<noscript>')) {
      newHtml = newHtml.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptContent);
    } else {
      newHtml = newHtml.replace(/<\/body>/, `  ${noscriptContent}\n</body>`);
    }

    fs.writeFileSync(routeHtmlPath, newHtml);
    console.log(`✅ Generated SSR static page: ${route.path === '/' ? '/index.html' : route.path + '/index.html'}`);
  });

  console.log('🎉 SEO & SSR static generation complete!');
} catch (error) {
  console.error('Error generating SEO pages:', error);
  process.exit(1);
}
