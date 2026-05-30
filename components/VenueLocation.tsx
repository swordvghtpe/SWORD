import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Navigation, Info } from 'lucide-react';

const VenueLocation: React.FC = () => {
  const { t } = useLanguage();
  const baseSrc = "https://i.meee.com.tw/ApUfRkL";
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

        {/* Both Maps: Venue Location & Hospital Map Side-By-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: 院內地圖 */}
          <div id="hospital-map-card" className="flex flex-col">
            <div className="relative group p-4 bg-slate-50 rounded-[2rem] border border-gray-200/60 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm md:text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {t('院內地圖', 'Hospital Map')}
                </h3>
                <div className="relative overflow-hidden rounded-xl bg-white flex items-center justify-center border border-gray-100 p-2">
                  <img 
                    src="https://meee.com.tw/RSfci7b.jpg" 
                    alt="Hospital Map" 
                    className="max-w-full h-auto max-h-[50vh] object-contain transition-transform duration-500 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center px-1">
                <span className="text-[10px] md:text-xs text-gray-500 font-bold max-w-[60%] leading-tight">
                  {t('※ 點擊按鈕在新頁面查看院內地圖', '※ Click button to view in a new tab.')}
                </span>
                <a 
                  href="https://meee.com.tw/RSfci7b.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] md:text-xs shadow-md hover:shadow-lg transition-all"
                >
                  {t('檢視大圖', 'View Full Map')}
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: 會場位置 */}
          <div id="venue-location-card" className="flex flex-col">
            <div className="relative group p-4 bg-slate-50 rounded-[2rem] border border-gray-200/60 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between h-full">
              <div>
                <h3 className="text-sm md:text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  {t('會場位置圖', 'Venue Location Map')}
                </h3>
                <div className="relative overflow-hidden rounded-xl bg-white flex items-center justify-center border border-gray-100 p-2">
                  <img 
                    src={imgSrc} 
                    alt="SWORD-2026 Venue Location Map" 
                    className="max-w-full h-auto max-h-[50vh] object-contain transition-transform duration-500 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    onError={handleError}
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center px-1">
                <span className="text-[10px] md:text-xs text-gray-500 font-bold max-w-[60%] leading-tight">
                  {t('※ 點擊按鈕在新頁面查看高解析位置地圖', '※ Click button to view in high resolution.')}
                </span>
                <a 
                  href={imgSrc} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl text-[10px] md:text-xs shadow-md hover:shadow-lg transition-all"
                >
                  {t('檢視大圖', 'View Full Map')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueLocation;
