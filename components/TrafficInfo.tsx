import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Compass, Car } from 'lucide-react';

const TrafficInfo: React.FC = () => {
  const { t } = useLanguage();
  const baseSrc = "https://i.meee.com.tw/APdUM0x";
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
    <section id="traffic" className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-100 rounded-full">
            <Compass className="w-4 h-4" />
            <span>Directions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
            {t('交通資訊', 'Traffic Information')}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl font-bold text-gray-700 max-w-2xl mx-auto">
            {t('本研討會暨工作坊之大眾運輸與交通指引', 'Public transportation guide and driving directions to the venue.')}
          </p>
        </div>

        {/* Traffic Guide Image Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group p-4 bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="relative overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
              <img 
                src={imgSrc} 
                alt="SWORD-2026 Traffic Information" 
                className="max-w-full h-auto max-h-[80vh] object-contain transition-transform duration-500 hover:scale-[1.01]"
                referrerPolicy="no-referrer"
                onError={handleError}
                loading="lazy"
              />
            </div>
            
            {/* View full-size assistance button */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <span className="text-xs md:text-sm text-gray-500 font-bold flex items-center gap-1.5">
                <Car className="w-4 h-4 text-gray-400" />
                {t('※ 點擊按鈕可在新頁面查看完整高解析度指引', '※ Click the button to view the high-resolution guide in a new tab.')}
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
                {t('檢視大圖', 'View Full Image')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrafficInfo;
