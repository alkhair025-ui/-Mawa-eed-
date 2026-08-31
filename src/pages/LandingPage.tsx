import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Globe, 
  Scissors, 
  Stethoscope, 
  Smile, 
  Briefcase, 
  Smartphone, 
  ArrowLeft,
  Star,
  Layers,
  BarChart3,
  QrCode,
  Play
} from 'lucide-react';
import { TEMPLATES, DEMO_BUSINESSES } from '../data/initialData';
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
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>المنصة الأولى لإنشاء مواقع الحجوزات والمواعيد أونلاين</span>
            <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold">
              تجربة 7 أيام مجاناً
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto">
            اصنع موقع حجز المواعيد الخاص بك في{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              دقيقة واحدة فقط!
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            مهما كان نوع عملك (صالون حلاقة، عيادة طبية، سبا وتجميل، مكتب استشارات)، أنشئ موقعك التفاعلي واختر قالبك المفضّل واستلم رابط الحجز المباشر فوراً مع تجربة مجانية شاملة لمدة أسبوع.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/build"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>ابدأ تجربتك المجانية (7 أيام)</span>
            </Link>

            <a
              href="#demo-links"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>جرب المواقع العينة</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>بدون بطاقة إئتمان</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>رابط حجز مباشر + QR Code</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تأكيد فوري عبر واتساب</span>
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
                    صالون الفخامة والروعة للرجال
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    احجز موعد حلاقتك أو العناية الشخصية في ثوانٍ
                  </h3>
                  <p className="text-xs text-slate-400">
                    اختر الخدمة والموظف المفضّل، حدد اليوم والوقت المناسب، واحصل على تأكيد فوري!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-right">
                      <div className="font-bold text-sm text-amber-400">حلاقة وتحديد اللحية VIP</div>
                      <div className="text-xs text-slate-400 mt-0.5">45 دقيقة • 90 ر.س</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-right">
                      <div className="font-bold text-sm text-amber-400">باقة العريس الشاملة</div>
                      <div className="text-xs text-slate-400 mt-0.5">90 دقيقة • 350 ر.س</div>
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
                    تأكيد الحجز الفوري
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Demo Websites Section (LIVE interactive previews) */}
      <section id="demo-links" className="py-16 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              معاينة سريعة مسبقة
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              جرب المنصة من منظور العميل ومنظور صاحب العمل
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              اختر أحد الأنشطة الجاهزة لاستعراض صفحة الحجز المباشرة للعملاء أو تجربة لوحة التحكم الكاملة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Demo 1: Luxe Barber */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-amber-500/50 transition duration-300 relative group overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold border border-amber-500/30">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">صالون الفخامة والروعة</h3>
                    <p className="text-xs text-slate-400">قطاع صالونات الحلاقة والعناية</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20">
                  قالب Luxe Dark
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                موقع متكامل يتيح للعميل اختيار الحلاق المفضل، وتحديد نوع الخدمة مع تأكيد أوتوماتيكي.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/b/salon-luxe"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Globe className="w-4 h-4" />
                  <span>صفحة الحجز للعميل</span>
                </Link>
                <Link
                  to="/merchant/salon-luxe"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
                >
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>لوحة التاجر والأجندة</span>
                </Link>
              </div>
            </div>

            {/* Demo 2: Care Clinic */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-blue-500/50 transition duration-300 relative group overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold border border-sky-500/30">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">عيادات الرعاية المتقدمة</h3>
                    <p className="text-xs text-slate-400">قطاع العيادات والمراكز الطبية</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 text-xs font-semibold rounded-full border border-sky-500/20">
                  قالب Medical Care
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                مخصص للأطباء والعيادات مع جدولة دقيقة للاستشارات الطبية وفحص الأسنان ومتابعة الحالة.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/b/care-clinic"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Globe className="w-4 h-4" />
                  <span>صفحة الحجز للعميل</span>
                </Link>
                <Link
                  to="/merchant/care-clinic"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
                >
                  <BarChart3 className="w-4 h-4 text-sky-400" />
                  <span>لوحة التاجر والأجندة</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Template Selection Section */}
      <section id="templates" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            قوالب جاهزة ومصممة لكل أنواع الأعمال
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            اختر القالب الذي يناسب نشاطك التجاري وعدل ألوانه وخدماتك وساعات عملك بكل سهولة.
          </p>

          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setSelectedIndustry('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'all' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              جميع الأنشطة
            </button>
            <button
              onClick={() => setSelectedIndustry('barber')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'barber' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              صالونات حلاقة
            </button>
            <button
              onClick={() => setSelectedIndustry('clinic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'clinic' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              عيادات طبية
            </button>
            <button
              onClick={() => setSelectedIndustry('spa')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'spa' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              سبا وتجميل
            </button>
            <button
              onClick={() => setSelectedIndustry('consulting')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedIndustry === 'consulting' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
            >
              استشارات وتدريب
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
                    <div className="text-[11px] font-bold text-slate-400">الخدمات النموذجية المضمنة:</div>
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

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-bold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              لماذا منصة مواعيد؟
            </span>
            <h2 className="text-3xl font-black text-white mt-3">
              كل الأدوات التي تحتاجها لإدارة جدول عملك باحترافية
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-4 border border-amber-500/30">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">أوقات وساعات عمل مرنة</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                حدد ساعات العمل لكل يوم، واستراحات الغداء، وسعة المواعيد بكل دقة لمنع التعارض.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/30">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">رابط خاص ورمز QR للطباعة</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                احصل على رابط فريد خاص بمتجرك مع كود QR مطبوع للمكتب أو الطاولة أو كروت الأعمال.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">تقارير وإحصائيات الإيرادات</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                تابع حجم الحجوزات اليومي والأسبوعي والإيرادات المتوقعة والخدمات الأكثر طلباً.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Pricing & Free Trial Section */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 font-bold text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            خطط الاشتراك
          </span>
          <h2 className="text-3xl font-black text-white mt-3">
            ابدأ مجاناً لمدة 7 أيام ثم اختر الخطة المناسبة
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            جميع الخطط تشمل فترة تجريبية مجانية كاملة المزايا دون الحاجة لبطاقة إئتمان.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Basic Plan */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">الخطة الأساسية (Basic)</h3>
              <p className="text-xs text-slate-400 mb-4">مناسبة للمشاريع الناشئة والمستقلين</p>
              <div className="text-3xl font-black text-white mb-6">
                99 <span className="text-xs font-semibold text-slate-400">ر.س / شهرياً</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>حتى 100 موعد شهرياً</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>طاقم عمل حتى 2 موظفين</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>رابط حجز مباشر + QR Code</span>
                </li>
              </ul>
            </div>
            <Link
              to="/build"
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-center font-bold text-xs rounded-xl transition border border-slate-700"
            >
              ابدأ التجربة المجانية (7 أيام)
            </Link>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="p-8 rounded-3xl bg-slate-900 border-2 border-amber-500 relative flex flex-col justify-between shadow-2xl shadow-amber-500/10">
            <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">
              الأكثر طلباً
            </span>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">الخطة الاحترافية (Pro)</h3>
              <p className="text-xs text-slate-400 mb-4">للصالونات والعيادات المتميزة والمراكز المتوسطة</p>
              <div className="text-3xl font-black text-amber-400 mb-6">
                199 <span className="text-xs font-semibold text-slate-400">ر.س / شهرياً</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>حجوزات لامحدودة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>طاقم عمل حتى 10 موظفين</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>تأكيد تلقائي عبر واتساب</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>إحصائيات الإيرادات المتقدمة</span>
                </li>
              </ul>
            </div>
            <Link
              to="/build"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-center font-bold text-xs rounded-xl transition shadow-lg shadow-amber-500/20"
            >
              جرّب مجاناً 7 أيام الآن
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">خطة الأعمال (Enterprise)</h3>
              <p className="text-xs text-slate-400 mb-4">للمراكز الكبيرة والسلاسل المتعددة الفروع</p>
              <div className="text-3xl font-black text-white mb-6">
                399 <span className="text-xs font-semibold text-slate-400">ر.س / شهرياً</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>فروع متعددة وطاقم لامحدود</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>ربط نطاق خاص (Domain)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>مدير حساب مخصص وتكامل API</span>
                </li>
              </ul>
            </div>
            <Link
              to="/build"
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-center font-bold text-xs rounded-xl transition border border-slate-700"
            >
              تواصل مع المبيعات
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
