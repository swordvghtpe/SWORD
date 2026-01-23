
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Back Cover Section / 封底 */}
      <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-white">
        <img 
          src="https://meee.com.tw/zEf4eA3.jpg" 
          alt="SWORD-2026 Back Cover" 
          className="w-full h-full object-cover"
        />
        {/* Subtle Overlay to match the bright theme */}
        <div className="absolute inset-0 bg-white/5"></div>
        
        {/* Professional CC Disclaimer for 101 Photo */}
        <div className="absolute bottom-4 right-6 z-20 pointer-events-none text-right">
          <p className="text-[10px] md:text-xs text-white/80 font-medium tracking-wider drop-shadow-lg">
            {t(
              '圖片來源：【cc免費使用】。本網頁所使用之影像資源均符合創用 CC 授權或開放授權規範，特此聲明以維護著作權益。',
              'Image source: 【CC Licensed for Free Use】. All visual assets on this site are used in accordance with Creative Commons or open-source licensing to respect intellectual property rights.'
            )}
          </p>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 text-black">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
            
            {/* Logo & Name */}
            <div className="flex flex-col items-center md:items-start space-y-6 flex-shrink-0">
              <img 
                src="https://meee.com.tw/TnhZtZH.jpg" 
                alt="SWORD-2026 Logo" 
                className="h-36 w-36 rounded-full object-cover shadow-2xl border-4 border-white ring-2 ring-gray-100 transform hover:scale-105 transition-transform duration-500" 
              />
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-black tracking-tighter">SWORD-2026</h3>
                <p className="text-sm font-bold text-gray-400 mt-1">Symposium & Workshop on Olfactory Restoration and Diagnosis</p>
              </div>
            </div>

            {/* Organizations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-center md:text-left">
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-widest text-blue-600 mb-4">{t('主辦單位', 'Organizers')}</h4>
                  <ul className="space-y-2 text-xl font-bold text-gray-800">
                    <li>{t('臺北榮民總醫院', 'Taipei Veterans General Hospital')}</li>
                    <li>{t('中華醫學會', 'Chinese Medical Association')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-widest text-blue-600 mb-4">{t('協辦單位', 'Co-organizers')}</h4>
                  <ul className="space-y-2 text-xl font-bold text-gray-800">
                    <li>{t('台灣鼻科醫學會', 'Taiwan Rhinology Society')}</li>
                  </ul>
                </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-right">
              <h4 className="text-2xl font-black uppercase tracking-widest text-blue-600 mb-4">{t('聯絡資訊', 'Contact Info')}</h4>
              <p className="text-xl font-bold text-gray-800">{t('聯絡人：廖小姐', 'Contact: Ms. Gina Liao')}</p>
              <a 
                href="mailto:sword.vghtpe@gmail.com" 
                className="block mt-2 font-black text-xl md:text-2xl hover:text-blue-600 transition-colors"
              >
                sword.vghtpe@gmail.com
              </a>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-gray-50 text-center space-y-3">
            <p className="text-gray-400 text-xs font-black tracking-widest uppercase">
              SWORD-2026. DESIGNED by Dr. Yun-Ting Chao's Olfactory Research Team
            </p>
            <p className="text-gray-500 text-xs font-black tracking-widest">
              {t(
                'SWORD-2026 網頁製作 臺北榮民總醫院 耳鼻喉頭頸醫學部 鼻頭頸科主任 趙勻廷醫師-嗅覺團隊', 
                'SWORD-2026 Website by Division Chief Yun-Ting Chao\'s Olfactory Team, Taipei VGH'
              )}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
