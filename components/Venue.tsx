import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Compass, Car } from 'lucide-react';

const Venue: React.FC = () => {
  const { t } = useLanguage();
  const baseTrafficSrc = "https://meee.com.tw/B91qftj";
  const [trafficImgSrc, setTrafficImgSrc] = useState(baseTrafficSrc);
  const [hasTrafficError, setHasTrafficError] = useState(0);

  const handleTrafficError = () => {
    if (hasTrafficError === 0) {
      setTrafficImgSrc(`${baseTrafficSrc}.png`);
      setHasTrafficError(1);
    } else if (hasTrafficError === 1) {
      setTrafficImgSrc(`${baseTrafficSrc}.jpg`);
      setHasTrafficError(2);
    }
  };

  return (
    <section id="venue" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div id="venue-header" className="text-center mb-10">
          <h2 id="venue-title" className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter mb-4 whitespace-nowrap">
            {t('交通方式', 'Transportation')}
          </h2>
          <div id="venue-badge" className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full font-black text-[10px] md:text-xl shadow-md">
            {t('醫學科技大樓 一樓大會議室', 'Medical Science & Technology Building, 1F')}
          </div>
          <p id="venue-address" className="mt-4 text-[10px] md:text-xl text-gray-600 font-bold">
            {t('112 臺北市北投區石牌路二段 201 號', 'No. 201, Sec. 2, Shipai Rd., Taipei')}
          </p>
        </div>

        {/* Section 1: Public Transit (大眾運輸 + 交通指引圖) */}
        <div id="transit-group-container" className="max-w-4xl mx-auto mb-16">
          {/* Public Transport Box */}
          <div id="transit-box" className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100 shadow-sm mb-6">
            <h3 id="transit-title" className="text-sm md:text-xl font-black text-gray-900 mb-3 whitespace-nowrap flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              {t('大眾運輸', 'Public Transport')}
            </h3>
            <div id="transit-subgrid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div id="shuttle-info" className="bg-white p-4 rounded-xl border border-gray-100">
                <p id="shuttle-label" className="text-blue-600 font-black text-[10px] md:text-xs mb-1">{t('接駁車', 'Shuttle Bus')}</p>
                <p id="shuttle-detail" className="text-gray-700 font-bold text-[10px] md:text-sm">
                  {t('每 10 分鐘一班 (07:00 ~ 18:00)', 'Every 10 mins (07:00 ~ 18:00)')}
                </p>
              </div>
              <div id="bus-info" className="bg-white p-4 rounded-xl border border-gray-100">
                <p id="bus-label" className="text-blue-600 font-black text-[10px] md:text-xs mb-1">{t('公車', 'Bus Line')}</p>
                <p id="bus-detail" className="text-gray-700 font-bold text-[10px] md:text-sm">重慶幹線, 508, 602, 小8, 224</p>
              </div>
            </div>
          </div>

          {/* Card: 交通資訊導引 */}
          <div id="traffic-guide-card" className="flex flex-col">
            <div id="traffic-guide-bg" className="relative group p-4 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col justify-between h-full">
              <div>
                <h3 id="traffic-guide-title" className="text-sm md:text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {t('交通指引圖', 'Traffic Guide Map')}
                </h3>
                <div id="traffic-guide-img-container" className="relative overflow-hidden rounded-xl bg-white flex items-center justify-center border border-gray-100 p-2">
                  <img 
                    id="traffic-guide-img"
                    src={trafficImgSrc} 
                    alt="Traffic Guide" 
                    className="max-w-full h-auto max-h-[60vh] object-contain transition-transform duration-500 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    onError={handleTrafficError}
                    loading="lazy"
                  />
                </div>
              </div>
              <div id="traffic-guide-footer" className="mt-4 flex justify-between items-center px-1">
                <span id="traffic-guide-hint" className="text-[10px] md:text-xs text-gray-500 font-bold">
                  {t('※ 點擊按鈕在新頁面查看高解析指引', '※ Click button to view higher resolution.')}
                </span>
                <a 
                  id="traffic-guide-link"
                  href={trafficImgSrc} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] md:text-xs shadow-md hover:shadow-lg transition-all"
                >
                  {t('檢視大圖', 'View Full Info')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Driving & Parking (開車路線 + 停車資訊) */}
        <div id="driving-parking-group" className="max-w-4xl mx-auto">
          {/* Driving Route Card */}
          <div id="driving-box" className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-gray-200 mb-6">
            <h3 id="driving-title" className="text-sm md:text-xl font-black text-gray-900 mb-3 whitespace-nowrap flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              {t('開車路線', 'Driving Route')}
            </h3>
            <p id="driving-content" className="text-gray-700 text-xs md:text-base leading-relaxed font-bold">
              {t(
                '國道一號（中山高）→由重慶北路交流道下（往士林方向），過百齡橋→（左轉）承德路五、六段→（右轉）石牌路一段→石牌路二段201號',
                'Nat\'l Hwy 1 (Chongqing N. Rd. Exit) → Bailing Bridge → (Left) Chengde Rd. Sec. 5/6 → (Right) Stone Rd. Sec. 1 → No. 201 Stone Rd. Sec. 2'
              )}
            </p>
          </div>

          {/* --- Optimized Parking Information Section --- */}
          <div id="parking-container" className="bg-slate-50 p-6 md:p-10 rounded-[2rem] border border-gray-200">
            <div id="parking-header" className="flex items-center mb-8">
              <div id="parking-icon-bg" className="bg-blue-600 p-2 rounded-xl mr-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h3 id="parking-title" className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                {t('停車場資訊', 'Parking Information')}
              </h3>
            </div>

            {/* 3-Column Grid for Smaller, Compact Images */}
            <div id="parking-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* VGH On-site Parking */}
              <div id="parking-vgh" className="group relative flex flex-col bg-white rounded-[1.5rem] border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div id="parking-vgh-img-wrapper" className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    id="parking-vgh-img"
                    src="https://meee.com.tw/Kt7vlV0.jpg" 
                    alt="VGH Parking" 
                    className="w-full h-full object-cover"
                  />
                  <div id="parking-vgh-badge" className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] md:text-xs font-black shadow-md">
                    {t('院內推薦', 'Hospital')}
                  </div>
                </div>
                <div id="parking-vgh-info" className="p-4 bg-white">
                  <h5 id="parking-vgh-name" className="text-gray-900 font-black text-sm md:text-md">
                    {t('北榮院內停車場', 'Hospital On-site')}
                  </h5>
                  <p id="parking-vgh-desc" className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">
                    {t('院內主要停車區', 'Main Campus Area')}
                  </p>
                </div>
                <a 
                  id="parking-vgh-link"
                  href="https://meee.com.tw/Kt7vlV0.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                ></a>
              </div>

              {/* NTUNHS Parking */}
              <div id="parking-ntunhs" className="group relative flex flex-col bg-white rounded-[1.5rem] border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div id="parking-ntunhs-img-wrapper" className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    id="parking-ntunhs-img"
                    src="https://meee.com.tw/2zIBPq6.jpg" 
                    alt="NTUNHS Parking" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div id="parking-ntunhs-info" className="p-4 bg-white">
                  <h5 id="parking-ntunhs-name" className="text-gray-900 font-black text-sm md:text-md">
                    {t('北護大學停車場', 'NTUNHS Parking')}
                  </h5>
                  <p id="parking-ntunhs-desc" className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">
                    {t('步行約 5 分鐘', '5 mins walk')}
                  </p>
                </div>
                <a 
                  id="parking-ntunhs-link"
                  href="https://meee.com.tw/2zIBPq6.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                ></a>
              </div>

              {/* Zhenxing Park Parking */}
              <div id="parking-zhenxing" className="group relative flex flex-col bg-white rounded-[1.5rem] border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div id="parking-zhenxing-img-wrapper" className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    id="parking-zhenxing-img"
                    src="https://meee.com.tw/44hUaSt.jpg" 
                    alt="Zhenxing Park Parking" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div id="parking-zhenxing-info" className="p-4 bg-white">
                  <h5 id="parking-zhenxing-name" className="text-gray-900 font-black text-sm md:text-lg">
                    {t('振興公園停車場', 'Zhenxing Park')}
                  </h5>
                  <p id="parking-zhenxing-desc" className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">
                    {t('步行約 8 分鐘', '8 mins walk')}
                  </p>
                </div>
                <a 
                  id="parking-zhenxing-link"
                  href="https://meee.com.tw/44hUaSt.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                ></a>
              </div>

            </div>
            
            <div id="parking-notes" className="mt-8 text-center">
              <p id="parking-notes-text" className="text-gray-400 text-[10px] md:text-sm font-bold italic mb-2">
                {t('※ 會議期間車位有限，建議多加利用接駁車或大眾運輸工具', '※ Parking is limited; public transport is highly recommended.')}
              </p>
              <p id="parking-discount-text" className="text-red-600 text-xs md:text-base font-black leading-relaxed">
                {t(
                  '※ 6/27研討會當天，臺北榮總提供停車費半價優惠。請至報到處領取優惠券',
                  '※ On the day of the symposium (6/27), Taipei Veterans General Hospital offers a 50% discount on parking. Please obtain the discount coupon at the registration desk.'
                )}
              </p>
            </div>
          </div>

          {/* --- Hospital Map Section placed under Parking --- */}
          <div id="hospital-map-container" className="mt-8 flex flex-col">
            <div id="hospital-map-card" className="relative group p-4 bg-slate-50 rounded-[2rem] border border-gray-200 shadow-xl overflow-hidden flex flex-col justify-between h-full">
              <div>
                <h3 id="hospital-map-title" className="text-sm md:text-lg font-black text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {t('院內地圖', 'Hospital Map')}
                </h3>
                <div id="hospital-map-img-container" className="relative overflow-hidden rounded-xl bg-white flex items-center justify-center border border-gray-100 p-2">
                  <img 
                    id="hospital-map-img"
                    src="https://meee.com.tw/RSfci7b.jpg" 
                    alt="Hospital Map" 
                    className="max-w-full h-auto max-h-[75vh] md:max-h-[80vh] object-contain transition-transform duration-500 hover:scale-[1.01]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>

              <div id="hospital-map-footer" className="mt-4 flex justify-between items-center px-1">
                <span id="hospital-map-hint" className="text-[10px] md:text-sm text-gray-500 font-bold max-w-[65%] leading-tight">
                  {t('※ 點擊按鈕在新頁面查看院內地圖', '※ Click button to view in a new tab.')}
                </span>
                <a 
                  id="hospital-map-link"
                  href="https://meee.com.tw/RSfci7b.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] md:text-sm shadow-md hover:shadow-lg transition-all"
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

export default Venue;
