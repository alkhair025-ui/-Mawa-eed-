import React, { useState } from 'react';
import { MessageCircle, Bell, Copy, Check, ExternalLink } from 'lucide-react';
import { formatDualDateFull } from '../lib/calendar';

export type WhatsAppMessageType = 'confirm' | 'reminder';

interface WhatsAppHelperProps {
  phone: string;
  customerName: string;
  serviceTitle: string;
  date: string;
  time: string;
  bookingCode: string;
  businessName: string;
  /** رقم واتساب العمل (يظهر في الرسالة للعميل) */
  businessPhone?: string;
  /** نوع الرسالة: تأكيد أو تذكير */
  type?: WhatsAppMessageType;
  /** عرض مضغوط للجدول */
  compact?: boolean;
  /** إظهار زر نسخ الرسالة أيضاً */
  showCopy?: boolean;
}

function buildMessage({
  type,
  customerName,
  serviceTitle,
  date,
  time,
  bookingCode,
  businessName,
  businessPhone,
}: {
  type: WhatsAppMessageType;
  customerName: string;
  serviceTitle: string;
  date: string;
  time: string;
  bookingCode: string;
  businessName: string;
  businessPhone?: string;
}): string {
  const phoneLine = businessPhone
    ? `\n• للتواصل: ${businessPhone}`
    : '';

  const dualDate = formatDualDateFull(date) || date;

  if (type === 'reminder') {
    return (
      `مرحباً ${customerName} 👋\n\n` +
      `تذكير لطيف بموعدك القادم لدى *${businessName}* ⏰\n\n` +
      `📋 *تفاصيل الموعد:*\n` +
      `• الخدمة: ${serviceTitle}\n` +
      `• التاريخ: ${dualDate}\n` +
      `• الوقت: ${time}\n` +
      `• رمز الحجز: ${bookingCode}` +
      phoneLine +
      `\n\nننتظر حضورك في الموعد المحدد. إذا احتجت تعديل أو إلغاء، تواصل معنا مباشرة.\n\nشكراً لثقتك بنا 🌟`
    );
  }

  // confirm
  return (
    `مرحباً ${customerName} 👋\n\n` +
    `تم تأكيد موعدك بنجاح لدى *${businessName}*! 🎉\n\n` +
    `📋 *تفاصيل الموعد:*\n` +
    `• الخدمة: ${serviceTitle}\n` +
    `• التاريخ: ${dualDate}\n` +
    `• الوقت: ${time}\n` +
    `• رمز الحجز: ${bookingCode}` +
    phoneLine +
    `\n\nننتظر حضورك الميمون. في حال رغبت بالتعديل أو الإلغاء يرجى التواصل معنا مسبقاً.\n\nشكراً لاختيارك لنا 🌟`
  );
}

function cleanPhoneNumber(phone: string): string {
  // يبقي الأرقام وعلامة + فقط، ثم يحول 00 إلى +
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('00')) cleaned = '+' + cleaned.slice(2);
  // إذا بدأ بـ 05 (سعودي بدون مفتاح) نضيف 966
  if (/^05\d{8}$/.test(cleaned)) cleaned = '966' + cleaned.slice(1);
  // إذا بدأ بـ 5 بدون صفر (بعض الحالات)
  if (/^5\d{8}$/.test(cleaned)) cleaned = '966' + cleaned;
  return cleaned.replace(/^\+/, ''); // wa.me لا يحب + في البداية
}

export default function WhatsAppHelper({
  phone,
  customerName,
  serviceTitle,
  date,
  time,
  bookingCode,
  businessName,
  businessPhone,
  type = 'confirm',
  compact = false,
  showCopy = true,
}: WhatsAppHelperProps) {
  const [copied, setCopied] = useState(false);

  const message = buildMessage({
    type,
    customerName,
    serviceTitle,
    date,
    time,
    bookingCode,
    businessName,
    businessPhone,
  });

  const cleanPhone = cleanPhoneNumber(phone || '');
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
    : '#';

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback قديم
      const ta = document.createElement('textarea');
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const label =
    type === 'reminder'
      ? compact
        ? 'تذكير'
        : 'إرسال تذكير واتساب'
      : compact
        ? 'تأكيد'
        : 'إرسال تأكيد واتساب';

  const Icon = type === 'reminder' ? Bell : MessageCircle;
  const btnColor =
    type === 'reminder'
      ? 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/20'
      : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20';

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          title={label}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 ${btnColor} text-white font-bold text-[11px] rounded-lg transition shadow-sm`}
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{label}</span>
        </a>
        {showCopy && (
          <button
            type="button"
            onClick={handleCopy}
            title="نسخ الرسالة"
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 ${btnColor} text-white font-bold text-xs rounded-xl transition shadow-md flex-1 sm:flex-none`}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
      </a>

      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition border border-slate-700"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>تم النسخ</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>نسخ الرسالة</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
