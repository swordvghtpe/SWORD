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
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter whitespace-nowrap">
            {t('贊助廠商', 'Sponsors')}
          </h2>
          <div className="w-12 h-1 bg-orange-[500]/30 mx-auto mt-3 rounded-full" style={{ backgroundColor: 'rgba(241, 90, 36, 0.3)' }}></div>
          <p className="mt-3 text-xs md:text-base text-gray-500 font-bold max-w-2xl mx-auto">
            {t('感謝廠商參與SWORD-2026活動', 'We gratefully acknowledge all sponsors for their generous support and valuable participation in SWORD-2026.')}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-gray-400">
            <span className="w-6 h-[1px] bg-gray-300"></span>
            <p className="text-xs md:text-sm font-medium italic">
              {t('由 AI 系統進行隨機排序', 'Randomly ordered by an AI system')}
            </p>
            <span className="w-6 h-[1px] bg-gray-300"></span>
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


      </div>
    </section>
  );
};

export default Sponsors;
