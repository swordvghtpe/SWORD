import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// --- CONFIGURATION ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYXQFkSwYRqvC3sFutIQpFzJyyrOajlEc_5W1itNkfKar-8rbK8D5oC-9MKFo4P-I/exec";
// ---------------------

const domesticFees = [
  { titleZh: '住院醫師', titleEn: 'Resident', earlyBird: 'NT$ 2,500', regular: 'NT$ 3,500' },
  { titleZh: '會員醫師\n(台灣鼻科醫學會)', titleEn: 'Member\n(Taiwan Rhinology Society)', earlyBird: 'NT$ 3,500', regular: 'NT$ 4,500' },
  { titleZh: '主治醫師/其他專業人士', titleEn: 'Physician / Other Professionals', earlyBird: 'NT$ 4,500', regular: 'NT$ 5,500' },
];

const internationalFees = [
    { title: 'Attendee', earlyBird: 'USD $ 100', regular: 'USD $ 150' },
];

interface FormData {
    name: string;
    email: string;
    phone: string;
    organization: string;
    category: string;
    dietary: string;
    remittanceAccountSuffix: string;
    receiptFile: string; 
    note: string;
}

const Registration: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('domestic');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'validation-error'>('idle');
  const [fileName, setFileName] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: language === 'zh' ? '住院醫師' : 'Resident',
    dietary: language === 'zh' ? '葷食' : 'Standard',
    remittanceAccountSuffix: '',
    receiptFile: '',
    note: ''
  });

  // 當分頁或語系改變時，同步更新 category 與 dietary 的值，確保下拉選單狀態正確
  useEffect(() => {
    if (activeTab === 'international') {
      setFormData(prev => ({ ...prev, category: 'International Attendee' }));
    } else {
      // 國內報名身分同步
      const found = domesticFees.find(f => f.titleZh === formData.category || f.titleEn === formData.category);
      if (found) {
        setFormData(prev => ({ ...prev, category: language === 'zh' ? found.titleZh : found.titleEn }));
      } else {
        setFormData(prev => ({ ...prev, category: language === 'zh' ? '住院醫師' : 'Resident' }));
      }
    }

    // 飲食需求同步
    if (formData.dietary === '葷食' || formData.dietary === 'Standard') {
      setFormData(prev => ({ ...prev, dietary: language === 'zh' ? '葷食' : 'Standard' }));
    } else if (formData.dietary === '素食' || formData.dietary === 'Vegetarian') {
      setFormData(prev => ({ ...prev, dietary: language === 'zh' ? '素食' : 'Vegetarian' }));
    }
  }, [activeTab, language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert(t('檔案大小超過 5MB。', 'File exceeds 5MB.'));
            e.target.value = '';
            setFileName('');
            return;
        }
        setFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, receiptFile: reader.result as string }));
            if (submitStatus === 'validation-error') setSubmitStatus('idle');
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.receiptFile) {
        setSubmitStatus('validation-error');
        return;
    }
    setIsSubmitting(true);
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        });
        const result = await response.json();
        if (result.result === 'success') {
            setSubmitStatus('success');
            setTimeout(() => { 
                setShowModal(false); 
                setSubmitStatus('idle'); 
                setFileName('');
                setFormData({
                    name: '', email: '', phone: '', organization: '',
                    category: language === 'zh' ? '住院醫師' : 'Resident',
                    dietary: language === 'zh' ? '葷食' : 'Standard',
                    remittanceAccountSuffix: '', receiptFile: '', note: ''
                });
            }, 3000);
        } else { throw new Error('Error'); }
    } catch (error) { setSubmitStatus('error'); } 
    finally { setIsSubmitting(false); }
  };

  return (
    <section id="registration" className="py-12 md:py-20 bg-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter whitespace-nowrap">
            {t('會議報名', 'Registration')}
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-[1.5rem] shadow-xl overflow-hidden border border-orange-100">
          <div className="flex bg-gray-50 p-1">
            <button onClick={() => setActiveTab('domestic')} className={`flex-1 py-2 text-center font-black text-xs md:text-lg rounded-lg transition-all whitespace-nowrap ${activeTab === 'domestic' ? 'bg-orange-500 text-white shadow' : 'text-gray-400'}`}>
              {t('國內', 'Domestic')}
            </button>
            <button onClick={() => setActiveTab('international')} className={`flex-1 py-2 text-center font-black text-xs md:text-lg rounded-lg transition-all whitespace-nowrap ${activeTab === 'international' ? 'bg-orange-500 text-white shadow' : 'text-gray-400'}`}>
              {t('國外', 'International')}
            </button>
          </div>

          <div className="p-2 md:p-12">
            <div className="overflow-x-auto rounded-xl border border-orange-100 mb-6">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-orange-50 text-orange-900">
                    <th className="px-0.5 py-3 font-black text-[10px] md:text-lg whitespace-nowrap">{t('職稱', 'Title')}</th>
                    <th className="px-0.5 py-3 font-black text-[10px] md:text-lg whitespace-nowrap">{t('早鳥價', 'Early')}</th>
                    <th className="px-0.5 py-3 font-black text-[10px] md:text-lg whitespace-nowrap">{t('原價', 'Regular')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {(activeTab === 'domestic' ? domesticFees : internationalFees).map((fee, index) => (
                    <tr key={index} className="border-b border-orange-50 last:border-0">
                      <td className="px-0.5 py-3 font-bold text-gray-800 text-[10px] md:text-lg whitespace-pre-line leading-tight">
                        {t((fee as any).titleZh || (fee as any).title, (fee as any).titleEn || (fee as any).title)}
                      </td>
                      <td className="px-0.5 py-3 font-black text-[11px] md:text-2xl text-orange-600 whitespace-nowrap">{fee.earlyBird}</td>
                      <td className="px-0.5 py-3 font-black text-[11px] md:text-2xl text-gray-300 whitespace-nowrap">{fee.regular}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-center font-black text-red-600 bg-red-50 py-2 px-4 rounded-lg text-[9px] md:text-lg italic mb-6 whitespace-nowrap">
                {t('※ 2026/04/30 前報名享早鳥價', '※ Early-bird through April 30, 2026.')}
            </p>

            <div className="bg-[#f97316] p-4 md:p-8 rounded-[1.2rem] text-white shadow-lg mb-8">
              <h4 className="text-sm md:text-2xl font-black border-b border-white/20 pb-2 mb-4 whitespace-nowrap">{t('匯款資訊', 'Remittance')}</h4>
              {activeTab === 'domestic' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] md:text-xl">
                  <div className="md:col-span-2">
                    <p className="opacity-70 text-[8px] md:text-[10px] uppercase">Beneficiary Name</p>
                    <p className="font-black text-sm md:text-2xl whitespace-nowrap">{t('台灣鼻科醫學會', 'Taiwan Rhinology Society')}</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <p className="opacity-70 text-[8px] md:text-[10px] uppercase mb-1">{t('ATM / 銀行匯款', 'Bank Transfer')}</p>
                    <p className="font-bold text-[10px] md:text-base">合庫(006)台大分行</p>
                    <p className="text-sm md:text-2xl font-black font-mono mt-1">1014-717-101612</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <p className="opacity-70 text-[8px] md:text-[10px] uppercase mb-1">{t('郵局劃撥', 'Postal Transfer')}</p>
                    <p className="font-bold text-[10px] md:text-base">{t('郵局劃撥帳號', 'Postal Account')}</p>
                    <p className="text-sm md:text-2xl font-black font-mono mt-1">31617274</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] md:text-lg">
                  <div><p className="opacity-70 text-[8px] md:text-[10px] uppercase">Swift</p><p className="font-bold whitespace-nowrap">TACBTWTP</p></div>
                  <div><p className="opacity-70 text-[8px] md:text-[10px] uppercase">Account NO</p><p className="text-sm md:text-2xl font-black whitespace-nowrap">1346-717-036449</p></div>
                </div>
              )}
            </div>

            <div className="text-center">
                <button onClick={() => setShowModal(true)} className="bg-orange-600 hover:bg-orange-700 text-white font-black py-3 px-8 rounded-full transition-all shadow-lg text-sm md:text-2xl active:scale-95 whitespace-nowrap">
                    {t('前往報名', 'Register Now')}
                </button>
                <p className="mt-4 text-[10px] md:text-base font-bold text-gray-500 leading-relaxed">
                    {t(
                      <>台灣耳鼻喉頭頸外科醫學會、台灣鼻科醫學會<br />繼續教育學分申請中</>,
                      <>CME credits from Taiwan Society of Otorhinolaryngology Head and Neck Surgery and Taiwan Rhinology Society are under application</>
                    )}
                </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isSubmitting && setShowModal(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black text-gray-900">{t('報名表單', 'Registration Form')}</h3>
                    <p className="text-orange-600 font-bold text-xs mt-1">{t('請先完成匯款，再填寫此表單。', 'Please complete payment first.')}</p>
                </div>
                {!isSubmitting && (
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                {submitStatus === 'success' ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-2">{t('報名已送出！', 'Success!')}</h4>
                        <p className="text-gray-500 font-bold">{t('我們將在審核匯款後寄發確認信。', 'Confirmation email will be sent after review.')}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('姓名', 'Name')}</label>
                                <input required name="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('電話', 'Phone')}</label>
                                <input required name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('Email', 'Email')}</label>
                            <input required name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('醫院 / 服務單位', 'Organization')}</label>
                            <input required name="organization" type="text" value={formData.organization} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('報名身分', 'Category')}</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white">
                                    {activeTab === 'domestic' ? (
                                        domesticFees.map(f => (
                                          <option key={f.titleZh} value={t(f.titleZh, f.titleEn)}>
                                            {t(f.titleZh.replace('\n', ' '), f.titleEn.replace('\n', ' '))}
                                          </option>
                                        ))
                                    ) : (
                                        <option value="International Attendee">International Attendee</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('飲食需求', 'Dietary')}</label>
                                <select name="dietary" value={formData.dietary} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white">
                                    <option value={t('葷食', 'Standard')}>{t('葷食', 'Standard')}</option>
                                    <option value={t('素食', 'Vegetarian')}>{t('素食', 'Vegetarian')}</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('匯款帳號末五碼', 'Last 5 Digits of Account')}</label>
                            <input required name="remittanceAccountSuffix" type="text" maxLength={5} value={formData.remittanceAccountSuffix} onChange={handleInputChange} placeholder="00000" className="w-full px-4 py-2 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('上傳匯款單據 (圖片)', 'Upload Receipt Image')}</label>
                            <div className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-colors ${submitStatus === 'validation-error' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-orange-500'}`}>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <div className="space-y-1">
                                    <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <p className="text-xs font-bold text-gray-500">{fileName || t('點擊或拖曳圖片至此', 'Click or drag image here')}</p>
                                    <p className="text-[10px] text-gray-400">{t('限制 5MB 以內', 'Max 5MB')}</p>
                                </div>
                            </div>
                            {submitStatus === 'validation-error' && <p className="text-red-500 text-[10px] font-bold mt-1">{t('請務必上傳匯款單據。', 'Please upload your receipt.')}</p>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">{t('備註', 'Note')}</label>
                            <textarea name="note" rows={2} value={formData.note} onChange={handleInputChange} placeholder={t('如有特殊需求請在此註明', 'Any special requests...')} className="w-full px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none" />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-black py-4 rounded-xl transition-all shadow-lg text-lg active:scale-95 flex items-center justify-center">
                          {isSubmitting ? (
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : t('確認送出報名', 'Submit Registration')}
                        </button>

                        {submitStatus === 'error' && (
                            <p className="text-red-500 text-center text-[10px] font-bold">{t('送出失敗，請檢查網路後再試。', 'Submit failed. Please try again.')}</p>
                        )}
                    </>
                )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;