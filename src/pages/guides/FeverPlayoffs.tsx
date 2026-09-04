import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Trophy, Flame, Calendar, Tv, HelpCircle, Star, ArrowRight, CheckCircle2 } from 'lucide-react';

const FeverPlayoffs: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'Indiana Fever 2026 WNBA Playoffs Guide: Schedule, Odds & How to Watch',
    'description': 'Complete guide to the Indiana Fever 2026 WNBA Playoff run. Find game schedules, Caitlin Clark playoff stats, championship odds, and live streaming info.',
    'author': {
      '@type': 'Organization',
      'name': 'Fever Game Today'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Fever Game Today',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://fevergame.space/logo.svg'
      }
    },
    'datePublished': '2026-09-04',
    'dateModified': '2026-09-04'
  };

  const faqData = [
    {
      question: "Did the Indiana Fever make the 2026 WNBA Playoffs?",
      answer: "Yes! The Indiana Fever have qualified for the 2026 WNBA Playoffs following a strong 26-14 regular season record led by Caitlin Clark and Aliyah Boston."
    },
    {
      question: "When do the 2026 WNBA Playoffs start?",
      answer: "The 2026 WNBA Playoffs begin on Friday, September 18, 2026, featuring the top 8 teams in the league."
    },
    {
      question: "How can I stream Indiana Fever playoff games live?",
      answer: "Playoff games will be broadcast across ESPN, ABC, ESPN2, and Prime Video. Fans can also watch live games by starting a free trial on Amazon Prime Video or through ESPN streaming options."
    },
    {
      question: "What are the Indiana Fever championship odds?",
      answer: "With Caitlin Clark's explosive scoring and elite playmaking, the Indiana Fever enter the 2026 postseason as top contenders in the Eastern Conference."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>🏆 Indiana Fever 2026 WNBA Playoffs: Schedule, Bracket & Streaming</title>
        <meta name="description" content="Indiana Fever 2026 WNBA Playoff hub! Get live game schedules, playoff seeding, Caitlin Clark stats, broadcast channels, and Prime Video stream links." />
        <meta name="keywords" content="indiana fever playoffs 2026, fever playoff schedule, caitlin clark playoffs, wnba playoffs 2026, how to watch fever playoff game live" />
        <link rel="canonical" href="https://fevergame.space/guides/fever-playoffs-2026" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Gradient Hero Header */}
        <div className="bg-gradient-to-r from-red-700 via-orange-600 to-black text-white p-6 md:p-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              2026 Postseason Special
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
            Indiana Fever 2026 WNBA Playoff Guide: Schedule, Bracket & How to Watch
          </h1>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
            Everything you need to follow Caitlin Clark and the Indiana Fever as they compete for the 2026 WNBA Championship. Updated with live broadcast networks, game dates, and tactical analysis.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 prose prose-lg max-w-none">
          {/* Section 1: Overview */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-amber-500" />
              Fever Playoff Qualification & Season Recap
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Following an incredible 26-14 regular season campaign, the <strong>Indiana Fever</strong> have secured their postseason spot in the 2026 WNBA Playoffs. Spearheaded by second-year superstar <strong>Caitlin Clark</strong>, All-Star center Aliyah Boston, and a re-energized roster, Indiana has transformed into one of the most explosive offensive teams in women's basketball history.
            </p>
          </section>

          {/* High-Converting Prime Promo Banner */}
          <div className="my-8 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-yellow-500/15 border-2 border-amber-400 rounded-2xl p-6 shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="inline-block bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  📺 Streaming Recommendation
                </span>
                <h3 className="text-lg font-black text-gray-900">Stream Playoff Action on Prime Video</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Select WNBA playoff broadcasts are streamed on Amazon Prime Video. College students & adults ages 18–24 get a <strong className="text-red-600">6-Month Free Trial</strong>!
                </p>
              </div>
              <a
                href="https://www.amazon.com/joinyoungadult?tag=fevergame01-20"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center px-6 py-3.5 text-sm font-black text-gray-950 bg-amber-400 hover:bg-amber-300 rounded-full transition-transform transform hover:scale-105 shadow-md whitespace-nowrap"
              >
                Claim Free Trial →
              </a>
            </div>
          </div>

          {/* Section 2: Key Playoff Dates */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-red-600" />
              2026 WNBA Playoff Key Dates & Format
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>First Round (Round 1):</strong> Begins Friday, September 18, 2026 (Best-of-3 series).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>WNBA Semifinals:</strong> Begins late September 2026 (Best-of-5 series).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>WNBA Finals:</strong> Early to mid-October 2026 (Best-of-5 series).</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Caitlin Clark Effect in Postseason */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="h-6 w-6 text-amber-500" />
              Caitlin Clark Playoff Factor
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Caitlin Clark's deep 3-point shooting and transition passing make the Fever a nightmare matchup in a 3-game series. Expect high-tempo games, packed arenas, and record-breaking national TV ratings as Clark leads Gainbridge Fieldhouse into playoff basketball.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <HelpCircle className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Playoff FAQs</h2>
            </div>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-red-200 transition-colors">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Navigation Links */}
          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More Fever Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/schedule" className="block bg-red-50 hover:bg-red-100 rounded-xl p-4 transition-colors border border-red-100">
                <span className="font-bold text-red-700 flex items-center justify-between">
                  Full 2026 Schedule <ArrowRight className="h-4 w-4" />
                </span>
                <p className="text-xs text-gray-600 mt-1">View tip-off times and broadcast networks for all games.</p>
              </Link>
              <Link to="/guides/how-to-watch-fever" className="block bg-red-50 hover:bg-red-100 rounded-xl p-4 transition-colors border border-red-100">
                <span className="font-bold text-red-700 flex items-center justify-between">
                  How to Watch Guide <ArrowRight className="h-4 w-4" />
                </span>
                <p className="text-xs text-gray-600 mt-1">Complete TV channel and free streaming options breakdown.</p>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default FeverPlayoffs;
