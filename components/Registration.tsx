
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
            alert(t('檔案大小超過 5MB。', 'File exceeds 5MB.'));
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
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        });
        const result = await response.json();
        if (result.result === 'success') {
            setSubmitStatus('success');
            setTimeout(() => { setShowModal(false); setSubmitStatus('idle'); }, 3000);
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
                      <td className="px-0.5 py-3 font-bold text-gray-800 text-[10px] md:text-lg whitespace-nowrap">{t((fee as any).titleZh || fee.title, (fee as any).titleEn || fee.title)}</td>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] md:text-xl">
                  <div><p className="opacity-70 text-[8px] md:text-[10px] uppercase">Name</p><p className="font-bold whitespace-nowrap">{t('台灣鼻科醫學會', 'TRS')}</p></div>
                  <div><p className="opacity-70 text-[8px] md:text-[10px] uppercase">Bank</p><p className="font-bold whitespace-nowrap">合庫(006)台大分行</p></div>
                  <div className="md:col-span-2"><p className="opacity-70 text-[8px] md:text-[10px] uppercase">Account</p><p className="text-sm md:text-3xl font-black whitespace-nowrap">1014-717-101612</p></div>
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
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isSubmitting && setShowModal(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[1.5rem] shadow-2xl overflow-hidden p-6">
            <h3 className="text-lg font-black mb-4 whitespace-nowrap">{t('報名表單', 'Registration Form')}</h3>
            <p className="text-gray-400 font-bold mb-6 text-[10px]">{t('請先完成匯款，再填寫報名表。', 'Please complete payment first.')}</p>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <input required name="name" type="text" placeholder={t('姓名', 'Name')} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl text-xs" />
                <input required name="email" type="email" placeholder={t('Email', 'Email')} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl text-xs" />
                <input required name="phone" type="tel" placeholder={t('電話', 'Phone')} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl text-xs" />
                <input required name="organization" type="text" placeholder={t('醫院單位', 'Org')} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl text-xs" />
                <input required name="remittanceAccountSuffix" type="text" maxLength={5} placeholder={t('末五碼', 'Last 5 digits')} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-xl text-xs" />
                <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 text-white font-black py-4 rounded-xl whitespace-nowrap text-base">
                  {isSubmitting ? '...' : t('確認送出', 'Submit')}
                </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;
