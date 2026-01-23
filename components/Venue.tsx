
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Venue: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="venue" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 sm:text-5xl tracking-tighter mb-4">
            {t('會議地點', 'Conference Venue')}
          </h2>
          <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xl shadow-lg">
            {t('醫學科技大樓 一樓大會議室', 'Medical Science & Technology Building, 1st Floor Conference Room')}
          </div>
          <p className="mt-6 text-xl text-gray-600 font-bold">
            {t('112 臺北市北投區石牌路二段 201 號', 'No. 201, Sec. 2, Shipai Rd., Beitou Dist., Taipei City 112')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Transportation Info (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Driving Card */}
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-2xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900">{t('開車路線', 'Driving Directions')}</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed font-bold">
                {t(
                  '國道一號（中山高）→由重慶北路交流道下（往士林方向），過百齡橋→(左轉) 承德路五、六段→(右轉) 石牌路一段→石牌路二段201號 (臺北榮民總醫院)',
                  'National Highway No. 1 → Exit at Chongqing North Road Interchange (towards Shilin) → Cross Bailing Bridge → (Left) Chengde Rd. Sec. 5/6 → (Right) Shipai Rd. Sec. 1 → No. 201, Sec. 2, Shipai Rd.'
                )}
              </p>
            </div>

            {/* Public Transport Card */}
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-2xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3l-3-3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900">{t('大眾運輸', 'Public Transportation')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-blue-600 font-black mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {t('接駁車 Shuttle Bus', 'Shuttle Bus')}
                  </p>
                  <p className="text-gray-700 font-bold">07:00 ~ 18:00</p>
                  <p className="text-sm text-gray-500 font-bold">{t('每 10 分鐘一班 (Every 10 mins)', 'Every 10 minutes')}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-blue-600 font-black mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {t('聯營公車 Bus', 'Bus Lines')}
                  </p>
                  <p className="text-gray-700 font-bold leading-tight">
                    小36, 536, 508, 128, 重慶幹線, 224, 602, 小8, 268, 612
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Button Container */}
            <div className="flex justify-center lg:justify-start pt-4">
               <a 
                href="https://www.google.com/maps/place/Taipei+Veterans+General+Hospital/@25.120267,121.520364,17z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-700 transition-all font-black text-xl shadow-xl transform hover:scale-105 active:scale-95"
              >
                {t('在 Google 地圖中開啟', 'Open in Google Maps')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Building Map & Guide (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* The Specific Building Map */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl border border-gray-100">
                <div className="overflow-hidden rounded-[2rem] bg-gray-50 flex items-center justify-center min-h-[300px]">
                  {/* Using direct meee.com.tw link. Sometimes appending file type helps. */}
                  <img 
                    src="https://meee.com.tw/RSfci7b.jpg" 
                    alt={t('醫院位置圖', 'Hospital Map')} 
                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110 shadow-inner"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('.png')) {
                        target.src = "https://meee.com.tw/RSfci7b.png";
                      }
                    }}
                  />
                </div>
                <div className="absolute top-8 left-8 bg-blue-600 text-white px-4 py-1 rounded-full font-black text-sm shadow-lg">
                  {t('醫院位置圖', 'Hospital Map')}
                </div>
              </div>
            </div>

            {/* Text Description Guide */}
            <div className="bg-blue-50/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-blue-100 shadow-sm">
              <h4 className="text-2xl font-black text-blue-900 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {t('如何抵達醫學科技大樓？', 'How to find the Building?')}
              </h4>
              <ul className="space-y-4 text-blue-900/80 font-bold text-lg leading-relaxed">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-black mt-1">1</span>
                  <p>{t('建議搭乘院內接駁車，於中正樓大門下車。', 'We recommend taking the internal shuttle bus and getting off at the main entrance of the Zhongzheng Building.')}</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-black mt-1">2</span>
                  <p>{t('抵達中正樓大門後，沿著外圍走至急診區。', 'After arriving at the Zhongzheng Building entrance, walk along the exterior path to the Emergency Department area.')}</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-black mt-1">3</span>
                  <p>{t('科技大樓位於急診室對面，「柯柏館 醫學科技大樓」。', 'The Technology Building is located across from the Emergency Department - "Kobber Hall, Medical Science & Technology Building".')}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full-Width Google Map Embed */}
        <div className="mt-20 group relative">
          <div className="absolute -inset-1 bg-blue-600 rounded-[2.5rem] blur opacity-10"></div>
          <div className="relative h-[500px] w-full rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.606275819777!2d121.5181743760644!3d25.12006733365313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ae531e133887%3A0x2649a26d3663a73c!2z6Ie65YyX6asu5rCR57i96Yar6Zmi!5e0!3m2!1szh-TW!2stw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Taipei Veterans General Hospital Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
