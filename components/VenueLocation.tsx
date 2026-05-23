import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Navigation, Info } from 'lucide-react';

const VenueLocation: React.FC = () => {
  const { t } = useLanguage();
  const baseSrc = "https://i.meee.com.tw/syJbFGj";
  const [imgSrc, setImgSrc] = useState(`${baseSrc}.png`);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      // Try JPG fallback if PNG fails
      setImgSrc(`${baseSrc}.jpg`);
      setHasError(true);
    }
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter whitespace-nowrap">
            {t('會場位置', 'Venue Location')}
          </h2>
          <div className="w-12 h-1 bg-orange-[500]/30 mx-auto mt-3 rounded-full" style={{ backgroundColor: 'rgba(249, 115, 22, 0.3)' }}></div>
          <p className="mt-3 text-xs md:text-base text-gray-500 font-bold max-w-2xl mx-auto">
            {t('會場於大樓與院內各區域之相對位置圖', 'Detailed location map within the main building of the venue.')}
          </p>
        </div>

        {/* Venue Location Image Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group p-4 bg-slate-50 rounded-[2rem] border border-gray-200/60 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="relative overflow-hidden rounded-xl bg-white flex items-center justify-center border border-gray-100">
              <img 
                src={imgSrc} 
                alt="SWORD-2026 Venue Location Map" 
                className="max-w-full h-auto max-h-[80vh] object-contain transition-transform duration-500 hover:scale-[1.01]"
                referrerPolicy="no-referrer"
                onError={handleError}
                loading="lazy"
              />
            </div>
            
            {/* View full-size assistance button */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <span className="text-xs md:text-sm text-gray-500 font-bold flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-gray-400" />
                {t('※ 點擊按鈕可於新頁面開啟高畫質位置地圖', '※ Click the button to open a high-definition venue map in a new window.')}
              </span>
              <a 
                href={imgSrc} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 text-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {t('檢視原本圖片', 'View Original Map')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueLocation;
