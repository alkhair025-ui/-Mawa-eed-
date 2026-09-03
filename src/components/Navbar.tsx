import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, PlusCircle, Globe, ShieldCheck, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // أغلق القائمة عند تغيير الصفحة
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // منع التمرير عند فتح القائمة
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { to: '/', label: 'الرئيسية', isRoute: true },
    { href: '#templates', label: 'القوالب والأنشطة' },
    { href: '#features', label: 'المميزات' },
    { href: '#demo-links', label: 'معاينة حية', icon: Globe },
    { href: '#pricing', label: 'الأسعار' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
              مواعيد
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide text-amber-400 block -mt-0.5 sm:-mt-1">
              Mawa'eed SaaS
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.to!}
                className={`transition-colors hover:text-amber-400 ${
                  location.pathname === '/' ? 'text-amber-400 font-bold' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                {link.icon && <link.icon className="w-4 h-4 text-emerald-400" />}
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop Actions + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/merchant/salon-luxe"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">لوحة تاجر تجريبية</span>
            <span className="lg:hidden">لوحة تجريبية</span>
          </Link>

          <Link
            to="/build"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm px-3.5 sm:px-4 py-2 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>أنشئ موقعك</span>
            <span className="hidden lg:inline-block bg-slate-950/20 text-slate-950 text-[11px] px-1.5 py-0.5 rounded font-bold">
              مجاناً 7 أيام
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition"
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.to!}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                    location.pathname === '/'
                      ? 'bg-amber-500/15 text-amber-400 font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 transition flex items-center gap-2"
                >
                  {link.icon && <link.icon className="w-4 h-4 text-emerald-400" />}
                  {link.label}
                </a>
              )
            )}

            <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                to="/merchant/salon-luxe"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-700"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                لوحة تاجر تجريبية
              </Link>
              <Link
                to="/build"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20"
              >
                <PlusCircle className="w-4 h-4" />
                أنشئ موقعك الآن — مجاناً 7 أيام
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
