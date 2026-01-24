
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Venue: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="venue" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter mb-4 whitespace-nowrap">
            {t('會議地點', 'Conference Venue')}
          </h2>
          <div className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full font-black text-[10px] md:text-xl shadow-md">
            {t('醫學科技大樓 一樓大會議室', 'MST Building, 1F')}
          </div>
          <p className="mt-4 text-[10px] md:text-xl text-gray-600 font-bold">
            {t('112 臺北市北投區石牌路二段 201 號', 'No. 201, Sec. 2, Shipai Rd., Taipei')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100">
              <h3 className="text-sm md:text-2xl font-black text-gray-900 mb-3 whitespace-nowrap">{t('開車路線', 'Driving')}</h3>
              <p className="text-gray-700 text-xs md:text-lg leading-relaxed font-bold">
                {t(
                  '國道一號（中山高）→由重慶北路交流道下（往士林方向），過百齡橋→（左轉）承德路五、六段→（右轉）石牌路一段→石牌路二段201號',
                  'Nat\'l Hwy 1 (Chongqing N. Rd. Exit) → Bailing Bridge → (Left) Chengde Rd. Sec. 5/6 → (Right) Shipai Rd. Sec. 1 → No. 201 Shipai Rd. Sec. 2'
                )}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100">
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
            <div className="relative group p-2 bg-gray-50 rounded-[1.5rem] border border-gray-100">
              <img 
                src="https://meee.com.tw/RSfci7b.jpg" 
                alt="Map" 
                className="w-full h-auto rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
