import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Globe, 
  FileJson,
  Layers,
  ArrowLeft,
  BarChart3,
  QrCode,
  Calendar
} from 'lucide-react';
import { TEMPLATES } from '../data/initialData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const filteredTemplates = selectedIndustry === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.industry === selectedIndustry);

  const industries = [
    { id: 'all', label: 'الكل' },
    { id: 'custom', label: 'قالب مفتوح ⚡' },
    { id: 'equestrian', label: 'فروسية وخيل' },
    { id: 'home', label: 'صيانة وتنظيف' },
    { id: 'education', label: 'دروس وتقوية' },
    { id: 'barber', label: 'صالونات حلاقة' },
    { id: 'clinic', label: 'عيادات طبية' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-0 sm:left-10 w-64 h-64 sm:w-80 sm:h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge — أقصر على الموبايل */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] sm:text-xs font-bold mb-5 sm:mb-6 backdrop-blur-md max-w-full">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">منصة مفتوحة لإنشاء مواقع الحجوزات مع استيراد/تصدير القوالب</span>
            <span className="sm:hidden">منصة حجوزات مفتوحة + قوالب جاهزة</span>
            <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">
              7 أيام مجاناً
            </span>
          </div>

          <h1 className="text-[1.65rem] leading-[1.25] sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto">
            اصنع موقع حجز المواعيد الخاص بك{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              مهما كان نوع عملك!
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-1">
            صالونات، عيادات، فروسية، لياقة، تصوير، صيانة أو أي نشاط. اختر قالباً جاهزاً أو استورد JSON بضغطة زر.
          </p>

          {/* Call to Actions */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Link
              to="/build"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98]"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>ابدأ الآن — 7 أيام مجاناً</span>
            </Link>

            <Link
              to="/build"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition active:scale-[0.98]"
            >
              <FileJson className="w-4 h-4 text-amber-400" />
              <span>استيراد قالب JSON</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-[11px] sm:text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>استيراد وتصدير JSON</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>حضوري / أونلاين / منزلي</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>عملات عربية وعالمية</span>
            </div>
          </div>

          {/* Interactive Hero Screenshot / Mockup Preview */}
          <div className="mt-10 sm:mt-14 max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-slate-900/90 p-1.5 sm:p-4 border border-slate-800 shadow-2xl relative">
            <div className="rounded-xl sm:rounded-2xl bg-slate-950 overflow-hidden border border-slate-800/80">
              <div className="bg-slate-900 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between border-b border-slate-800 text-[10px] sm:text-xs text-slate-400">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="bg-slate-950 px-3 sm:px-6 py-1 rounded-full text-slate-300 font-mono text-[10px] sm:text-[11px] border border-slate-800 truncate max-w-[140px] sm:max-w-none">
                  mawaeed.app/b/salon-luxe
                </div>
                <span className="text-amber-400 font-bold hidden xs:inline sm:inline">معاينة</span>
              </div>

              {/* Mock Store Screen */}
              <div className="p-4 sm:p-6 text-right grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
                <div className="md:col-span-2 space-y-3 sm:space-y-4">
                  <span className="px-2.5 sm:px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[10px] sm:text-xs font-bold inline-block">
                    منصة حجز المواعيد المفتوحة
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                    احجز موعدك أو خدمتك بضغطة زر واحدة
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                    حدد الخدمة، اختر المختص والوقت، وأرسل تأكيد الحجز عبر واتساب.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                    <div className="p-2.5 sm:p-3 bg-slate-900 rounded-xl border border-slate-800 text-right">
                      <div className="font-bold text-xs sm:text-sm text-amber-400">حضور / بالفرع</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">صالونات، عيادات</div>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-slate-900 rounded-xl border border-slate-800 text-right">
                      <div className="font-bold text-xs sm:text-sm text-amber-400">أونلاين / منزلي</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">استشارات، صيانة</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-slate-800 space-y-2.5 sm:space-y-3">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-300">اختر الوقت المتاح</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
                    <button type="button" className="py-2 bg-amber-500 text-slate-950 font-bold rounded-lg">4:00 م</button>
                    <button type="button" className="py-2 bg-slate-800 text-slate-300 rounded-lg">5:30 م</button>
                    <button type="button" className="py-2 bg-slate-800 text-slate-300 rounded-lg">7:00 م</button>
                    <button type="button" className="py-2 bg-slate-800 text-slate-300 rounded-lg">8:30 م</button>
                  </div>
                  <button type="button" className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition">
                    تأكيد الحجز المباشر
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Expanded Template Selection Section */}
      <section id="templates" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-4xl font-black text-white leading-snug">
            قوالب جاهزة أو استورد JSON مباشرة
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 sm:mt-3">
            اختر القالب الأنسب لنشاطك أو حمّل ملف قالبك من جهازك.
          </p>

          {/* Industry Filter Pills — scrollable on mobile */}
          <div className="mt-5 sm:mt-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`snap-start shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedIndustry === ind.id
                      ? 'bg-amber-500 text-slate-950'
                      : ind.id === 'custom'
                        ? 'bg-slate-900 text-amber-300 border border-amber-500/30 hover:bg-slate-800'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {ind.label}
                  {ind.id === 'all' ? ` (${TEMPLATES.length})` : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className="group bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-600 transition shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={template.heroImage} 
                    alt={template.name}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-full">
                    {template.industryName}
                  </span>

                  <div className="absolute bottom-3 right-3 left-3 sm:bottom-4 sm:right-4 sm:left-4">
                    <h3 className="font-bold text-base sm:text-xl text-white leading-snug">{template.name}</h3>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="text-[11px] sm:text-xs text-slate-300 mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {template.description}
                  </p>

                  <div className="space-y-2 mb-3 sm:mb-4">
                    <div className="text-[10px] sm:text-[11px] font-bold text-slate-400">الخدمات المضمنة:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {template.sampleServices.slice(0, 4).map((s, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px]">
                          {s.title} ({s.price} ر.س)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 pt-0">
                <Link
                  to={`/build?template=${template.id}`}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  <span>استخدم هذا القالب</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            لا توجد قوالب في هذا التصنيف حالياً.
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-4xl font-black text-white leading-snug">كل ما تحتاجه لإدارة مواعيد عملك</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 sm:mt-3">منصة عربية بالكامل — أنشئ موقع حجز احترافي خلال دقائق</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: FileJson, title: 'استيراد وتصدير JSON', desc: 'احفظ قالب متجرك كملف وأعد استخدامه أو شاركه مع فرع آخر بضغطة زر.' },
            { icon: Layers, title: 'خدمات مفتوحة بلا حدود', desc: 'أضف أي نوع خدمات بأسعار ومدد وتصنيفات مخصصة لنشاطك.' },
            { icon: Calendar, title: 'تقويم وأجندة مواعيد', desc: 'تابع كل الحجوزات القادمة وحالاتها (مؤكد، قيد الانتظار، مكتمل) من لوحة واحدة.' },
            { icon: Sparkles, title: 'تخصيص الهوية البصرية', desc: 'غيّر الألوان والثيم وصورة الهيدر مع معاينة حية فورية قبل النشر.' },
            { icon: QrCode, title: 'رمز QR للمشاركة', desc: 'شارك رابط حجزك مع العملاء عبر رمز QR جاهز للطباعة.' },
            { icon: Globe, title: 'عملات عربية وعالمية', desc: 'ريال سعودي، درهم، دينار، جنيه مصري، وأكثر من 20 عملة.' },
          ].map((f, idx) => (
            <div key={idx} className="bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3 sm:mb-4">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{f.title}</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-4xl font-black text-white leading-snug">أسعار واضحة — ابدأ مجاناً 7 أيام</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 sm:mt-3">جرّب كل المزايا كاملة، ثم اختر الباقة المناسبة لحجم عملك.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {[
            { name: 'الأساسية', price: '99', popular: false, features: ['موقع حجز واحد', 'خدمات وموظفون بلا حدود', 'تأكيد حجز عبر واتساب', 'تخصيص الألوان والثيم', 'رمز QR للمشاركة'] },
            { name: 'الاحترافية', price: '199', popular: true, features: ['كل مزايا الأساسية', 'استيراد/تصدير قوالب JSON', 'إحصائيات وإيرادات', 'أكثر من قالب جاهز', 'دعم أولوية عبر واتساب'] },
            { name: 'الأعمال', price: '399', popular: false, features: ['كل مزايا الاحترافية', 'مواقع متعددة للفروع', 'مدير حساب مخصص', 'تكاملات مخصصة', 'تقارير متقدمة'] },
          ].map((plan) => (
            <div key={plan.name} className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border bg-slate-900 relative ${plan.popular ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-slate-800'}`}>
              {plan.popular && (
                <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-bold px-3 py-0.5 rounded-full">الأكثر طلباً</span>
              )}
              <h3 className="font-bold text-white text-sm sm:text-base mb-2">باقة {plan.name}</h3>
              <div className="flex items-end gap-1 mb-4 sm:mb-5">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{plan.price}</span>
                <span className="text-xs text-slate-400 mb-1">ر.س / شهر</span>
              </div>
              <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/build"
                className={`block w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs text-center transition active:scale-[0.98] ${plan.popular ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
              >
                ابدأ التجربة المجانية
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-6 sm:mt-8">الأسعار بالريال السعودي. تدعم المنصة كل العملات العربية لعرض الأسعار لعملائك.</p>
      </section>

      {/* Live Demo Links Section */}
      <section id="demo-links" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-4xl font-black text-white leading-snug">جرّب مواقع حقيقية قبل أن تبدأ</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 sm:mt-3">معاينة حية لصفحة حجز العميل ولوحة تحكم التاجر</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <Link
            to="/b/salon-luxe"
            className="group bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-amber-500/50 transition flex items-center gap-3 sm:gap-4 active:scale-[0.99]"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-sm">صفحة حجز العميل</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">صالون فاخر — اختر الخدمة والمختص والوقت</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-amber-400 mr-auto transition shrink-0" />
          </Link>

          <Link
            to="/merchant/salon-luxe"
            className="group bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-amber-500/50 transition flex items-center gap-3 sm:gap-4 active:scale-[0.99]"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-sm">لوحة تحكم التاجر</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">إدارة الخدمات والمواعيد والإحصائيات</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-amber-400 mr-auto transition shrink-0" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
