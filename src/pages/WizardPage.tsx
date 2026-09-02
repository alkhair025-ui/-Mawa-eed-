import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TEMPLATES } from '../data/initialData';
import { 
  Sparkles, 
  ArrowRight, 
  Scissors, 
  Stethoscope, 
  Smile, 
  Briefcase, 
  Dumbbell, 
  Camera, 
  Car, 
  FileJson,
  CheckCircle2, 
  Layers
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TemplateImportExportModal from '../components/TemplateImportExportModal';

export default function WizardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedTemplate = searchParams.get('template');

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Import Modal
  const [showImportModal, setShowImportModal] = useState(false);

  // Form states
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('barber');
  const [customIndustryName, setCustomIndustryName] = useState('');
  const [slug, setSlug] = useState('');
  const [templateId, setTemplateId] = useState(preSelectedTemplate || 'universal-open');
  const [phone, setPhone] = useState('+966550001122');
  const [city, setCity] = useState('الرياض');
  const [address, setAddress] = useState('طريق الملك فهد');
  const [primaryColor, setPrimaryColor] = useState('#0f172a');
  const [currency, setCurrency] = useState('SAR');

  useEffect(() => {
    if (preSelectedTemplate) {
      const found = TEMPLATES.find(t => t.id === preSelectedTemplate);
      if (found) {
        setIndustry(found.industry);
        setPrimaryColor(found.primaryColor);
      }
    }
  }, [preSelectedTemplate]);

  // Auto generate slug from business name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setBusinessName(name);
    if (!slug || slug.startsWith('store-')) {
      const generated = 'store-' + Math.floor(1000 + Math.random() * 9000);
      setSlug(generated);
    }
  };

  const selectedTemplateObj = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalIndustryName = industry === 'custom' && customIndustryName ? customIndustryName : industry;

      const resBiz = await fetch('/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName || 'منصة المواعيد الاحترافية',
          slug: slug || 'store-' + Date.now().toString(36),
          industry: finalIndustryName,
          industry_custom_name: customIndustryName,
          template_id: templateId,
          phone: phone,
          email: 'owner@' + (slug || 'mybusiness') + '.sa',
          city: city,
          address: address,
          primary_color: primaryColor,
          currency: currency,
          logo_url: selectedTemplateObj.logoDefault,
          cover_url: selectedTemplateObj.heroImage,
          description: selectedTemplateObj.description
        })
      });

      const bizData = await resBiz.json();
      const finalSlug = bizData.slug || slug;

      // Add sample services
      for (const service of selectedTemplateObj.sampleServices) {
        await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            business_id: bizData.id,
            title: service.title,
            price: service.price,
            currency: currency,
            duration_min: service.duration,
            category: service.category,
            location_type: service.location_type || 'branch',
            description: 'خدمة احترافية مخصصة ومفتوحة التحديد.'
          })
        });
      }

      // Add sample staff
      for (const staff of selectedTemplateObj.sampleStaff) {
        await fetch('/api/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            business_id: bizData.id,
            name: staff.name,
            role: staff.role,
            avatar: staff.avatar,
            is_active: true
          })
        });
      }

      navigate(`/merchant/${finalSlug}`);
    } catch (err) {
      console.error('Wizard error:', err);
      alert('حدث خطأ أثناء إنشاء المتجر، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl flex flex-col justify-between">
      <Navbar />

      <main className="py-12 max-w-4xl mx-auto px-4 w-full my-auto">
        
        {/* Wizard Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>اختر قالبك أو استورد ملف JSON مباشرة</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            مُنشئ مواقع الحجز الذكي الشامل (Mawa'eed Builder)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            حدد نشاطك أو استورد ملف قالبك للبدء في تجربتك المجانية لمدة أسبوع
          </p>
        </div>

        {/* Quick Action Bar for Import */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs font-bold text-slate-300">هل لديك ملف قالب جاهز على كمبيوترك؟</div>
          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="w-full sm:w-auto py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md"
          >
            <FileJson className="w-4 h-4" />
            <span>استيراد قالب من كمبيوترك (Upload JSON)</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6 text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-400' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-slate-950 text-xs ${step >= 1 ? 'bg-amber-500' : 'bg-slate-800 text-slate-400'}`}>1</span>
              <span>بيانات النشاط ونوعه</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-800" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-400' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-slate-950 text-xs ${step >= 2 ? 'bg-amber-500' : 'bg-slate-800 text-slate-400'}`}>2</span>
              <span>اختيار القالب والعملة</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-800" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-400' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-slate-950 text-xs ${step >= 3 ? 'bg-amber-500' : 'bg-slate-800 text-slate-400'}`}>3</span>
              <span>تأكيد وانطلاق</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Business Details & Industry */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">اسم النشاط / المتجر الخاص بك *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: استوديو اللقطة الذكية، مربط الخيل، عيادة د. سارة، مركز الصيانة..."
                    value={businessName}
                    onChange={handleNameChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">طبيعة ومجال العمل (اختر أو أضف نشاطك الخاص) *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      type="button"
                      onClick={() => { setIndustry('custom'); setTemplateId('universal-open'); }}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 transition ${industry === 'custom' ? 'bg-amber-500 border-amber-400 text-slate-950 font-black' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Layers className="w-5 h-5 text-amber-300 fill-amber-300" />
                      <span>نشاط مخصص / آخر ⚡</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIndustry('barber'); setTemplateId('luxury-dark'); }}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 transition ${industry === 'barber' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Scissors className="w-5 h-5 text-amber-400" />
                      <span>صالون حلاقة</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIndustry('clinic'); setTemplateId('medical-clean'); }}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 transition ${industry === 'clinic' ? 'bg-sky-500/20 border-sky-500 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Stethoscope className="w-5 h-5 text-sky-400" />
                      <span>عيادة طبية</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIndustry('spa'); setTemplateId('emerald-spa'); }}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 transition ${industry === 'spa' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Smile className="w-5 h-5 text-emerald-400" />
                      <span>سبا وتجميل</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIndustry('consulting'); setTemplateId('modern-minimal'); }}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 transition ${industry === 'consulting' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Briefcase className="w-5 h-5 text-indigo-400" />
                      <span>استشارات وتدريب</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIndustry('fitness'); setTemplateId('fitness-pulse'); }}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 transition ${industry === 'fitness' ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Dumbbell className="w-5 h-5 text-rose-400" />
                      <span>لياقة وبناء أجسام</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIndustry('photography'); setTemplateId('studio-craft'); }}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 transition ${industry === 'photography' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Camera className="w-5 h-5 text-purple-400" />
                      <span>تصوير وفنون</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIndustry('auto'); setTemplateId('auto-detail'); }}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-2 transition ${industry === 'auto' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Car className="w-5 h-5 text-blue-400" />
                      <span>خدمة وتلميع سيارات</span>
                    </button>
                  </div>
                </div>

                {/* Custom Industry Input */}
                {industry === 'custom' && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl animate-in zoom-in duration-200 space-y-2">
                    <label className="block text-xs font-bold text-amber-300">اكتب اسم نشاطك الخيار المخصص:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مربط فروسية، مركز تعليم لغات، مستشار عقاري، صيانة منازل..."
                      value={customIndustryName}
                      onChange={(e) => setCustomIndustryName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">رقم الجوال للتواصل والواتساب</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">المدينة والمنطقة</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!businessName) {
                        alert('يرجى كتابة اسم النشاط أولاً');
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
                  >
                    <span>المتابعة لاختيار القالب</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Choose Template & Currency */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-white block">اختر عملة التسعير لعرض خدماتك:</span>
                    <span className="text-[11px] text-slate-400">ستعرض جميع أسعار الخدمات بهذه العملة للعميل</span>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    <option value="SAR">ريال سعودي (SAR)</option>
                    <option value="AED">درهم إماراتي (AED)</option>
                    <option value="KWD">دينار كويتي (KWD)</option>
                    <option value="QAR">ريال قطري (QAR)</option>
                    <option value="USD">دولار أمريكي ($ USD)</option>
                    <option value="EUR">يورو (€ EUR)</option>
                  </select>
                </div>

                <div className="text-xs text-slate-400">
                  اختر من بين 12+ قالب مسبق أو استورد قالب من جهازك:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEMPLATES.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      onClick={() => {
                        setTemplateId(tmpl.id);
                        setPrimaryColor(tmpl.primaryColor);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${templateId === tmpl.id ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div>
                        <div className="h-32 rounded-xl overflow-hidden mb-3 relative">
                          <img src={tmpl.heroImage} alt={tmpl.name} className="w-full h-full object-cover" />
                          <span className="absolute top-2 right-2 bg-slate-950/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {tmpl.industryName}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-white mb-1">{tmpl.name}</h4>
                        <p className="text-[11px] text-slate-400">{tmpl.description}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-500 text-[10px]">اللون الرئيسي:</span>
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: tmpl.primaryColor }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                  >
                    السابق
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
                  >
                    <span>معاينة الرابط والتأكيد</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Confirm & Launch */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-3 text-amber-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>ملخص موقعك وسيجري إنشاؤه أونلاين فوراً:</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">اسم النشاط:</span>
                      <strong className="text-white text-sm">{businessName}</strong>
                    </div>

                    <div>
                      <span className="text-slate-500 block">نوع النشاط والقالب:</span>
                      <strong className="text-white text-sm">{industry === 'custom' && customIndustryName ? customIndustryName : selectedTemplateObj.name}</strong>
                    </div>

                    <div className="col-span-2">
                      <span className="text-slate-500 block">رابط الحجز المباشر الذي سيتولد لعملائك:</span>
                      <code className="bg-slate-900 px-3 py-1.5 rounded-lg text-amber-300 font-mono text-xs block mt-1 border border-slate-800">
                        {window.location.origin}/b/{slug || 'my-store'}
                      </code>
                    </div>

                    <div className="col-span-2 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-300 text-xs">
                      🎉 <strong>تفعيل التجربة المجانية لمدة 7 أيام تلقائياً</strong> بدون أي رسوم مبدئية أو بطاقة إئتمان!
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                  >
                    تعديل القالب
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 transition shadow-xl shadow-amber-500/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>جاري إطلاق الموقع وتجهيز الخدمات...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-slate-950" />
                        <span>إطلاق الموقع والدخول للوحة التحكم</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

          </form>

        </div>

      </main>

      {/* Template Import Modal */}
      <TemplateImportExportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportSuccess={(importedData) => {
          if (importedData.businessName) setBusinessName(importedData.businessName);
          if (importedData.primary_color) setPrimaryColor(importedData.primary_color);
          if (importedData.currency) setCurrency(importedData.currency);
          if (importedData.industry) setIndustry(importedData.industry);
        }}
      />

      <Footer />
    </div>
  );
}
