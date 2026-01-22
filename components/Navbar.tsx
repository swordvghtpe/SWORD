
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
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a 
                href="#home" 
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex items-center space-x-3 cursor-pointer group"
            >
              <img 
                src="https://meee.com.tw/TnhZtZH.jpg" 
                alt="SWORD-2026 Logo" 
                className="h-10 w-10 rounded-full object-cover shadow-sm group-hover:rotate-6 transition-transform" 
              />
              <span className="font-black text-2xl text-black tracking-tight">
                SWORD-2026
              </span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-4 py-2 rounded-xl text-lg font-black cursor-pointer transition-all duration-300 text-black hover:bg-blue-50 hover:text-blue-600`}
                >
                  {link.label}
                </a>
              ))}
              
              {/* Language Toggle Button - Desktop */}
              <button
                onClick={toggleLanguage}
                className="ml-4 px-4 py-1.5 rounded-full border-2 border-black/80 text-black font-black text-sm hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-3">
             {/* Language Toggle Button - Mobile (Visible outside menu for easier access) */}
             <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-full border border-black/50 text-black font-bold text-xs bg-white/50 backdrop-blur-sm"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full focus:outline-none text-black hover:bg-white/50 transition-colors"
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
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-2xl">
          <div className="px-4 pt-4 pb-8 space-y-2 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-black font-black block px-4 py-4 rounded-2xl hover:bg-blue-50 transition-colors text-xl"
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
