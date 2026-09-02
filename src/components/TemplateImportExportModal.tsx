import React, { useRef } from 'react';
import { Upload, Download, FileJson, Check, AlertCircle, FileText } from 'lucide-react';
import { Business } from '../types';

interface TemplateImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBusiness?: Business | null;
  onImportSuccess: (importedData: any) => void;
}

export default function TemplateImportExportModal({
  isOpen,
  onClose,
  currentBusiness,
  onImportSuccess
}: TemplateImportExportModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Sample pre-configured downloadable templates
  const sampleTemplates = [
    {
      name: 'صالون فاخر أسود وذهبي (Luxe Gold)',
      filename: 'luxe-gold-barber.json',
      config: {
        businessName: 'صالون الفخامة والروعة',
        industry: 'barber',
        template_id: 'luxury-dark',
        primary_color: '#0f172a',
        secondary_color: '#d97706',
        currency: 'SAR',
        description: 'تصميم أسود وذهبي راقي مخصص لصالونات الحلاقة والعناية الشخصية.',
        cover_url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop'
      }
    },
    {
      name: 'عيادة طبية أزرق وأخضر (Care Clinic)',
      filename: 'medical-care-clinic.json',
      config: {
        businessName: 'عيادة الرعاية المتقدمة',
        industry: 'clinic',
        template_id: 'medical-clean',
        primary_color: '#0284c7',
        secondary_color: '#0d9488',
        currency: 'SAR',
        description: 'تصميم هادئ ومريح باللون الأزرق المخصص للعيادات والمراكز الطبية.',
        cover_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&fit=crop'
      }
    },
    {
      name: 'مرابط وأكاديمية فروسية (Royal Equestrian)',
      filename: 'royal-equestrian.json',
      config: {
        businessName: 'مرابط الأصالة والفروسية',
        industry: 'equestrian',
        template_id: 'equestrian-royal',
        primary_color: '#78350f',
        secondary_color: '#d97706',
        currency: 'SAR',
        description: 'تصميم بني وذهبي دافئ مخصص لمرابط وركوب الخيل.',
        cover_url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&fit=crop'
      }
    }
  ];

  // Export current configuration to JSON file
  const handleExportJSON = () => {
    const templateData = {
      exportVersion: '1.0',
      exportedAt: new Date().toISOString(),
      businessName: currentBusiness?.name || 'قالب مخصص',
      industry: currentBusiness?.industry || 'custom',
      template_id: currentBusiness?.template_id || 'universal-open',
      primary_color: currentBusiness?.primary_color || '#0f172a',
      secondary_color: currentBusiness?.secondary_color || '#d97706',
      currency: currentBusiness?.currency || 'SAR',
      description: currentBusiness?.description || '',
      cover_url: currentBusiness?.cover_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop',
      logo_url: currentBusiness?.logo_url || ''
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(templateData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mawaeed-template-${currentBusiness?.slug || 'config'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Download a preset sample template JSON file to computer
  const handleDownloadSampleJSON = (sample: typeof sampleTemplates[0]) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sample.config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", sample.filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON configuration file from File Manager / Computer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonStr = event.target?.result as string;
        const parsedData = JSON.parse(jsonStr);

        if (!parsedData.primary_color && !parsedData.template_id && !parsedData.businessName) {
          alert('ملف القالب غير صالح أو تالف.');
          return;
        }

        onImportSuccess(parsedData);
        alert('🎉 تم استيراد ملف القالب بنجاح وتطبيق الألوان والتصاميم أونلاين!');
        onClose();
      } catch (err) {
        console.error('Import JSON error:', err);
        alert('خطأ في قراءة ملف JSON. تأكد من صحة تنسيق الملف.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 dir-rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-right shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">استيراد وتصدير القوالب (JSON Template Manager)</h3>
              <p className="text-xs text-slate-400">حفظ وحمل تصميم موقعك عبر ملفات JSON من كمبيوترك أو مدير الملفات</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xs font-bold">إغلاق</button>
        </div>

        <div className="space-y-6">
          
          {/* Option 1: Import JSON File */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>استيراد قالب من جهازك / مدير الملفات (Upload JSON File)</span>
            </h4>
            <p className="text-xs text-slate-400">
              اختر ملف قالب بصيغة <code>.json</code> من كمبيوترك لتطبيق الهوية والألوان والتصاميم مباشرة.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>تحديد ملف القالب (.json) من كمبيوترك</span>
            </button>
          </div>

          {/* Option 2: Export JSON File */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-400" />
              <span>تصدير تصميم القالب الحالي (Download JSON)</span>
            </h4>
            <p className="text-xs text-slate-400">
              قم بتنزيل ملف القالب الحالي بنقرة واحدة كنسخة احتياطية أو لاستخدامه في متجر آخر.
            </p>
            <button
              onClick={handleExportJSON}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل ملف القالب (.json) إلى جهازك</span>
            </button>
          </div>

          {/* Option 3: Download Preset Samples */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>تنزيل قوالب جاهزة عينة لتجربة الاستيراد:</span>
            </h4>
            <div className="space-y-2">
              {sampleTemplates.map((sample, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{sample.name}</span>
                  <button
                    onClick={() => handleDownloadSampleJSON(sample)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-lg border border-slate-700 transition flex items-center gap-1 text-[11px]"
                  >
                    <Download className="w-3 h-3" />
                    <span>تحميل JSON</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
