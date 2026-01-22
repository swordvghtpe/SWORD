
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();

  const scrollToRegistration = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('registration');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image - Bright and high-key */}
      <img 
        src="https://meee.com.tw/u40Im8F.jpg" 
        alt="SWORD-2026 Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Light white overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[0.5px]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-start md:space-x-12">
        
        {/* Yellow Logo on the Left */}
        <div className="mb-8 md:mb-0 flex-shrink-0 transform hover:scale-105 transition-transform duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 rounded-full"></div>
            <img 
              src="https://meee.com.tw/TnhZtZH.jpg" 
              alt="SWORD-2026 Logo" 
              className="relative h-40 w-40 md:h-56 md:w-56 rounded-full shadow-2xl border-4 border-white object-cover" 
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight mb-2 text-black">
            SWORD-2026
          </h1>
          <div className="space-y-2 mb-8">
            <p className="text-2xl md:text-4xl font-bold text-black">
              {t('2026 嗅覺異常診斷與治療研討會', 'Symposium & Workshop on Olfactory Restoration and Diagnoses')}
            </p>
            {/* Show English subtitle only in Chinese mode to avoid redundancy, or keep it for style */}
             {t(
               <p className="text-xl md:text-2xl font-semibold text-black/80 tracking-wide uppercase">
                 Symposium & Workshop on Olfactory Restoration and Diagnoses
               </p>,
               null
             )}
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-8 text-lg font-bold text-black mb-10">
            <span className="flex items-center bg-white/80 px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
              </svg>
              {t('2026 / 06 / 27 (六)', 'June 27, 2026 (Sat)')}
            </span>
            <span className="flex items-center bg-white/80 px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t('臺北榮民總醫院', 'Taipei Veterans General Hospital')}
            </span>
          </div>

          <a 
            href="#registration"
            onClick={scrollToRegistration}
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-4 px-12 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] active:scale-95 duration-300 ease-in-out shadow-lg cursor-pointer text-xl"
          >
            {t('立即報名 / Register Now', 'Register Now')}
          </a>
        </div>
      </div>

      {/* Professional CC Disclaimer */}
      <div className="absolute bottom-4 right-6 z-20 pointer-events-none text-right">
        <p className="text-[10px] md:text-xs text-white/80 font-medium tracking-wider drop-shadow-lg">
          {t(
            '圖片來源：【cc免費使用】。本網頁所使用之影像資源均符合創用 CC 授權或開放授權規範，特此聲明以維護著作權益。',
            'Image source: 【CC Licensed for Free Use】. All visual assets on this site are used in accordance with Creative Commons or open-source licensing to respect intellectual property rights.'
          )}
        </p>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </header>
  );
};

export default Header;
