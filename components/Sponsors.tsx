import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const sponsorImages = [
  "https://i.meee.com.tw/EQqr3ee.png",
  "https://i.meee.com.tw/uKxduv5.png",
  "https://i.meee.com.tw/MPxx8W1.png",
  "https://i.meee.com.tw/LCL5Ncc.png",
  "https://i.meee.com.tw/HmUC6D5.png",
  "https://i.meee.com.tw/yiF2Qim.png",
  "https://i.meee.com.tw/rAeB36z.png",
  "https://i.meee.com.tw/tzrJkVL.png",
  "https://i.meee.com.tw/0NCEFcC.png",
  "https://i.meee.com.tw/1FixJUV.png",
  "https://i.meee.com.tw/yG1fueX.png",
  "https://i.meee.com.tw/iblnoFX.png",
  "https://i.meee.com.tw/GHdYjgB.png",
  "https://i.meee.com.tw/aehNVWd.png"
];

const SponsorCard: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      // If .png failed, try .jpg
      if (src.endsWith('.png')) {
        setImgSrc(src.replace('.png', '.jpg'));
      } else if (src.endsWith('.jpg')) {
        setImgSrc(src.replace('.jpg', '.png'));
      }
      setHasError(true);
    }
  };

  return (
    <div className="group relative flex items-center justify-center p-2 md:p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all duration-500 transform hover:-translate-y-2 border border-white h-40 md:h-56 w-[calc(50%-12px)] sm:w-64 lg:w-72 overflow-hidden">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-transparent to-blue-50/0 group-hover:from-orange-50/50 group-hover:to-blue-50/50 transition-all duration-500"></div>
      
      <img 
        src={imgSrc} 
        alt={`Sponsor ${index + 1}`} 
        className="relative z-10 w-full h-full object-contain filter grayscale-[0.1] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={handleError}
      />
    </div>
  );
};

const Sponsors: React.FC = () => {
  const { t } = useLanguage();
  const [shuffledSponsors, setShuffledSponsors] = useState<string[]>([]);

  useEffect(() => {
    const shuffleArray = (array: string[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    // Shuffle the entire array
    setShuffledSponsors(shuffleArray(sponsorImages));
  }, []);

  return (
    <section id="sponsors" className="relative py-16 md:py-24 overflow-hidden">
      {/* Lively Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#fff7ed_0%,_#ffffff_50%,_#eff6ff_100%)]"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 rounded-full">
            Partnership
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
            {t('贊助廠商', 'Sponsors')}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl font-bold text-gray-700 max-w-2xl mx-auto">
            {t('感謝廠商參與SWORD-2026活動', 'We gratefully acknowledge all sponsors for their generous support and valuable participation in SWORD-2026.')}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
            <span className="w-8 h-[1px] bg-gray-300"></span>
            <p className="text-sm md:text-base font-medium italic">
              {t('由 AI 系統進行隨機排序', 'Randomly ordered by an AI system')}
            </p>
            <span className="w-8 h-[1px] bg-gray-300"></span>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Main Grid for first 10 items */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {shuffledSponsors.slice(0, 10).map((src, index) => (
              <SponsorCard key={`main-${index}`} src={src} index={index} />
            ))}
          </div>
          
          {/* Last row for 4 items */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {shuffledSponsors.slice(10).map((src, index) => (
              <SponsorCard key={`last-${index}`} src={src} index={index + 10} />
            ))}
          </div>
        </div>

        {/* Sponsorship Bank Info */}
        <div className="mt-16 max-w-xl mx-auto">
          <div className="relative p-6 md:p-8 bg-white/90 backdrop-blur-md rounded-[2rem] border border-orange-150/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-blue-400/10 rounded-bl-[2rem] rounded-tr-[2rem] pointer-events-none"></div>
            
            <h3 className="text-xl md:text-2xl font-black text-gray-900 text-center mb-6 flex items-center justify-center gap-2">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              {t('贊助匯款資訊', 'Sponsorship Remittance Info')}
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-sm font-bold text-gray-500">{t('戶名', 'Account Name')}</span>
                <span className="text-base md:text-lg font-black text-gray-900 mt-1 sm:mt-0">{t('中華醫學會', 'Chinese Medical Association')}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-sm font-bold text-gray-500">{t('銀行 / 分行', 'Bank / Branch')}</span>
                <span className="text-base md:text-lg font-black text-gray-900 mt-1 sm:mt-0">{t('合作金庫 石牌分行', 'Taiwan Cooperative Bank, Shipai Branch')}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-sm font-bold text-gray-500">{t('匯款帳號', 'Account Number')}</span>
                <span className="text-base md:text-xl font-mono font-black text-blue-600 tracking-wider mt-1 sm:mt-0">1427-765-210957</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
