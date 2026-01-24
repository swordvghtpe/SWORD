
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToRegistration = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('registration');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 統一 Logo 在不同語系與螢幕下的尺寸
  const logoSizeClass = "h-40 w-40 md:h-56 md:w-56"; 

  return (
    <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image - Bright and high-key */}
      <img 
        src="https://meee.com.tw/u40Im8F.jpg" 
        alt="SWORD-2026 Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* CC Attribution Label */}
      <span className="absolute bottom-4 left-4 text-[10px] text-white/40 font-bold z-10 select-none">
        【cc免費使用】
      </span>
      
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
              className={`relative ${logoSizeClass} rounded-full shadow-2xl border-4 border-white object-cover`} 
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4 text-black">
            SWORD-2026
          </h1>
          <div className="space-y-4 mb-10">
            {/* 第二行：主要標題 */}
            <p className={`${language === 'en' ? 'text-xl md:text-5xl' : 'text-2xl md:text-5xl'} font-black text-black leading-tight`}>
              {t('2026 嗅覺異常診斷與治療研討會暨工作坊', 'Symposium & Workshop on Olfactory Restoration and Diagnosis')}
            </p>
            
            {/* 第三行：副標題。中文版特別顯示英文全稱，增加國際化視覺感 */}
            {language === 'zh' && (
              <p className="text-lg md:text-2xl font-bold text-black/70 tracking-wide uppercase leading-snug">
                Symposium & Workshop on Olfactory Restoration and Diagnosis
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 text-lg md:text-xl font-black text-black mb-12">
            <span className="flex items-center bg-white/80 px-6 py-3 rounded-2xl shadow-md border border-gray-100">
              <img src="https://meee.com.tw/X5HYFWj.png" alt="Calendar Icon" className="h-10 w-10 md:h-14 md:w-14 mr-4 object-contain" />
              {t('2026 / 06 / 27 (六)', 'June 27, 2026 (Sat)')}
            </span>
            <span className="flex items-center bg-white/80 px-6 py-3 rounded-2xl shadow-md border border-gray-100">
              <img src="https://meee.com.tw/sX1jugH.png" alt="Location Icon" className="h-10 w-10 md:h-14 md:w-14 mr-4 object-contain" />
              {t('臺北榮民總醫院', 'Taipei Veterans General Hospital')}
            </span>
          </div>

          <a 
            href="#registration"
            onClick={scrollToRegistration}
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-8 md:py-5 md:px-16 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_20px_50px_rgba(37,99,235,0.5)] active:scale-95 duration-300 ease-in-out shadow-xl cursor-pointer text-lg md:text-2xl"
          >
            {t('立即報名 / Register Now', 'Register Now')}
          </a>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </header>
  );
};

export default Header;
