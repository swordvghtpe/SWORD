import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FloorMap: React.FC = () => {
  const { t } = useLanguage();
  const baseSrc = "https://i.meee.com.tw/jwlAliH";
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
    <section id="floormap" className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter whitespace-nowrap">
            {t('大會平面圖', 'Floor Plan')}
          </h2>
          <div className="w-12 h-1 bg-blue-600/30 mx-auto mt-3 rounded-full"></div>
          <p className="mt-3 text-xs md:text-base text-gray-500 font-bold max-w-2xl mx-auto">
            {t('本研討會暨工作坊之場地配置圖', 'Venue layout and floor map for the Symposium & Workshop.')}
          </p>
        </div>

        {/* Floor Map Image Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group p-4 bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="relative overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
              <img 
                src={imgSrc} 
                alt="SWORD-2026 Floor Plan" 
                className="max-w-full h-auto max-h-[75vh] object-contain transition-transform duration-500 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                onError={handleError}
                loading="lazy"
              />
            </div>
            
            {/* View full-size assistance button */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <span className="text-xs md:text-sm text-gray-500 font-bold">
                {t('※ 點擊下方按鈕可於新視窗開啟高解析度平面圖', '※ Click the button below to open high-resolution map in a new window.')}
              </span>
              <a 
                href={imgSrc} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 text-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {t('開啟原圖', 'Open Original Image')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloorMap;
