
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// --- CONFIGURATION ---
// IMPORTANT: PASTE YOUR NEW WEB APP URL FROM THE NEW GOOGLE APPS SCRIPT DEPLOYMENT HERE
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYXQFkSwYRqvC3sFutIQpFzJyyrOajlEc_5W1itNkfKar-8rbK8D5oC-9MKFo4P-I/exec";
// ---------------------

const domesticFees = [
  { titleZh: '住院醫師', titleEn: 'Resident', earlyBird: 'NT$ 2,500', regular: 'NT$ 3,500' },
  { titleZh: '會員醫師', titleEn: 'Member', earlyBird: 'NT$ 3,500', regular: 'NT$ 4,500' },
  { titleZh: '主治醫師', titleEn: 'Visiting Staff', earlyBird: 'NT$ 4,500', regular: 'NT$ 5,500' },
];

const internationalFees = [
    { title: 'International Attendee', earlyBird: 'USD $ 100', regular: 'USD $ 150' },
];

const RegistrationLogo = () => (
    <div className="flex-shrink-0">
        <img 
            src="https://meee.com.tw/TnhZtZH.jpg" 
            alt="SWORD-2026 Logo" 
            className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white"
        />
    </div>
);

interface FormData {
    name: string;
    email: string;
    phone: string;
    organization: string;
    title: string;
    category: string;
    dietary: string;
    remittanceAccountSuffix: string;
    receiptFile: string; // Base64 string of the uploaded file
    note: string;
}

const Registration: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('domestic');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    title: '',
    category: '住院醫師 (Resident)',
    dietary: '葷食 (Standard)',
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
        // Validation: Max file size 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert(t('檔案大小超過 5MB，請選擇較小的檔案。', 'File size exceeds 5MB. Please choose a smaller file.'));
            e.target.value = ''; // Reset input
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, receiptFile: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_NEW_GOOGLE_SCRIPT_URL_HERE")) {
        alert("System Error: Google Script URL is not configured. Please paste the new URL from your deployment into components/Registration.tsx.");
        setIsSubmitting(false);
        return;
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                // Use text/plain to avoid CORS preflight (OPTIONS) request which often fails with GAS
                'Content-Type': 'text/plain;charset=utf-8',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.result === 'success') {
            setSubmitStatus('success');
            // Reset form fields
            const form = e.target as HTMLFormElement;
            form.reset();
            setFormData({
                name: '', email: '', phone: '', organization: '', title: '', 
                category: '住院醫師 (Resident)', dietary: '葷食 (Standard)', 
                remittanceAccountSuffix: '', receiptFile: '', note: ''
            });
        } else {
            throw new Error(result.error || 'Unknown script error');
        }

    } catch (error: any) {
        setSubmitStatus('error');
        console.error("Submission Error Details:", error);
        
        // Extract meaningful message from various error types
        let errorMessage = "An unknown error occurred.";
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else if (error && typeof error === 'object' && 'toString' in error) {
            errorMessage = error.toString();
        }

        alert(`Submission Failed:\n${errorMessage}\n\nPlease check the console for more details.`);
    } finally {
        setIsSubmitting(false);
    }
  };

  const openModal = () => {
      setSubmitStatus('idle');
      setShowModal(true);
  };

  return (
    <section id="registration" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('會議報名 Registration', 'Registration')}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
             {t('請選擇您的報名類別', 'Please select your category')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="flex bg-gray-100">
            <button
              onClick={() => setActiveTab('domestic')}
              className={`flex-1 py-4 px-2 text-center font-bold text-lg transition-all duration-300 ${activeTab === 'domestic' ? 'bg-blue-600 text-white shadow-inner' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t('國內與會者 (Domestic)', 'Domestic Attendees')}
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`flex-1 py-4 px-2 text-center font-bold text-lg transition-all duration-300 ${activeTab === 'international' ? 'bg-amber-500 text-white shadow-inner' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t('國外與會者 (International)', 'International Attendees')}
            </button>
          </div>

          <div className="p-6 md:p-10">
            {activeTab === 'domestic' ? (
              <div className="animate-fade-in space-y-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-amber-400 text-white">
                        <th className="p-3 font-semibold text-left">{t('職稱', 'Title')}</th>
                        <th className="p-3 font-semibold">{t('早鳥價', 'Early Bird')}</th>
                        <th className="p-3 font-semibold">{t('原價', 'Regular')}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-amber-50">
                      {domesticFees.map((fee, index) => (
                        <tr key={index} className="border-b border-amber-200 last:border-0">
                          <td className="p-3 text-left font-medium text-gray-800">{t(fee.titleZh, fee.titleEn)}</td>
                          <td className="p-3 font-bold text-lg text-green-600">{fee.earlyBird}</td>
                          <td className="p-3 font-bold text-lg text-gray-700">{fee.regular}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center font-bold text-red-600 bg-red-50 p-3 rounded-lg">
                    {t('※ 2026/04/30 前報名者為早鳥價', '※ Early-bird rate available through April 30, 2026.')}
                </p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col md:flex-row items-center gap-6">
                  <RegistrationLogo />
                  <div className="flex-grow w-full">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">{t('匯款帳號', 'Remittance Info')}</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex flex-col sm:flex-row sm:items-baseline">
                        <span className="font-semibold sm:w-32 flex-shrink-0">戶名:</span> 
                        <span>台灣鼻科醫學會</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:items-baseline">
                        <span className="font-semibold sm:w-32 flex-shrink-0">銀行:</span> 
                        <span>合作金庫 成大分行 (006)</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:items-baseline">
                        <span className="font-semibold sm:w-32 flex-shrink-0">帳號:</span> 
                        <span>1014-717-101612</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in space-y-8">
                 <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead className="bg-amber-400 text-white">
                      <tr>
                        <th className="p-3 font-semibold text-left">Category</th>
                        <th className="p-3 font-semibold">Early Bird</th>
                        <th className="p-3 font-semibold">Regular</th>
                      </tr>
                    </thead>
                    <tbody className="bg-amber-50">
                       {internationalFees.map((fee, index) => (
                        <tr key={index} className="border-b border-amber-200 last:border-0">
                          <td className="p-3 text-left font-medium text-gray-800">{fee.title}</td>
                          <td className="p-3 font-bold text-lg text-green-600">{fee.earlyBird}</td>
                          <td className="p-3 font-bold text-lg text-gray-700">{fee.regular}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center font-bold text-red-600 bg-red-50 p-3 rounded-lg">※ Early-bird rate available through April 30, 2026.</p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col md:flex-row items-center gap-6">
                  <RegistrationLogo />
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Foreign Remittance</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li><span className="font-semibold w-32 inline-block">Swift:</span> TACBTWTP</li>
                      <li><span className="font-semibold w-32 inline-block">Bank:</span> Taiwan Cooperative Bank Taida Branch</li>
                      <li><span className="font-semibold w-32 inline-block">Account:</span> Taiwan Rhinology Society</li>
                      <li><span className="font-semibold w-32 inline-block">Account NO:</span> 1346-717-036449</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mt-10">
                <button onClick={openModal} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg cursor-pointer">
                    {t('線上報名 / Register Now', 'Register Now')}
                </button>
                <p className="mt-2 text-sm text-gray-400">
                    {t('請完成匯款後再填寫報名表單', 'Please complete the payment before filling out the registration form')}
                </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                      {t('報名表單 Registration Form', 'Registration Form')}
                    </h3>
                    
                    {submitStatus === 'success' ? (
                        <div className="text-center py-10">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('報名申請已送出', 'Application Submitted')}</h3>
                            
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left mb-6 max-w-md mx-auto">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700 font-bold mb-2">
                                            {t('報名資訊待審核', 'Registration Pending Review')}
                                        </p>
                                        <p className="text-sm text-yellow-700">
                                            {t(
                                                '審核需 2-3 工作天，審核通過後會寄送報名成功郵件。如超過 3 天沒收到報名成功郵件，請來信詢問報名狀態。',
                                                'Review takes 2-3 working days. A confirmation email will be sent upon approval. If you do not receive it within 3 days, please contact us.'
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <button onClick={() => setShowModal(false)} className="w-full inline-flex justify-center rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                {t('關閉視窗 Close', 'Close')}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 relative">
                            {isSubmitting && (
                                <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center rounded-lg">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-3"></div>
                                    <p className="text-blue-600 font-semibold">{t('正在處理您的報名...', 'Processing...')}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('姓名 (Name) *', 'Name *')}</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full bg-white text-gray-900 shadow-sm sm:text-sm border-gray-300 rounded-md border p-2" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('電子郵件 (Email) *', 'Email *')}</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full bg-white text-gray-900 shadow-sm sm:text-sm border-gray-300 rounded-md border p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('聯絡電話 (Phone) *', 'Phone *')}</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full bg-white text-gray-900 shadow-sm sm:text-sm border-gray-300 rounded-md border p-2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('服務單位/醫院 (Affiliation/Hospital) *', 'Affiliation/Hospital *')}</label>
                                <input required type="text" name="organization" value={formData.organization} onChange={handleInputChange} className="mt-1 block w-full bg-white text-gray-900 shadow-sm sm:text-sm border-gray-300 rounded-md border p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('身分類別 (Category) *', 'Category *')}</label>
                                <select required name="category" value={formData.category} onChange={handleInputChange} className="mt-1 block w-full bg-white text-gray-900 py-2 px-3 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                                    <option value="住院醫師 (Resident)">{t('住院醫師 (Resident)', 'Resident')}</option>
                                    <option value="會員醫師 (Member)">{t('會員醫師 (Member)', 'Member')}</option>
                                    <option value="主治醫師 (Visiting Staff)">{t('主治醫師 (Visiting Staff)', 'Visiting Staff')}</option>
                                    <option value="其他 (Other)">{t('其他 (Other)', 'Other')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('飲食習慣 (Dietary) *', 'Dietary *')}</label>
                                <select required name="dietary" value={formData.dietary} onChange={handleInputChange} className="mt-1 block w-full bg-white text-gray-900 py-2 px-3 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                                    <option value="Standard">{t('葷食 (Standard)', 'Standard')}</option>
                                    <option value="Vegetarian">{t('素食 (Vegetarian)', 'Vegetarian')}</option>
                                    <option value="No Beef">{t('不吃牛 (No Beef)', 'No Beef')}</option>
                                    <option value="No Pork">{t('不吃豬 (No Pork)', 'No Pork')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('匯款帳號末五碼 *', 'Last 5 digits of account *')}</label>
                                <input 
                                    required 
                                    type="text" 
                                    name="remittanceAccountSuffix" 
                                    maxLength={5}
                                    value={formData.remittanceAccountSuffix} 
                                    onChange={handleInputChange} 
                                    className="mt-1 block w-full bg-white text-gray-900 shadow-sm sm:text-sm border-gray-300 rounded-md border p-2" 
                                />
                            </div>
                            
                            {/* Upload Remittance Receipt */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('上傳匯款單據 *', 'Upload Remittance Receipt *')}
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors bg-gray-50">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                <span>{t('選擇檔案', 'Upload a file')}</span>
                                                <input required id="file-upload" name="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                                            </label>
                                            <p className="pl-1">{t('或拖放至此', 'or drag and drop')}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">{t('支援 PNG, JPG，大小不超過 5MB', 'PNG, JPG up to 5MB')}</p>
                                        {formData.receiptFile && <p className="text-xs text-green-600 font-bold">{t('檔案已選擇 ✓', 'File selected ✓')}</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('備註 (Note)', 'Note')}</label>
                                <textarea name="note" rows={2} value={formData.note} onChange={handleInputChange} className="mt-1 block w-full bg-white text-gray-900 shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"></textarea>
                            </div>
                            
                            <div className="mt-6 flex flex-row gap-4">
                                <button 
                                    type="button" 
                                    disabled={isSubmitting} 
                                    className="flex-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:text-sm" 
                                    onClick={() => setShowModal(false)}
                                >
                                    {t('取消 (Cancel)', 'Cancel')}
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className={`flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus-outline-none sm:text-sm ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isSubmitting ? t('提交中...', 'Submitting...') : t('提交 (Submit)', 'Submit')}
                                </button>
                            </div>
                        </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;
