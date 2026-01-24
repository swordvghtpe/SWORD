
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
    { href: '#registration', label: t('會議報名', 'Registration') },
    { href: '#venue', label: t('會議地點', 'Venue') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-50' : 'bg-white/10 backdrop-blur-[2px]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <a 
                href="#home" 
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex items-center space-x-2 cursor-pointer group"
            >
              <img 
                src="https://meee.com.tw/TnhZtZH.jpg" 
                alt="Logo" 
                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover" 
              />
              <span className="font-black text-sm md:text-xl text-black tracking-tight whitespace-nowrap">
                SWORD-2026
              </span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-2 py-2 rounded-lg text-xs md:text-sm font-black cursor-pointer transition-all text-black hover:text-blue-600 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
              
              <button
                onClick={toggleLanguage}
                className="ml-2 px-2 py-1 rounded-full border border-black/80 text-black font-black text-[9px] md:text-[10px] hover:bg-black hover:text-white transition-all whitespace-nowrap"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-2">
             <button
                onClick={toggleLanguage}
                className="px-2 py-0.5 rounded-full border border-black/30 text-black font-bold text-[9px] bg-white/50 whitespace-nowrap"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-lg text-black focus:outline-none"
            >
              <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-0.5 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-black font-black block px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-xs whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
