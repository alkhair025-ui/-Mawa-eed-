import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Globe, 
  Scissors, 
  Stethoscope, 
  Smile, 
  Briefcase, 
  Dumbbell,
  Camera,
  Car,
  FileJson,
  Upload,
  Layers,
  ArrowLeft,
  BarChart3,
  QrCode
} from 'lucide-react';
import { TEMPLATES } from '../data/initialData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const filteredTemplates = selectedIndustry === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.industry === selectedIndustry);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>منصة مفتوحة وشاملة لإنشاء مواقع الحجوزات مع خاصية استيراد/تصدير القوالب</span>
            <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold">
              تجربة 7 أيام مجاناً
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto">
            اصنع موقع حجز المواعيد الخاص بك{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              مهما كان نوع عملك أو خدماتك!
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            منصة مخصصة ومفتوحة بدون حدود: صالونات، عيادات، مرابط فروسية، مراكز لياقة، تصوير، صيانة، أو أي نشاط تجاري خاص. اختر من القوالب المتاحة أو استورد ملف JSON من كمبيوترك بضغطة زر.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/build"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>ابدأ الآن (تجربة 7 أيام مجانية)</span>
            </Link>

            <Link
              to="/build"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition"
            >
              <FileJson className="w-4 h-4 text-amber-400" />
              <span>استيراد قالب JSON 📁</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>استيراد وتصدير ملفات JSON 📁</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>خدمات مفتوحة (حضوري/أونلاين/منزلية)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>دعم جميع العملات العربية والعالمية</span>
            </div>
          </div>

          {/* Interactive Hero Screenshot / Mockup Preview */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl bg-slate-900/90 p-2 sm:p-4 border border-slate-800 shadow-2xl relative">
            <div className="rounded-2xl bg-slate-950 overflow-hidden border border-slate-800/80">
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="bg-slate-950 px-6 py-1 rounded-full text-slate-300 font-mono text-[11px] border border-slate-800">
                  mawaeed.app/b/salon-luxe
                </div>
                <span className="text-amber-400 font-bold">معاينة مباشرة</span>
              </div>

              {/* Mock Store Screen */}
              <div className="p-6 text-right grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-4">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold inline-block">
                    منصة حجز المواعيد المفتوحة
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    احجز موعدك أو استشارتك أو خدمتك بضغطة زر واحدة
                  </h3>
                  <p className="text-xs text-slate-400">
                    حدد الخدمة، اختر المختص أو الوقت المناسب، واستلم تأكيد الحجز فوراً عبر الواتساب والتقويم.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-right">
                      <div className="font-bold text-sm text-amber-400">حضور شخصي / بالفرع</div>
                      <div className="text-xs text-slate-400 mt-0.5">صالونات، عيادات، فروسية</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-right">
                      <div className="font-bold text-sm text-amber-400">أونلاين / زيارة منزلية</div>
                      <div className="text-xs text-slate-400 mt-0.5">استشارات، صيانة، دروس</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-300 mb-1">اختر الوقت المتاح</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button className="py-2 bg-amber-500 text-slate-950 font-bold rounded-lg">4:00 مساءً</button>
                    <button className="py-2 bg-slate-800 text-slate-300 rounded-lg">5:30 مساءً</button>
                    <button className="py-2 bg-slate-800 text-slate-300 rounded-lg">7:00 مساءً</button>
                    <button className="py-2 bg-slate-800 text-slate-300 rounded-lg">8:30 مساءً</button>
                  </div>
                  <button className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition">
                    تأكيد الحجز المباشر
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Expanded Template Selection Section */}
      <section id="templates" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            12+ قالب جاهز أو استورد ملف JSON مباشرة
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            اختر القالب الأنسب لنشاطك أو حَمِّل ملف قالبك من كمبيوترك.
          </p>

          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setSelectedIndustry('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'all' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              الكل (12+ قالب)
            </button>
            <button
              onClick={() => setSelectedIndustry('custom')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'custom' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-amber-300 border border-amber-500/30 hover:bg-slate-800'}`}
            >
              قالب مفتوح ومخصص ⚡
            </button>
            <button
              onClick={() => setSelectedIndustry('equestrian')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'equestrian' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              فروسية وخيل
            </button>
            <button
              onClick={() => setSelectedIndustry('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'home' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              صيانة وتنظيف
            </button>
            <button
              onClick={() => setSelectedIndustry('education')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'education' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              دروس وتقوية
            </button>
            <button
              onClick={() => setSelectedIndustry('barber')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'barber' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              صالونات حلاقة
            </button>
            <button
              onClick={() => setSelectedIndustry('clinic')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'clinic' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              عيادات طبية
            </button>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={template.heroImage} 
                    alt={template.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full">
                    {template.industryName}
                  </span>

                  <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between">
                    <h3 className="font-bold text-xl text-white">{template.name}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="text-[11px] font-bold text-slate-400">الخدمات المضمنة بالقالب:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {template.sampleServices.map((s, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[11px]">
                          {s.title} ({s.price} ر.س)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/build?template=${template.id}`}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>استخدم هذا القالب وابدأ التجربة</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </section>

      <Footer />
    </div>
  );
}
