import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  delayMs?: number;
}

const PrimeYoungAdultBanner: React.FC<PromoBannerProps> = ({ delayMs = 6000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 检查用户是否在过去 24 小时内关闭过该弹窗
    const dismissedTimestamp = localStorage.getItem('prime_ya_banner_dismissed');
    if (dismissedTimestamp) {
      const pastTime = parseInt(dismissedTimestamp, 10);
      const oneDay = 24 * 60 * 60 * 1000;
      if (Date.now() - pastTime < oneDay) {
        setIsDismissed(true);
        return;
      }
    }

    // 延迟几秒展示，避免一进站就打扰用户，提升转化体验
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('prime_ya_banner_dismissed', Date.now().toString());
  };

  const handleClaim = () => {
    window.open('https://www.amazon.com/joinyoungadult?tag=fevergame01-20', '_blank', 'noopener,noreferrer');
  };

  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Student & Young Adult Special Offer"
      className="fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-[380px] bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-amber-400 animate-in fade-in slide-in-from-bottom-8 duration-500"
    >
      {/* 关闭按钮 */}
      <button
        onClick={handleDismiss}
        className="absolute top-2.5 right-2.5 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Close promotion"
      >
        <X className="h-4 w-4" />
      </button>

      {/* 标签 */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <Sparkles className="h-3 w-3" />
          Ages 18–24 or Student?
        </span>
      </div>

      {/* 标题与文案 */}
      <h4 className="text-base sm:text-lg font-black text-white leading-snug mb-1">
        Get <span className="text-amber-400 underline decoration-amber-400">6 Months FREE</span> Prime Video!
      </h4>
      <p className="text-xs text-gray-300 mb-3.5 leading-relaxed">
        Stream live Indiana Fever & WNBA games for free. No commitment, cancel anytime.
      </p>

      {/* 转化按钮 */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleClaim}
          className="flex-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-gray-950 font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
        >
          <span>Claim 6 Months Free</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 小免责声明 */}
      <p className="text-[9px] text-gray-400 text-center mt-2">
        Amazon Prime student & young adult verification applies.
      </p>
    </aside>
  );
};

export default PrimeYoungAdultBanner;
