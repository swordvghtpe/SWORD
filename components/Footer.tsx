
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-white">
        <img 
          src="https://meee.com.tw/zEf4eA3.jpg" 
          alt="SWORD-2026 Back Cover" 
          className="w-full h-full object-cover"
        />
        {/* CC Attribution Label for the 101 image in footer */}
        <span className="absolute bottom-4 left-4 text-[10px] text-white/50 font-bold z-10 select-none">
          【cc免費使用】
        </span>
        <div className="absolute inset-0 bg-white/5"></div>
      </section>

      <footer className="bg-white border-t border-gray-100 text-black">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
            
            <div className="flex flex-col items-center md:items-start space-y-4">
              <img 
                src="https://meee.com.tw/TnhZtZH.jpg" 
                alt="Logo" 
                className="h-24 w-24 rounded-full object-cover shadow-lg border-2 border-white" 
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl font-black tracking-tighter">SWORD-2026</h3>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Symposium & Workshop on Olfactory Restoration</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-center md:text-left">
                <div>
                  <h4 className="text-lg font-black uppercase tracking-widest text-blue-600 mb-2">{t('主辦', 'Organizers')}</h4>
                  <ul className="space-y-1 text-sm font-bold text-gray-700">
                    <li>{t('臺北榮民總醫院', 'TVGH')}</li>
                    <li>{t('中華醫學會', 'CMA')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-widest text-blue-600 mb-2">{t('協辦', 'Co-orgs')}</h4>
                  <ul className="space-y-1 text-sm font-bold text-gray-700">
                    <li>{t('台灣鼻科醫學會', 'TRS')}</li>
                  </ul>
                </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-black uppercase tracking-widest text-blue-600 mb-2">{t('聯絡', 'Contact')}</h4>
              <p className="text-sm font-bold text-gray-800">{t('聯絡人：廖小姐', 'Ms. Gina Liao')}</p>
              <a 
                href="mailto:sword.vghtpe@gmail.com" 
                className="block mt-1 font-black text-sm hover:text-blue-600 transition-colors"
              >
                sword.vghtpe@gmail.com
              </a>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-gray-50 text-center space-y-2">
            <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase">
              SWORD-2026. Designed by Olfactory Research Team, TVGH
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
