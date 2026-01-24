
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const WelcomeMessage: React.FC = () => {
  const { language, t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const chairmanImgSrc = "https://meee.com.tw/qJfO68E.jpg";
  const bgImg = "https://meee.com.tw/zEf4eA3.jpg";
  const signatureImgSrc = "https://meee.com.tw/La0v76Y.jpg";
  const signatureEnImgSrc = "https://meee.com.tw/SGLghJ2.jpg";
  const sealImgSrc = "https://meee.com.tw/UhIm98T.jpg";

  return (
    <section id="welcome" className="relative py-12 md:py-16 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <img src={bgImg} alt="Background" className="w-full h-full object-cover opacity-10" />
        {/* CC Attribution Label for the 101 image */}
        <span className="absolute bottom-2 left-4 text-[9px] text-black/20 font-bold select-none">
          【cc免費使用】
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-black tracking-tighter mb-4 whitespace-nowrap">
            {t('歡迎詞', 'Welcome Message')}
          </h2>
          <div className="w-12 h-1 bg-gray-200 mx-auto mt-1 rounded-full"></div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 mb-8 lg:mb-0">
            <div className="sticky top-32">
                <div className="relative group p-1 bg-white rounded-3xl shadow-lg border border-gray-100">
                    {imgError ? (
                        <div className="relative w-full h-auto rounded-2xl aspect-[3/4] bg-gray-50 flex flex-col items-center justify-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    ) : (
                        <img 
                            className="relative w-full h-auto rounded-2xl object-cover object-top aspect-[3/4] mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
                            src={chairmanImgSrc}
                            alt={t("會議主席 趙勻廷 醫師", "Conference Chair Dr. Yun-Ting Chao")} 
                            onError={() => setImgError(true)}
                        />
                    )}
                </div>
                 <div className="mt-6 text-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xl md:text-3xl font-black text-black mb-1">
                        {t('趙勻廷 醫師', 'Dr. Yun-Ting Chao')}
                    </p>
                    <p className="text-sm md:text-xl text-black font-black mt-1 uppercase tracking-widest bg-blue-50/50 inline-block px-6 py-2 rounded-full border border-blue-100">
                        {t('會議主席', 'Conference Chair')}
                    </p>
                 </div>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="bg-white/60 p-6 md:p-12 rounded-[2rem] border border-gray-100 shadow-sm">
                {language === 'zh' ? (
                    <div className="space-y-5 text-base md:text-xl text-black leading-relaxed text-justify font-bold">
                       <p className="font-black text-black text-lg md:text-2xl mb-6">各位先進、同好您們好：</p>
                       <p>誠摯邀請您於2026年6月27日蒞臨參加由臺北榮民總醫院鼻頭頸科主辦的「嗅覺異常診斷與治療研討會暨工作坊（Symposium & Workshop on Olfactory Restoration and Diagnosis, SWORD）」。</p>
                       <p>近年來，嗅覺功能障礙逐漸成為全球關注的重要醫學議題。兩年前，臺北榮總舉辦全國首創嗅覺工作坊，獲得熱烈回響。本次 SWORD 會議將以「診斷」與「重建」為核心，打造學術深度與臨床實用兼具的平台。</p>
                       <p>活動涵蓋人類嗅覺基礎、特徵表現、認知功能關聯及手術治療最新進展。我們亦邀請 Thomas Hummel 教授、Eri Mori 教授及 Xinni Xu 醫師等國際專家共同參與。</p>
                       <p>下午工作坊涵蓋各種評估工具、影像評估、動物模型及 PRP 注射實作。誠摯邀請各位先進共襄盛舉，一同探索嗅覺醫學的未來。</p>

                       <div className="mt-12 pt-8 border-t border-gray-200 flex flex-row justify-between items-end">
                            <div className="flex items-center">
                                <img src={sealImgSrc} alt="Seal" className="h-20 md:h-32 w-auto object-contain opacity-90" />
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-lg md:text-2xl font-black text-black mb-1">會議主席</p>
                                <img src={signatureImgSrc} alt="Signature" className="h-12 md:h-20 w-auto mb-1 mix-blend-multiply" />
                                <p className="font-black text-black text-xl md:text-3xl mb-3">趙勻廷 敬上</p>
                                <div className="text-right text-xs md:text-base font-black opacity-70">
                                    <p>臺北榮民總醫院</p>
                                    <p>耳鼻喉頭頸醫學部 鼻頭頸科主任</p>
                                </div>
                            </div>
                       </div>
                    </div>
                ) : (
                    <div className="space-y-5 text-base md:text-xl text-black leading-relaxed text-justify font-bold">
                       <p className="font-black text-black text-lg md:text-2xl mb-6">Dear Colleagues and Friends,</p>
                       <p>It is our great pleasure to invite you to the SWORD-2026 symposium and workshop to be held on June 27, 2026, in Taipei, organized by the Division of Rhinology, TVGH.</p>
                       <p>This meeting focuses on diagnosis and restoration, integrating cutting-edge research with clinical experience. We are honored to welcome distinguished international speakers, including Prof. Thomas Hummel, Prof. Eri Mori, and Dr. Xinni Xu.</p>
                       <p>The afternoon workshop provides hands-on training in olfactory assessments and PRP techniques. We sincerely invite you to join us in exploring the future of olfactory medicine together.</p>

                       <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-black font-black mb-4">With best regards,</p>
                            <div className="flex flex-row items-end justify-between gap-4">
                                <div className="flex flex-col items-start">
                                    <p className="text-lg md:text-2xl font-black text-black">Conference Chair</p>
                                    <img src={signatureEnImgSrc} alt="Signature" className="h-12 md:h-20 w-auto my-2 mix-blend-multiply" />
                                    <p className="font-black text-black text-lg md:text-2xl mb-1">Yun-Ting Chao, M.D., Ph.D.</p>
                                    <div className="text-[10px] md:text-sm font-black opacity-70 leading-tight">
                                      <p>Division Chief in Rhinology, TVGH</p>
                                      <p>Department of Otorhinolaryngology-Head and Neck Surgery</p>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <img src={sealImgSrc} alt="Seal" className="h-28 w-auto object-contain opacity-90" />
                                </div>
                            </div>
                       </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
