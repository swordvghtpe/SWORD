
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// --- CONFIGURATION ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYXQFkSwYRqvC3sFutIQpFzJyyrOajlEc_5W1itNkfKar-8rbK8D5oC-9MKFo4P-I/exec";
// ---------------------

const domesticFees = [
  { titleZh: '住院醫師', titleEn: 'Resident', earlyBird: 'NT$ 2,500', regular: 'NT$ 3,500' },
  { titleZh: '會員醫師', titleEn: 'Member', earlyBird: 'NT$ 3,500', regular: 'NT$ 4,500' },
  { titleZh: '主治醫師', titleEn: 'Physician', earlyBird: 'NT$ 4,500', regular: 'NT$ 5,500' },
];

const internationalFees = [
    { title: 'International Attendee', earlyBird: 'USD $ 100', regular: 'USD $ 150' },
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert(t('檔案大小超過 5MB，請選擇較小的檔案。', 'File size exceeds 5MB. Please choose a smaller file.'));
            e.target.value = '';
            return;
        }

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
    setSubmitStatus('idle');

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        });

        const result = await response.json();

        if (result.result === 'success') {
            setSubmitStatus('success');
            setFormData({
                name: '', email: '', phone: '', organization: '', 
                category: language === 'zh' ? '住院醫師' : 'Resident', 
                dietary: language === 'zh' ? '葷食' : 'Standard', 
                remittanceAccountSuffix: '', receiptFile: '', note: ''
            });
            setTimeout(() => {
                setShowModal(false);
                setSubmitStatus('idle');
            }, 3000);
        } else {
            throw new Error(result.error || 'Unknown script error');
        }

    } catch (error: any) {
        setSubmitStatus('error');
        console.error("Submission Error:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  const inputBaseClass = "w-full px-5 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-orange-500 focus:outline-none transition-all placeholder:text-gray-400";

  return (
    <section id="registration" className="py-24 bg-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 sm:text-5xl tracking-tighter">
            {t('會議報名', 'Registration')}
          </h2>
          <div className="w-24 h-2 bg-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-orange-100 transition-all hover:shadow-orange-200/50">
          <div className="flex bg-gray-50 p-2">
            <button
              onClick={() => setActiveTab('domestic')}
              className={`flex-1 py-5 px-2 text-center font-black text-xl rounded-2xl transition-all duration-300 ${activeTab === 'domestic' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {t('國內與會者', 'Domestic')}
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`flex-1 py-5 px-2 text-center font-black text-xl rounded-2xl transition-all duration-300 ${activeTab === 'international' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {t('國外與會者', 'International')}
            </button>
          </div>

          <div className="p-8 md:p-12">
            {activeTab === 'domestic' ? (
              <div className="space-y-10">
                <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-sm">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-orange-50 text-orange-900">
                        <th className="p-5 font-black text-left text-lg">{t('職稱', 'Title')}</th>
                        <th className="p-5 font-black text-lg">{t('早鳥價', 'Early Bird')}</th>
                        <th className="p-5 font-black text-lg">{t('原價', 'Regular')}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {domesticFees.map((fee, index) => (
                        <tr key={index} className="border-b border-orange-50 last:border-0 hover:bg-orange-50/30 transition-colors">
                          <td className="p-5 text-left font-bold text-gray-800 text-lg">{t(fee.titleZh, fee.titleEn)}</td>
                          <td className="p-5 font-black text-2xl text-orange-600">{fee.earlyBird}</td>
                          <td className="p-5 font-black text-2xl text-gray-400">{fee.regular}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center font-black text-red-600 bg-red-50 py-4 px-6 rounded-2xl text-lg italic shadow-inner">
                    {t('※ 2026/04/30 前報名者為早鳥價', '※ Early-bird rate available through April 30, 2026.')}
                </p>
                
                <div className="bg-[#f97316] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="bg-white p-4 rounded-full shadow-2xl flex-shrink-0 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center overflow-hidden">
                      <img src="https://meee.com.tw/Z6FdOE2.jpg" alt="Logo" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" />
                    </div>
                    <div className="flex-grow w-full space-y-6">
                      <h4 className="text-2xl font-black border-b border-white/30 pb-3">{t('匯款資訊', 'Remittance Info')}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">{t('戶名', 'Name')}</p>
                          <p className="text-xl font-bold">{t('台灣鼻科醫學會', 'Taiwan Rhinology Society')}</p>
                        </div>
                        <div>
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">{t('銀行代碼', 'Bank')}</p>
                          <p className="text-xl font-bold">{t('合作金庫 (006) 台大分行', 'Taiwan Cooperative Bank Taida Branch')}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">{t('銀行帳號', 'Account No.')}</p>
                          <p className="text-3xl font-black tracking-widest">1014-717-101612</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                 <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-sm">
                  <table className="w-full text-center border-collapse">
                    <thead className="bg-orange-50 text-orange-900">
                      <tr>
                        <th className="p-5 font-black text-left text-lg">Category</th>
                        <th className="p-5 font-black text-lg">Early Bird</th>
                        <th className="p-5 font-black text-lg">Regular</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                       {internationalFees.map((fee, index) => (
                        <tr key={index} className="border-b border-orange-50 last:border-0">
                          <td className="p-5 text-left font-bold text-gray-800 text-lg">{fee.title}</td>
                          <td className="p-5 font-black text-2xl text-orange-600">{fee.earlyBird}</td>
                          <td className="p-5 font-black text-2xl text-gray-400">{fee.regular}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center font-black text-red-600 bg-red-50 py-4 px-6 rounded-2xl text-lg italic shadow-inner">
                  ※ Early-bird rate available through April 30, 2026.
                </p>
                <div className="bg-[#f97316] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="bg-white p-4 rounded-full shadow-2xl flex-shrink-0 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center overflow-hidden">
                      <img src="https://meee.com.tw/Z6FdOE2.jpg" alt="Logo" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" />
                    </div>
                    <div className="flex-grow w-full space-y-6">
                      <h4 className="text-2xl font-black border-b border-white/30 pb-3">International Remittance</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 font-bold">
                        <div>
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">Swift</p>
                          <p className="text-lg">TACBTWTP</p>
                        </div>
                        <div>
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">Bank</p>
                          <p className="text-lg">Taiwan Cooperative Bank Taida Branch</p>
                        </div>
                        <div>
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">Account</p>
                          <p className="text-lg">Taiwan Rhinology Society</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">Account NO</p>
                          <p className="text-3xl font-black tracking-widest">1346-717-036449</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">Bank Venue</p>
                          <p className="text-base">B1 No.7 Jhongshan S. Rd. Taipei, Taiwan (R.O.C)</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-orange-100 text-sm font-black uppercase tracking-widest mb-1">Notes</p>
                          <p className="text-base">SWORD2026-Registration fee</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mt-12">
                <button 
                  onClick={() => { setSubmitStatus('idle'); setShowModal(true); }} 
                  className="group relative inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-black py-6 px-14 rounded-full transition-all transform hover:scale-105 shadow-2xl text-2xl active:scale-95"
                >
                    {t('點我前往報名', 'Register Now')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
                <p className="mt-6 text-gray-400 font-bold italic">
                    {t('請先完成匯款作業，再點擊上方按鈕填寫報名表單。', 'Please complete payment first, then click the button above to fill the form.')}
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={() => !isSubmitting && setShowModal(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-orange-600 p-8 text-white flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black tracking-tight">{t('SWORD-2026 報名表單', 'Registration Form')}</h3>
                <p className="text-orange-100 font-bold mt-1 opacity-80">{t('請填寫以下資訊完成報名', 'Please fill in the information below')}</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-0">
                {submitStatus === 'success' ? (
                  <div className="p-16 text-center space-y-8">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-4xl font-black text-gray-900">{t('報名申請已成功送出！', 'Submitted Successfully!')}</h3>
                    <p className="text-xl text-gray-500 font-bold">
                      {t('審核需 2-3 工作天，通過後將會寄送報名成功郵件。', 'Review takes 2-3 days. A confirmation email will follow.')}
                    </p>
                    <button onClick={() => setShowModal(false)} className="bg-orange-600 text-white font-black px-12 py-4 rounded-2xl shadow-lg hover:bg-orange-700 transition-all">
                      {t('關閉視窗', 'Close')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto font-bold text-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                          {t('姓名', 'Name')} <span className="text-red-500">*</span>
                        </label>
                        <input required name="name" type="text" value={formData.name} onChange={handleInputChange} className={inputBaseClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                          {t('電子郵件', 'Email')} <span className="text-red-500">*</span>
                        </label>
                        <input required name="email" type="email" value={formData.email} onChange={handleInputChange} className={inputBaseClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                          {t('連絡電話', 'Phone')} <span className="text-red-500">*</span>
                        </label>
                        <input required name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={inputBaseClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                          {t('服務單位/醫院', 'Organization')} <span className="text-red-500">*</span>
                        </label>
                        <input required name="organization" type="text" value={formData.organization} onChange={handleInputChange} className={inputBaseClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                          {t('身分類別', 'Category')} <span className="text-red-500">*</span>
                        </label>
                        <select required name="category" value={formData.category} onChange={handleInputChange} className={inputBaseClass}>
                          <option value={t('住院醫師', 'Resident')}>{t('住院醫師', 'Resident')}</option>
                          <option value={t('會員醫師', 'Member')}>{t('會員醫師', 'Member')}</option>
                          <option value={t('主治醫師', 'Physician')}>{t('主治醫師', 'Physician')}</option>
                          <option value={t('外籍人士', 'Foreign')}>{t('外籍人士', 'Foreign Attendee')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                          {t('飲食習慣', 'Dietary')} <span className="text-red-500">*</span>
                        </label>
                        <select required name="dietary" value={formData.dietary} onChange={handleInputChange} className={inputBaseClass}>
                          <option value={t('葷食', 'Standard')}>{t('葷食', 'Meat')}</option>
                          <option value={t('素食', 'Vegetarian')}>{t('素食', 'Vegetarian')}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                        {t('匯款帳號末五碼', 'Remittance Suffix (5 digits)')} <span className="text-red-500">*</span>
                      </label>
                      <input required name="remittanceAccountSuffix" type="text" maxLength={5} value={formData.remittanceAccountSuffix} onChange={(e) => setFormData({...formData, remittanceAccountSuffix: e.target.value.replace(/\D/g, '')})} placeholder="00000" className={inputBaseClass} />
                    </div>

                    <div>
                      <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                        {t('上傳匯款單據', 'Upload Receipt')} <span className="text-red-500">*</span>
                      </label>
                      <div 
                        onClick={() => document.getElementById('receipt-upload')?.click()}
                        className={`mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-[2rem] p-8 hover:bg-orange-50 cursor-pointer transition-all ${submitStatus === 'validation-error' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-orange-400'}`}
                      >
                        {formData.receiptFile ? (
                          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                            <img src={formData.receiptFile} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <span className="text-white font-black text-lg">{t('點擊更換圖片', 'Change Photo')}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${submitStatus === 'validation-error' ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'}`}>
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                            </div>
                            <p className={`text-lg font-bold ${submitStatus === 'validation-error' ? 'text-red-600' : 'text-gray-400'}`}>{t('點擊上傳匯款單據', 'Upload Receipt Image')}</p>
                          </div>
                        )}
                        <input id="receipt-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </div>
                      {submitStatus === 'validation-error' && (
                        <p className="text-red-500 text-sm mt-3 font-black animate-pulse flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                          {t('⚠️ 請務必上傳匯款單據以供核對。', '⚠️ Please upload the remittance receipt.')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t('備註', 'Notes')}</label>
                      <textarea name="note" rows={3} value={formData.note} onChange={handleInputChange} className={inputBaseClass} placeholder={t('如有特殊需求請告知', 'Special requirements...')} />
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      {submitStatus === 'error' && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-2xl text-center font-black mb-4">
                          {t('⚠️ 提交失敗，請檢查網路連線或稍後再試。', '⚠️ Submission failed. Please try again later.')}
                        </div>
                      )}

                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center text-2xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            {t('處理中...', 'Processing...')}
                          </div>
                        ) : t('確認送出報名資料', 'Confirm & Submit')}
                      </button>
                    </div>
                  </form>
                )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;
