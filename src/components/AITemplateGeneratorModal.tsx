import React, { useState } from 'react';
import { apiUrl } from '../lib/api';
import { Sparkles, Wand2, RefreshCw, Check, Palette, Layers, CheckCircle2 } from 'lucide-react';
import { TemplateConfig } from '../types';

interface AITemplateGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId?: string;
  onApplyTemplate: (generatedConfig: TemplateConfig, newServices?: any[], newStaff?: any[]) => void;
}

export default function AITemplateGeneratorModal({ 
  isOpen, 
  onClose, 
  businessId,
  onApplyTemplate 
}: AITemplateGeneratorModalProps) {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [applying, setApplying] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<TemplateConfig | null>(null);
  const [generatedServices, setGeneratedServices] = useState<any[]>([]);
  const [generatedStaff, setGeneratedStaff] = useState<any[]>([]);

  if (!isOpen) return null;

  const presets = [
    { text: 'صالون حلاقة رجالي عتيق بألوان خشبية وذهبية دافئة', icon: '💈' },
    { text: 'عيادة تغذية ونحت قوام هادئة باللون الوردي والأبيض', icon: '🩺' },
    { text: 'مركز فروسية وركوب خيل فاخر باللون البني والذهبي الملكي', icon: '🏇' },
    { text: 'استوديو تصوير إبداعي باللون البنفسجي والأسود الفاخر', icon: '📸' },
    { text: 'مركز صيانة وتلميع سيارات باللون الأزرق الرياضي والبرتقالي', icon: '🚗' },
    { text: 'أكاديمية تدريب ودروس باللون الأزرق الملكي والأخضر', icon: '📚' }
  ];

  const handleGenerateAI = async (textPrompt: string) => {
    const query = textPrompt || prompt;
    if (!query) return;

    setGenerating(true);
    setGeneratedTemplate(null);

    // AI Logic mapping text query into exact CSS colors, imagery, services, and team
    setTimeout(() => {
      let primary = '#0f172a';
      let secondary = '#d97706';
      let hero = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop';
      let logo = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&fit=crop';
      let badge = 'تصميم ذكاء اصطناعي مخصص';
      let industryName = 'نشاط مخصص بالذكاء الاصطناعي';
      let sampleServs: any[] = [];
      let sampleStaffMembers: any[] = [];

      if (query.includes('فروسية') || query.includes('خيل') || query.includes('ركوب')) {
        primary = '#78350f'; // Warm Saddle Brown
        secondary = '#d97706'; // Gold Amber
        hero = 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&fit=crop';
        logo = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&fit=crop';
        badge = 'أصالة وفخامة الخيل العربي';
        industryName = 'مرابط وأكاديمية فروسية';
        sampleServs = [
          { title: 'حصة تدريب ركوب خيل للمبتدئين', price: 200, duration: 45, category: 'تدريب فروسية', location_type: 'branch' },
          { title: 'جولة ركوب خيل حر بالساحة الفسيحة', price: 150, duration: 30, category: 'جولات حرة', location_type: 'branch' },
          { title: 'جلسة تصوير خاصة مع الخيل الأصيل', price: 350, duration: 60, category: 'تصوير', location_type: 'branch' }
        ];
        sampleStaffMembers = [
          { name: 'الفارس بدر العتيبي', role: 'مدرب قفز حواجز وفروسية معتمد', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&fit=crop' }
        ];
      } else if (query.includes('تغذية') || query.includes('وردي') || query.includes('تجميل') || query.includes('سبا')) {
        primary = '#831843'; // Rose Pink/Plum
        secondary = '#ec4899'; // Vibrant Pink
        hero = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&fit=crop';
        logo = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&fit=crop';
        badge = 'نضارة وجمال متجدد';
        industryName = 'عيادة تغذية ونحت القوام';
        sampleServs = [
          { title: 'جلسة استشارة ونحت القوام', price: 250, duration: 45, category: 'تغذية ورشاقة', location_type: 'branch' },
          { title: 'جلسة هيدرافيسيال لنضارة البشرة', price: 300, duration: 60, category: 'عناية بشرة', location_type: 'branch' },
          { title: 'برنامج غذائي مخصص أونلاين', price: 180, duration: 30, category: 'أونلاين', location_type: 'online' }
        ];
        sampleStaffMembers = [
          { name: 'د. ياسمين الشمري', role: 'أخصائية التغذية العلاجية والبشرة', avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c4021204?w=200&fit=crop' }
        ];
      } else if (query.includes('حلاقة') || query.includes('خشبي') || query.includes('صالون')) {
        primary = '#1e1b4b'; // Deep Dark Indigo
        secondary = '#d97706'; // Vintage Amber Gold
        hero = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop';
        logo = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop';
        badge = 'أناقة الحلاقة الكلاسيكية';
        industryName = 'صالون حلاقة وعناية VIP';
        sampleServs = [
          { title: 'قص شعر وتصفيف كلاسيكي احترافي', price: 100, duration: 45, category: 'شعر', location_type: 'branch' },
          { title: 'تحديد وتحديد اللحية بالفوطة الساخنة', price: 70, duration: 30, category: 'لحية', location_type: 'branch' },
          { title: 'باقة العناية الشاملة الملكية', price: 300, duration: 75, category: 'باقات VIP', location_type: 'branch' }
        ];
        sampleStaffMembers = [
          { name: 'الكابتن طارق', role: 'خبير التصفيف الكلاسيكي', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop' }
        ];
      } else if (query.includes('تصوير') || query.includes('استوديو') || query.includes('بنفسجي')) {
        primary = '#3b0764'; // Deep Violet
        secondary = '#a855f7'; // Bright Purple
        hero = 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&fit=crop';
        logo = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&fit=crop';
        badge = 'إبداع وتوثيق احترافي';
        industryName = 'استوديو تصوير وفنون';
        sampleServs = [
          { title: 'جلسة تصوير بورتريه في الاستوديو', price: 350, duration: 60, category: 'تصوير داخي', location_type: 'branch' },
          { title: 'حجز الاستوديو مع معدات الإضاءة', price: 600, duration: 120, category: 'تأجير استوديو', location_type: 'branch' }
        ];
        sampleStaffMembers = [
          { name: 'أ. ماجد الفن', role: 'مصور فوتوغرافي ومخرج إضاءة', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&fit=crop' }
        ];
      } else if (query.includes('سيارات') || query.includes('صيانة') || query.includes('أزرق')) {
        primary = '#1e3a8a'; // Deep Blue
        secondary = '#f59e0b'; // Amber Gold
        hero = 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200&fit=crop';
        logo = 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=200&fit=crop';
        badge = 'حماية ولمعان استثنائي';
        industryName = 'مركز عناية وتلميع سيارات';
        sampleServs = [
          { title: 'غسيل وتلميع ساطع ساطع VIP', price: 200, duration: 60, category: 'تلميع', location_type: 'branch' },
          { title: 'جلسة حماية نانو سيراميك سريعة', price: 900, duration: 150, category: 'حماية', location_type: 'branch' }
        ];
        sampleStaffMembers = [
          { name: 'المهندس وسيم', role: 'خبير التلميع والحماية', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&fit=crop' }
        ];
      } else {
        primary = '#0f172a';
        secondary = '#10b981';
        hero = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop';
        logo = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&fit=crop';
        badge = 'منصة حجز ذكية مخصصة';
        industryName = 'نشاط تجاري مخصص بالـ AI';
        sampleServs = [
          { title: 'حجز جلسة / خدمة مخصصة بالذكاء الاصطناعي', price: 150, duration: 45, category: 'خدمة مخصصة', location_type: 'branch' },
          { title: 'استشارة أونلاين أو زيارة خاصة', price: 200, duration: 60, category: 'أونلاين', location_type: 'online' }
        ];
        sampleStaffMembers = [
          { name: 'مختص تقديم الخدمة المباشرة', role: 'مختص ومستشار الخدمة', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop' }
        ];
      }

      const aiTemplate: TemplateConfig = {
        id: 'ai-gen-' + Date.now(),
        name: 'قالب الذكاء الاصطناعي Mawa\'eed AI',
        nameEn: 'AI Generated Theme',
        industry: 'custom_ai',
        industryName: industryName,
        primaryColor: primary,
        secondaryColor: secondary,
        heroImage: hero,
        logoDefault: logo,
        badgeText: badge,
        description: `قالب وتنسيق ألوان مخصص تم إنشاؤه بالذكاء الاصطناعي بناءً على طلبك: "${query}"`,
        sampleServices: sampleServs,
        sampleStaff: sampleStaffMembers
      };

      setGeneratedTemplate(aiTemplate);
      setGeneratedServices(sampleServs);
      setGeneratedStaff(sampleStaffMembers);
      setGenerating(false);
    }, 1000);
  };

  const handleApplyClick = async () => {
    if (!generatedTemplate) return;
    setApplying(true);

    try {
      if (businessId) {
        // 1. Update business in database directly
        await fetch(apiUrl('/api/businesses'), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: businessId,
            primary_color: generatedTemplate.primaryColor,
            secondary_color: generatedTemplate.secondaryColor,
            cover_url: generatedTemplate.heroImage,
            logo_url: generatedTemplate.logoDefault,
            template_id: generatedTemplate.id,
            description: generatedTemplate.description
          })
        });

        // 2. Insert generated services if available
        for (const s of generatedServices) {
          await fetch(apiUrl('/api/services'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              business_id: businessId,
              title: s.title,
              price: s.price,
              currency: 'SAR',
              duration_min: s.duration,
              category: s.category,
              location_type: s.location_type || 'branch',
              description: 'خدمة تم إنشاؤها تلقائياً بالذكاء الاصطناعي'
            })
          });
        }
      }

      onApplyTemplate(generatedTemplate, generatedServices, generatedStaff);
      alert('🎉 تم تطبيق القالب المولد بالذكاء الاصطناعي وتحديث الألوان والخدمات بنجاح!');
      onClose();
    } catch (err) {
      console.error('Apply AI Template error:', err);
      alert('حدث خطأ أثناء حفظ القالب، يرجى المحاولة مرة أخرى.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 dir-rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-right shadow-2xl relative overflow-hidden">
        
        {/* Glow Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Wand2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">مُنشئ القوالب الفوري بالذكاء الاصطناعي (AI Theme Engine)</h3>
              <p className="text-xs text-slate-400">اكتب وصفك وسيقوم الذكاء الاصطناعي بتوليد الهوية والألوان والخدمات وتطبيقها فوراً!</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xs font-bold">إغلاق</button>
        </div>

        {/* Prompt Input Area */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">اكتب وصف نشاطك وألوانك المفضلة:</label>
            <textarea
              rows={3}
              placeholder="مثال: صالون حلاقة عتيق بألوان خشبية وذهبية دافئة، أو مربط فروسية ملكي، أو عيادة تغذية وردية..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] text-slate-400 font-bold block mb-2">أمثلة مقترحة للتوليد بنقرة واحدة:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(preset.text);
                    handleGenerateAI(preset.text);
                  }}
                  className="text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 p-2.5 rounded-xl border border-slate-800 transition text-right flex items-center gap-2"
                >
                  <span>{preset.icon}</span>
                  <span className="truncate">{preset.text}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleGenerateAI(prompt)}
            disabled={generating || !prompt}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-amber-500/20"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>جاري تحليل الألوان والخدمات وتوليد الهوية بالـ AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>توليد القالب بالذكاء الاصطناعي الآن</span>
              </>
            )}
          </button>
        </div>

        {/* AI Result Live Preview */}
        {generatedTemplate && (
          <div className="bg-slate-950 p-5 rounded-2xl border-2 border-amber-500 animate-in zoom-in duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                نتيجة الذكاء الاصطناعي جاهزة!
              </span>
              <span className="text-xs font-bold text-slate-300">{generatedTemplate.industryName}</span>
            </div>

            <div className="h-28 rounded-xl overflow-hidden relative">
              <img src={generatedTemplate.heroImage} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs font-bold text-white">
                <span>{generatedTemplate.badgeText}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-300">الألوان المعتمدة:</span>
                  <div className="w-5 h-5 rounded-full border-2 border-white shadow" style={{ backgroundColor: generatedTemplate.primaryColor }} />
                  <div className="w-5 h-5 rounded-full border-2 border-white shadow" style={{ backgroundColor: generatedTemplate.secondaryColor }} />
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-300">
              <div className="font-bold text-amber-400">الخدمات التي أحدثها الذكاء الاصطناعي:</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {generatedServices.map((s, idx) => (
                  <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-200 px-2 py-1 rounded text-[11px]">
                    {s.title} ({s.price} ر.س)
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleApplyClick}
              disabled={applying}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
            >
              {applying ? (
                <span>جاري الحفظ والتطبيق المباشر...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>تطبيق وحفظ هذا القالب والخدمات فوراً</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
