import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Venue: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="venue" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter mb-4 whitespace-nowrap">
            {t('會議地點', 'Conference Venue')}
          </h2>
          <div className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full font-black text-[10px] md:text-xl shadow-md">
            {t('醫學科技大樓 一樓大會議室', 'Medical Science & Technology Building, 1F')}
          </div>
          <p className="mt-4 text-[10px] md:text-xl text-gray-600 font-bold">
            {t('112 臺北市北投區石牌路二段 201 號', 'No. 201, Sec. 2, Shipai Rd., Taipei')}
          </p>
        </div>

        {/* Transport & Hospital Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-sm md:text-2xl font-black text-gray-900 mb-3 whitespace-nowrap">{t('開車路線', 'Driving')}</h3>
              <p className="text-gray-700 text-xs md:text-lg leading-relaxed font-bold">
                {t(
                  '國道一號（中山高）→由重慶北路交流道下（往士林方向），過百齡橋→（左轉）承德路五、六段→（右轉）石牌路一段→石牌路二段201號',
                  'Nat\'l Hwy 1 (Chongqing N. Rd. Exit) → Bailing Bridge → (Left) Chengde Rd. Sec. 5/6 → (Right) Stone Rd. Sec. 1 → No. 201 Stone Rd. Sec. 2'
                )}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-sm md:text-2xl font-black text-gray-900 mb-3 whitespace-nowrap">{t('大眾運輸', 'Transport')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-blue-600 font-black text-[10px] mb-1">{t('接駁車', 'Shuttle')}</p>
                  <p className="text-gray-700 font-bold text-[10px] md:text-sm whitespace-nowrap">
                    {t('每 10 分鐘一班 (07:00 ~ 18:00)', 'Every 10 mins (07:00 ~ 18:00)')}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-blue-600 font-black text-[10px] mb-1">{t('公車', 'Bus')}</p>
                  <p className="text-gray-700 font-bold text-[9px] md:text-sm">重慶幹線, 508, 602, 小8, 224</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative group p-2 bg-gray-50 rounded-[1.5rem] border border-gray-100 h-full shadow-sm">
              <img 
                src="https://meee.com.tw/RSfci7b.jpg" 
                alt="Hospital Map" 
                className="w-full h-auto rounded-xl shadow-sm object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black text-blue-600 shadow-sm">
                {t('院內地圖', 'Hospital Map')}
              </div>
            </div>
          </div>
        </div>

        {/* --- Optimized Parking Information Section --- */}
        <div className="bg-slate-50 p-6 md:p-12 rounded-[2.5rem] border border-gray-200">
          <div className="flex items-center mb-8">
            <div className="bg-blue-600 p-2 rounded-xl mr-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">
              {t('停車場資訊', 'Parking Information')}
            </h3>
          </div>

          {/* 3-Column Grid for Smaller, Compact Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* VGH On-site Parking */}
            <div className="group relative flex flex-col bg-white rounded-[1.5rem] border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src="https://meee.com.tw/Wt6H0IU.jpg" 
                  alt="VGH Parking" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] md:text-xs font-black shadow-md">
                  {t('院內推薦', 'Hospital')}
                </div>
              </div>
              <div className="p-4 bg-white">
                <h5 className="text-gray-900 font-black text-sm md:text-lg">
                  {t('北榮院內停車場', 'Hospital On-site')}
                </h5>
                <p className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">
                  {t('院內主要停車區', 'Main Campus Area')}
                </p>
              </div>
              <a 
                href="https://meee.com.tw/Wt6H0IU" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              ></a>
            </div>

            {/* NTUNHS Parking */}
            <div className="group relative flex flex-col bg-white rounded-[1.5rem] border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src="https://meee.com.tw/95MuMHW.jpg" 
                  alt="NTUNHS Parking" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h5 className="text-gray-900 font-black text-sm md:text-lg">
                  {t('北護大學停車場', 'NTUNHS Parking')}
                </h5>
                <p className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">
                  {t('步行約 5 分鐘', '5 mins walk')}
                </p>
              </div>
              <a 
                href="https://meee.com.tw/95MuMHW" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              ></a>
            </div>

            {/* Zhenxing Park Parking */}
            <div className="group relative flex flex-col bg-white rounded-[1.5rem] border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src="https://meee.com.tw/WfkzKBj.jpg" 
                  alt="Zhenxing Park Parking" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h5 className="text-gray-900 font-black text-sm md:text-lg">
                  {t('振興公園停車場', 'Zhenxing Park')}
                </h5>
                <p className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">
                  {t('步行約 8 分鐘', '8 mins walk')}
                </p>
              </div>
              <a 
                href="https://meee.com.tw/WfkzKBj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              ></a>
            </div>

          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-[10px] md:text-sm font-bold italic">
              {t('※ 會議期間車位有限，建議多加利用接駁車或大眾運輸工具', '※ Parking is limited; public transport is highly recommended.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;