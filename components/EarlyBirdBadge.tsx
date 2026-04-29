
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock, X, PartyPopper } from 'lucide-react';

const EarlyBirdBadge: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 1 second delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[60] group cursor-pointer"
        >
          <div className="relative">
            {/* Pulsing glow background */}
            <div className="absolute inset-0 bg-red-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 animate-pulse transition-opacity"></div>
            
            <div className="relative bg-gradient-to-br from-red-600 to-orange-600 text-white p-4 md:p-5 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-90 flex items-center gap-1">
                    <PartyPopper className="w-3 h-3" />
                    {t('限時早鳥', 'Early Bird')}
                  </span>
                </div>
                
                <h4 className="text-sm md:text-lg font-black leading-tight text-center">
                  {t('5/31 截止！', 'Ends 5/31!')}
                </h4>
                
                <a 
                  href="#registration" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-2 w-full py-2 bg-white text-red-600 rounded-lg text-[10px] md:text-xs font-black text-center hover:bg-orange-50 transition-colors shadow-sm"
                >
                  {t('查看詳情', 'View Details')}
                </a>
              </div>

              {/* Close button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-600 rounded-full flex items-center justify-center border-2 border-red-600 shadow-lg hover:bg-red-50 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EarlyBirdBadge;
