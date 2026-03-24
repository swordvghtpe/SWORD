import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const sponsorImages = [
  "https://i.meee.com.tw/xcQyznn.png",
  "https://i.meee.com.tw/poZUWbN.png",
  "https://i.meee.com.tw/xf2O7ar.png",
  "https://i.meee.com.tw/7sET4hI.png",
  "https://i.meee.com.tw/fT4wbwe.png",
  "https://i.meee.com.tw/tbMKwEw.png",
  "https://i.meee.com.tw/jlpOfgi.png",
  "https://i.meee.com.tw/mB8L8au.png",
  "https://i.meee.com.tw/1nCpUFo.png",
  "https://i.meee.com.tw/KzyQLLo.png",
  "https://i.meee.com.tw/hiKmIhO.png"
];

const SponsorCard: React.FC<{ src: string; index: number }> = ({ src, index }) => (
  <div className="group relative flex items-center justify-center p-2 md:p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all duration-500 transform hover:-translate-y-2 border border-white h-40 md:h-56 w-[calc(50%-12px)] sm:w-64 lg:w-72 overflow-hidden">
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-transparent to-blue-50/0 group-hover:from-orange-50/50 group-hover:to-blue-50/50 transition-all duration-500"></div>
    
    <img 
      src={src} 
      alt={`Sponsor ${index + 1}`} 
      className="relative z-10 w-full h-full object-contain filter grayscale-[0.1] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  </div>
);

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

    // Fix indices 0, 1 (Row 1) and 7 (Row 4)
    const fixedIndices = [0, 1, 7];
    const toShuffle = sponsorImages.filter((_, index) => !fixedIndices.includes(index));
    const shuffled = shuffleArray(toShuffle);
    
    const finalArray = new Array(sponsorImages.length);
    fixedIndices.forEach(idx => {
      finalArray[idx] = sponsorImages[idx];
    });
    
    let shuffleIdx = 0;
    for (let i = 0; i < finalArray.length; i++) {
      if (!fixedIndices.includes(i)) {
        finalArray[i] = shuffled[shuffleIdx++];
      }
    }
    
    setShuffledSponsors(finalArray);
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
            {t('感謝廠商參與SWORD-2026活動', 'We would like to express our sincere appreciation to all vendors for their participation and support in the SWORD-2026 event.')}
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
          {/* Row 1: 3 items */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {shuffledSponsors.slice(0, 3).map((src, index) => (
              <SponsorCard key={`row1-${index}`} src={src} index={index} />
            ))}
          </div>
          {/* Row 2: 1 item */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {shuffledSponsors.slice(3, 4).map((src, index) => (
              <SponsorCard key={`row2-${index}`} src={src} index={index + 3} />
            ))}
          </div>
          {/* Row 3: 3 items */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {shuffledSponsors.slice(4, 7).map((src, index) => (
              <SponsorCard key={`row3-${index}`} src={src} index={index + 4} />
            ))}
          </div>
          {/* Row 4: 1 item */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {shuffledSponsors.slice(7, 8).map((src, index) => (
              <SponsorCard key={`row4-${index}`} src={src} index={index + 7} />
            ))}
          </div>
          {/* Row 5: 3 items */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {shuffledSponsors.slice(8, 11).map((src, index) => (
              <SponsorCard key={`row5-${index}`} src={src} index={index + 8} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
