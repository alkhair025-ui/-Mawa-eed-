import React, { useState, useEffect } from 'react';
import { Clock, Zap, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

interface TrialBannerProps {
  trialEndIso?: string;
  planName?: string;
  onUpgradeClick?: () => void;
}

export default function TrialBanner({ trialEndIso, planName = 'التجربة المجانية (7 أيام)', onUpgradeClick }: TrialBannerProps) {
  const [daysLeft, setDaysLeft] = useState(7);
  const [hoursLeft, setHoursLeft] = useState(0);

  useEffect(() => {
    if (!trialEndIso) return;
    const calculateTimeLeft = () => {
      const diff = new Date(trialEndIso).getTime() - new Date().getTime();
      if (diff <= 0) {
        setDaysLeft(0);
        setHoursLeft(0);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setDaysLeft(days);
      setHoursLeft(hours);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [trialEndIso]);

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 px-4 py-2.5 rounded-2xl shadow-md border border-amber-400/40 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      
      <div className="flex items-center gap-3 text-right">
        <div className="w-9 h-9 rounded-xl bg-slate-950/10 backdrop-blur-sm flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5 text-slate-950 font-extrabold animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-slate-950">
              حالة اشتراكك: {planName}
            </span>
            <span className="bg-slate-950 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              تجربة نشطة
            </span>
          </div>
          <p className="text-xs text-slate-900 font-medium">
            متبقي في فترتك التجريبية المجانية: <strong className="text-slate-950 font-black">{daysLeft} أيام و {hoursLeft} ساعة</strong>. استمتع بجميع المزايا دون قيود!
          </p>
        </div>
      </div>

      <button
        onClick={onUpgradeClick}
        className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm hover:scale-105"
      >
        <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
        <span>تفعيل الخطة الكاملة (الترقية)</span>
      </button>

    </div>
  );
}
