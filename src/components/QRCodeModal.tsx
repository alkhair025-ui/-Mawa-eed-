import React, { useState } from 'react';
import { QrCode, Copy, Check, ExternalLink, Download, Share2, Printer, X } from 'lucide-react';

interface QRCodeModalProps {
  slug: string;
  businessName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeModal({ slug, businessName, isOpen, onClose }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const bookingUrl = `${window.location.origin}/b/${slug}`;
  const qrImageApi = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(bookingUrl)}&color=0f172a`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-2 text-amber-700">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">رابط ورمز QR للحجز</h3>
          <p className="text-xs text-slate-500 mt-1">
            اطبع الرمز وضعه على الاستقبال أو شاركه مع عملائك عبر شبكات التواصل الاجتماعي
          </p>
        </div>

        {/* Printable Card Area */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center mb-5 print:border-2 print:border-black">
          <h4 className="font-bold text-slate-900 text-lg mb-1">{businessName}</h4>
          <p className="text-xs text-amber-600 font-semibold mb-4">احجز موعدك أونلاين في ثوانٍ</p>
          
          <div className="bg-white p-3 rounded-xl inline-block shadow-sm border border-slate-200 mb-3">
            <img 
              src={qrImageApi} 
              alt="QR Code for booking" 
              className="w-44 h-44 object-contain mx-auto"
            />
          </div>

          <p className="text-[11px] font-mono text-slate-500 break-all dir-ltr bg-white py-1.5 px-3 rounded-lg border border-slate-200">
            {bookingUrl}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ الرابط المباشر!' : 'نسخ رابط الحجز أونلاين'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>زيارة الصفحة</span>
            </a>

            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الرمز</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
