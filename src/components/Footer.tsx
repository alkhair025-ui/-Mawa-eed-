import React from 'react';
import { Calendar, Heart, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">منصة مواعيد</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              المنصة السحابية المتكاملة لإنشاء وإدارة مواقع حجز المواعيد أونلاين لمختلف القطاعات والأنشطة التجارية في الشرق الأوسط.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">أنواع المنصات</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#templates" className="hover:text-amber-400 transition">صالونات الحلاقة والعناية</a></li>
              <li><a href="#templates" className="hover:text-amber-400 transition">العيادات والمراكز الطبية</a></li>
              <li><a href="#templates" className="hover:text-amber-400 transition">السبا ومراكز التجميل</a></li>
              <li><a href="#templates" className="hover:text-amber-400 transition">مكاتب الاستشارات والتدريب</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/build" className="hover:text-amber-400 transition">إنشاء متجر مواعيد جديد</a></li>
              <li><a href="/merchant/salon-luxe" className="hover:text-amber-400 transition">معاينة لوحة التحكم</a></li>
              <li><a href="/b/salon-luxe" className="hover:text-amber-400 transition">معاينة صفحة العميل</a></li>
              <li><a href="#pricing" className="hover:text-amber-400 transition">خطة التجربة المجانية (7 أيام)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">ضمان الأمان والخدمة</h4>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                <Shield className="w-4 h-4" />
                تأكيد فوري عبر واتساب
              </div>
              <p className="text-[11px] text-slate-400">
                روابط حجز تفاعلية، عداد تجربة مجاني، ودعم تقني على مدار الساعة لخدمة عملائك.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} منصة مواعيد (Mawa'eed SaaS). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1 text-slate-400">
            صُنعت بكل <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> لخدمة رواد الأعمال
          </div>
        </div>
      </div>
    </footer>
  );
}
