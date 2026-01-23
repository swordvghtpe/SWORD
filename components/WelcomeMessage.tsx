
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
    <section id="welcome" className="relative py-24 overflow-hidden bg-white">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={bgImg} alt="Background" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black tracking-tighter mb-8">
            {t('會長歡迎詞', 'Welcome Message')}
          </h2>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
          {/* Chairman Image Section */}
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <div className="sticky top-32">
                <div className="relative group p-2 bg-white rounded-3xl shadow-xl border border-gray-100">
                    {imgError ? (
                        <div className="relative w-full h-auto rounded-2xl aspect-[3/4] bg-gray-50 flex flex-col items-center justify-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                 <div className="mt-8 text-center bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-4xl font-black text-black mb-2">
                        {t('趙勻廷 醫師', 'Dr. Yun-Ting Chao')}
                    </p>
                    <p className="text-2xl text-black font-black mt-2 uppercase tracking-widest bg-blue-50/50 inline-block px-8 py-3 rounded-full border border-blue-100 shadow-sm">
                        {t('會議主席', 'Conference Chair')}
                    </p>
                 </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="lg:col-span-8">
            <div className="bg-white/60 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
                {language === 'zh' ? (
                    <div className="space-y-6 text-xl text-black leading-relaxed text-justify font-bold">
                       <p className="font-black text-black text-2xl mb-8">各位先進、同好您們好：</p>
                       
                       <p>
                         誠摯邀請您於2026年6月27日蒞臨參加由臺北榮民總醫院鼻頭頸科主辦的「嗅覺異常診斷與治療研討會暨工作坊（Symposium & Workshop on Olfactory Restoration and Diagnosis, SWORD）」。本次會議並由臺灣鼻科醫學會及中華醫學會協辦，謹代表籌備團隊，向所有與會貴賓表達最誠摯的歡迎與感謝。
                       </p>

                       <p>
                         近年來，嗅覺功能障礙逐漸成為全球關注的重要醫學議題，也帶動相關研究與臨床治療的快速發展。兩年前，臺北榮總於臺灣鼻科醫學會年會期間舉辦全國首創的會前嗅覺工作坊，獲得國內外學者與臨床醫師的熱烈回響。在各界同道的期待下，我們進一步規劃本次 SWORD 會議，並以「診斷」與「重建」為核心主軸，整合最新研究成果與臨床實務經驗，期望打造一個兼具學術深度與臨床實用性的交流平台。
                       </p>

                       <p>
                         本次活動為一日整合型課程，上午舉辦學術研討會，下午則進行實作導向的工作坊。研討會內容將涵蓋人類嗅覺功能的基礎與臨床面向、各類嗅覺異常的特徵與表現、嗅覺與認知功能退化之關聯，以及目前手術與非手術治療的最新進展。
                       </p>

                       <p>
                         我們亦十分榮幸邀請多位國際知名學者蒞臨，包括來自德國德勒斯登大學嗅味覺中心的 Thomas Hummel 教授、日本東京慈惠會醫學大學的 Eri Mori，以及新加坡國立大學的 Xinni Xu，共同分享其在嗅覺研究與臨床治療上的豐富經驗與獨到見解。
                       </p>

                       <p>
                         下午的工作坊將以小組輪站方式進行，內容涵蓋各種嗅味覺功能評估工具、影像學評估、動物模型介紹，以及臨床應用日益受到重視的嗅覺訓練與血小板濃縮液（PRP）注射實作，期望協助與會者將理論知識有效轉化為臨床實務能力，實際服務嗅覺異常病人。
                       </p>

                       <p>
                         我們期盼透過本次 SWORD 研討會暨工作坊，促進國內外耳鼻喉科及相關領域專家的深度交流，激盪創新思維，並為嗅覺異常病人的診斷與治療帶來實質助益。誠摯邀請各位先進共襄盛舉，與我們一同探索嗅覺醫學的未來發展。
                       </p>

                       {/* Signature Section (Chinese) - Logo on the Left */}
                       <div className="mt-16 pt-10 border-t border-gray-200 flex flex-row justify-between items-end">
                            <div className="flex items-center">
                                <img 
                                    src={sealImgSrc} 
                                    alt="Seal" 
                                    className="h-32 w-auto object-contain opacity-90"
                                />
                            </div>
                            
                            <div className="flex flex-col items-end justify-between">
                                <p className="text-3xl font-black text-black mb-1">會議主席</p>
                                <img 
                                    src={signatureImgSrc} 
                                    alt="趙勻廷 簽名" 
                                    className="h-20 w-auto mb-2 mix-blend-multiply" 
                                />
                                <p className="font-black text-black text-3xl mb-4">趙勻廷 敬上</p>
                                <div className="text-right">
                                    <p className="text-black text-lg font-black opacity-70">臺北榮民總醫院</p>
                                    <p className="text-black text-lg font-black opacity-70 leading-tight">耳鼻喉頭頸醫學部 鼻頭頸科主任</p>
                                </div>
                            </div>
                       </div>
                    </div>
                ) : (
                    <div className="space-y-6 text-xl text-black leading-relaxed text-justify font-bold">
                       <p className="font-black text-black text-2xl mb-8">Dear Colleagues and Friends,</p>

                       <p>
                         It is our great pleasure to invite you to the Symposium & Workshop on Olfactory Restoration and Diagnosis (SWORD), to be held on June 27, 2026, in Taipei. This meeting is organized by the Division of Rhinology, Taipei Veterans General Hospital, with the collaboration of the Taiwan Rhinology Society and the Chinese Medical Association. On behalf of the organizing committee, I would like to extend our warmest welcome and sincere appreciation to all participants.
                       </p>

                       <p>
                         In recent years, olfactory dysfunction has emerged as an important global medical issue, driving rapid advances in both scientific research and clinical management. Two years ago, Taipei Veterans General Hospital organized Taiwan's first pre-congress olfactory workshop during the annual meeting of the Taiwan Rhinology Society, which received enthusiastic responses from both domestic and international clinicians and researchers. Encouraged by this strong interest, we now present SWORD, a meeting centered on the dual themes of diagnosis and restoration, integrating cutting-edge research with real-world clinical experience to create a platform that combines academic depth with practical clinical relevance.
                       </p>

                       <p>
                         This one-day integrated course consists of a scientific symposium in the morning and a hands-on workshop in the afternoon. The morning symposium will cover a broad spectrum of topics, including human olfactory function, various types of olfactory disorders, the relationship between olfaction and cognitive decline, as well as current advances in both surgical and non-surgical treatments.
                       </p>

                       <p>
                         We are honored to welcome distinguished international speakers, including Professor Thomas Hummel from the Smell and Taste Clinic at TU Dresden, Eri Mori from The Jikei University School of Medicine, and Xinni Xu from the National University of Singapore. They will share their extensive experience and insights into olfactory research and clinical management.
                       </p>

                       <p>
                         The afternoon workshop will be conducted in small-group rotation stations and will introduce a wide range of practical topics, including olfactory and guestatory function assessments, imaging evaluation, animal models, as well as hands-on training in olfactory training protocols and platelet-rich plasma (PRP) injection techniques, which have gained increasing attention in clinical practice.
                       </p>

                       <p>
                         Through this SWORD symposium and workshop, we hope to foster meaningful international collaboration, stimulate innovative thinking, and provide tangible benefits for the diagnosis and management of patients with olfactory disorders. We sincerely invite you to join us in exploring the future of olfactory medicine together.
                       </p>

                       {/* English Signature Section - Logo on the RIGHT of the signature block */}
                       <div className="mt-16 pt-10 border-t border-gray-200">
                            <p className="text-black font-black mb-6">With best regards,</p>
                            
                            <div className="flex flex-row items-end justify-between gap-8">
                                {/* Left Column: Handwritten Signature and Info */}
                                <div className="flex flex-col items-start overflow-hidden">
                                    <p className="text-3xl font-black text-black mb-4">Conference Chair</p>
                                    
                                    <img 
                                        src={signatureEnImgSrc} 
                                        alt="Yun-Ting Chao Signature" 
                                        className="h-20 w-auto mb-4 mix-blend-multiply" 
                                    />
                                    
                                    <p className="font-black text-black text-2xl mb-2 whitespace-nowrap">Yun-Ting Chao, M.D., Ph.D.</p>
                                    
                                    <div className="space-y-1">
                                      <p className="text-black text-lg font-black opacity-70">Division Chief in Rhinology and Skull Base Surgery</p>
                                      <div className="leading-tight">
                                        <p className="text-black text-lg font-black opacity-70">Department of Otorhinolaryngology-</p>
                                        <p className="text-black text-lg font-black opacity-70">Head and Neck Surgery</p>
                                      </div>
                                      <p className="text-black text-lg font-black opacity-70 mt-2">Taipei Veterans General Hospital, Taipei, Taiwan</p>
                                    </div>
                                </div>

                                {/* Right Column: Seal Image (Logo) */}
                                <div className="flex-shrink-0 mb-2">
                                    <img 
                                        src={sealImgSrc} 
                                        alt="Seal" 
                                        className="h-36 w-auto object-contain opacity-90 transform rotate-2"
                                    />
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
