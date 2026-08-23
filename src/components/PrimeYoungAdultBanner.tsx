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
      className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-4 sm:bottom-4 z-50 max-w-sm sm:w-[360px] mx-auto sm:mx-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-3.5 sm:p-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-amber-400/90 backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300"
      style={{ paddingBottom: 'calc(0.875rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* 放大移动端点击热区的关闭按钮 */}
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
        aria-label="Close promotion"
      >
        <X className="h-4 w-4" />
      </button>

      {/* 标签 */}
      <div className="flex items-center gap-1.5 mb-1.5 pr-6">
        <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-black text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <Sparkles className="h-2.5 w-2.5" />
          Ages 18–24 or Student?
        </span>
      </div>

      {/* 标题与文案 */}
      <h4 className="text-sm sm:text-base font-black text-white leading-tight mb-1 pr-4">
        Get <span className="text-amber-400 underline decoration-amber-400">6 Months FREE</span> Prime Video!
      </h4>
      <p className="text-[11px] sm:text-xs text-gray-300 mb-3 leading-snug">
        Stream live Indiana Fever & WNBA games for free. Cancel anytime.
      </p>

      {/* 转化按钮 */}
      <button
        onClick={handleClaim}
        className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-gray-950 font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
      >
        <span>Claim 6 Months Free</span>
        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </button>

      {/* 小免责声明 */}
      <p className="text-[9px] text-gray-400 text-center mt-1.5">
        Amazon Prime student & young adult terms apply.
      </p>
    </aside>
  );
};

export default PrimeYoungAdultBanner;
