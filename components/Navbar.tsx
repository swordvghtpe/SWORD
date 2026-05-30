
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        window.history.pushState(null, '', id);
    }
  };

  const navLinks = [
    { href: '#welcome', label: t('歡迎詞', 'Welcome') },
    { href: '#speakers', label: t('研討會講師', 'Speakers') },
    { href: '#agenda', label: t('會議議程', 'Agenda') },
    { href: '#workshop2024', label: t('2024-Workshop', '2024-Workshop') },
    { href: '#registration', label: t('會議報名', 'Registration') },
    { href: '#venue', label: t('會議地點', 'Venue') },
    { href: '#location', label: t('會場位置', 'Venue Location') },
    { href: '#floormap', label: t('大會平面圖', 'Floor Plan') },
    { href: '#sponsors', label: t('贊助廠商', 'Sponsors') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-50' : 'bg-white/10 backdrop-blur-[2px]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-24">
          <div className="flex-shrink-0">
            <a 
                href="#home" 
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex items-center space-x-2 cursor-pointer group"
            >
              <img 
                src="https://meee.com.tw/TnhZtZH.jpg" 
                alt="Logo" 
                className="h-8 w-8 md:h-12 md:w-12 rounded-full object-cover" 
              />
              <span className="font-black text-sm md:text-2xl text-black tracking-tight whitespace-nowrap">
                SWORD-2026
              </span>
            </a>
          </div>
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center space-x-0.5 xl:space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-1.5 xl:px-2.5 py-2 rounded-lg text-xs xl:text-sm font-black cursor-pointer transition-all text-black hover:text-blue-600 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
              
              <button
                onClick={toggleLanguage}
                className="ml-2 xl:ml-4 px-4 xl:px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 text-white font-black text-xs xl:text-sm transition-all whitespace-nowrap transform active:scale-95 shadow-md flex items-center gap-1 xl:gap-1.5"
                title={language === 'zh' ? 'Switch to English' : '切換為中文'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 xl:h-4 xl:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2m-4-3h1m1 5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-2">
             <button
                onClick={toggleLanguage}
                className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 text-white font-black text-sm whitespace-nowrap transform active:scale-95 shadow-md flex items-center gap-1.5"
                title={language === 'zh' ? 'Switch to English' : '切換為中文'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2m-4-3h1m1 5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {language === 'zh' ? 'EN' : '中文'}
              </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-lg text-black focus:outline-none"
            >
              <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-0.5 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-black font-black block px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl border-2 border-black text-black font-black text-sm hover:bg-black hover:text-white transition-all text-center"
              >
                {language === 'zh' ? '切換為 English (EN)' : 'Switch to 中文 (ZH)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
