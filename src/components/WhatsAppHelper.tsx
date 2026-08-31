import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface WhatsAppHelperProps {
  phone: string;
  customerName: string;
  serviceTitle: string;
  date: string;
  time: string;
  bookingCode: string;
  businessName: string;
}

export default function WhatsAppHelper({
  phone,
  customerName,
  serviceTitle,
  date,
  time,
  bookingCode,
  businessName
}: WhatsAppHelperProps) {
  // Format Arabic message for WhatsApp
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const message = `مرحباً ${customerName} 👋\n\nتم تأكيد موعدك بنجاح لدى *${businessName}*! 🎉\n\n📋 *تفاصيل الموعد:*\n• الخدمة: ${serviceTitle}\n• التاريخ: ${date}\n• الوقت: ${time}\n• رمز الحجز: ${bookingCode}\n\nنشكرك على اختيارك لنا وننتظر حضورك الميمون! 🌟`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-md hover:shadow-emerald-600/30"
    >
      <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
      <span>إرسال تأكيد عبر واتساب</span>
    </a>
  );
}
