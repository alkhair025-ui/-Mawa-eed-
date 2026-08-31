import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Sparkles, PlusCircle, Globe, ShieldCheck, Clock } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Calendar className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
              مواعيد
            </span>
            <span className="text-[10px] font-semibold tracking-wide text-amber-400 block -mt-1">
              Mawa'eed SaaS
            </span>
          </div>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition-colors hover:text-amber-400 ${location.pathname === '/' ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
          >
            الرئيسية
          </Link>
          <a href="#templates" className="text-slate-300 hover:text-amber-400 transition-colors">
            القوالب والأنشطة
          </a>
          <a href="#features" className="text-slate-300 hover:text-amber-400 transition-colors">
            المميزات
          </a>
          <a href="#demo-links" className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-400" />
            معاينة حية للمواقع
          </a>
          <a href="#pricing" className="text-slate-300 hover:text-amber-400 transition-colors">
            الأسعار والتجربة
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/merchant/salon-luxe"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            لوحة تاجر تجريبية
          </Link>

          <Link
            to="/build"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm px-4 py-2.2 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>أنشئ موقعك الآن</span>
            <span className="hidden lg:inline-block bg-slate-950/20 text-slate-950 text-[11px] px-1.5 py-0.5 rounded font-bold">
              مجاناً 7 أيام
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}
