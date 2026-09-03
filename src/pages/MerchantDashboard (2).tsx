import React, { useState, useEffect } from 'react';
import { apiUrl } from '../lib/api';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  Layers, 
  Settings, 
  Plus, 
  ExternalLink, 
  QrCode, 
  Trash2, 
  Sparkles, 
  DollarSign,
  TrendingUp,
  MapPin,
  Video,
  Home,
  FileJson,
  Palette,
  Eye,
  Check
} from 'lucide-react';
import { Business, Service, Staff, Appointment, TemplateConfig } from '../types';
import { TEMPLATES } from '../data/initialData';
import { CURRENCIES } from '../data/currencies';
import TrialBanner from '../components/TrialBanner';
import QRCodeModal from '../components/QRCodeModal';
import WhatsAppHelper from '../components/WhatsAppHelper';
import TemplateImportExportModal from '../components/TemplateImportExportModal';
import Navbar from '../components/Navbar';
import { formatHijriAr } from '../lib/calendar';

export default function MerchantDashboard() {
  const { slug } = useParams<{ slug: string }>();

  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<'calendar' | 'appointments' | 'services' | 'staff' | 'branding' | 'trial'>('calendar');
  const [loading, setLoading] = useState(true);

  // Modals & Forms
  const [showQRModal, setShowQRModal] = useState(false);
  const [showImportExportModal, setShowImportExportModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

  // Flexible New Service Form
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('100');
  const [newServiceCurrency, setNewServiceCurrency] = useState('SAR');
  const [newServiceDuration, setNewServiceDuration] = useState('45');
  const [newServiceCategory, setNewServiceCategory] = useState('عامة');
  const [newServiceLocationType, setNewServiceLocationType] = useState<'branch' | 'online' | 'home_visit'>('branch');
  const [newServiceDescription, setNewServiceDescription] = useState('');

  // New Staff Form
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('مختص');

  // New Booking Form (Manual)
  const [manualCustomerName, setManualCustomerName] = useState('');
  const [manualCustomerPhone, setManualCustomerPhone] = useState('');
  const [manualServiceId, setManualServiceId] = useState<number | null>(null);
  const [manualStaffName, setManualStaffName] = useState('');
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualTime, setManualTime] = useState('16:00');

  // Preset Color Palette Swatches for quick 1-click theme customization
  const colorSwatches = [
    { name: 'أسود وذهبي فاخر (Luxe)', primary: '#0f172a', secondary: '#d97706' },
    { name: 'أزرق طبي هادئ (Care)', primary: '#0284c7', secondary: '#0d9488' },
    { name: 'زمردي استرخائي (Spa)', primary: '#059669', secondary: '#ec4899' },
    { name: 'بني وخشب ملكي (Equestrian)', primary: '#78350f', secondary: '#d97706' },
    { name: 'وردي ونضارة (Beauty)', primary: '#831843', secondary: '#ec4899' },
    { name: 'بنفسجي وإبداع (Studio)', primary: '#3b0764', secondary: '#a855f7' },
    { name: 'أزرق رياضي (Auto/Gym)', primary: '#1e3a8a', secondary: '#f59e0b' }
  ];

  // Load Data
  const loadData = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      // Fetch Business
      const resBiz = await fetch(apiUrl(`/api/businesses?slug=${slug}`));
      const bizData = await resBiz.json();
      
      if (!bizData || !bizData.id) {
        setBusiness({
          id: 'biz_salon_luxe',
          slug: slug,
          name: 'متجر حجز المواعيد المباشر',
          industry: 'custom',
          template_id: 'universal-open',
          phone: '+966500000000',
          email: 'admin@mybusiness.sa',
          address: 'شارع العليا - الرياض',
          city: 'الرياض',
          currency: 'SAR',
          logo_url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop',
          cover_url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop',
          primary_color: '#0f172a',
          secondary_color: '#d97706',
          description: 'منصة مخصصة ومفتوحة لإدارة وتلقي المواعيد بسهولة.',
          trial_start: new Date().toISOString(),
          trial_end: new Date(Date.now() + 6 * 86400000).toISOString(),
          subscription_status: 'trialing',
          plan_name: 'التجربة المجانية (7 أيام)'
        });
        setLoading(false);
        return;
      }

      setBusiness(bizData);
      if (bizData.currency) setNewServiceCurrency(bizData.currency);

      // Fetch Services, Staff, Appointments
      const [resServ, resStaff, resApp, resStats] = await Promise.all([
        fetch(apiUrl(`/api/services?business_id=${bizData.id}`)),
        fetch(apiUrl(`/api/staff?business_id=${bizData.id}`)),
        fetch(apiUrl(`/api/appointments?business_id=${bizData.id}`)),
        fetch(apiUrl(`/api/stats?business_id=${bizData.id}`))
      ]);

      const dataServ = await resServ.json();
      const dataStaff = await resStaff.json();
      const dataApp = await resApp.json();
      const dataStats = await resStats.json();

      setServices(Array.isArray(dataServ) ? dataServ : []);
      setStaff(Array.isArray(dataStaff) ? dataStaff : []);
      setAppointments(Array.isArray(dataApp) ? dataApp : []);
      setStats(dataStats);

    } catch (err) {
      console.error('Merchant dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  // Status Change Handler
  const handleUpdateStatus = async (appointmentId: number, newStatus: string) => {
    try {
      await fetch(apiUrl('/api/appointments'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: appointmentId, status: newStatus })
      });
      loadData();
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  // Add Service Handler
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    try {
      await fetch(apiUrl('/api/services'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: business.id,
          title: newServiceTitle,
          price: Number(newServicePrice),
          currency: newServiceCurrency || 'SAR',
          duration_min: Number(newServiceDuration),
          category: newServiceCategory || 'خدمة عامة',
          location_type: newServiceLocationType,
          description: newServiceDescription
        })
      });
      setShowAddServiceModal(false);
      setNewServiceTitle('');
      setNewServiceDescription('');
      loadData();
    } catch (err) {
      console.error('Add service error:', err);
    }
  };

  // Add Staff Handler
  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    try {
      await fetch(apiUrl('/api/staff'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: business.id,
          name: newStaffName,
          role: newStaffRole,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop',
          is_active: true
        })
      });
      setShowAddStaffModal(false);
      setNewStaffName('');
      loadData();
    } catch (err) {
      console.error('Add staff error:', err);
    }
  };

  // Manual New Booking Handler
  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business || !manualServiceId) return;

    const serv = services.find(s => s.id === manualServiceId);

    try {
      await fetch(apiUrl('/api/appointments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: business.id,
          customer_name: manualCustomerName,
          customer_phone: manualCustomerPhone,
          service_id: manualServiceId,
          service_title: serv?.title || 'خدمة مباشرة',
          staff_name: manualStaffName || 'أي موظف',
          appointment_date: manualDate,
          appointment_time: manualTime,
          price: serv?.price || 100,
          status: 'confirmed'
        })
      });
      setShowNewAppointmentModal(false);
      setManualCustomerName('');
      setManualCustomerPhone('');
      loadData();
    } catch (err) {
      console.error('Manual booking error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center dir-rtl">
        <Sparkles className="w-10 h-10 text-amber-400 animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-300">جاري تحميل لوحة تحكم متجرك...</p>
      </div>
    );
  }

  const publicUrl = `${window.location.origin}/b/${slug}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Trial Banner Indicator */}
        <TrialBanner 
          trialEndIso={business?.trial_end} 
          planName={business?.plan_name} 
          onUpgradeClick={() => setActiveTab('trial')}
        />

        {/* Top Header Card */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={business?.logo_url || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop'} 
              alt={business?.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{business?.name}</h1>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  لوحة التحكم
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>رابطك المباشر:</span>
                <a href={publicUrl} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline dir-ltr font-mono font-bold">
                  {publicUrl}
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setShowImportExportModal(true)}
              className="flex-1 sm:flex-none py-2.5 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <FileJson className="w-4 h-4 text-amber-400" />
              <span>استيراد/تصدير JSON 📁</span>
            </button>

            <button
              onClick={() => setShowQRModal(true)}
              className="flex-1 sm:flex-none py-2.5 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>رمز QR</span>
            </button>

            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none py-2.5 px-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>معاينة صفحة العميل</span>
            </a>
          </div>
        </div>

        {/* Dashboard KPIs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>إجمالي الحجوزات</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{stats?.totalBookings || appointments.length}</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-medium">حجز مسجل في النظام</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>الإيرادات التقديرية</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">{stats?.totalRevenue || 0} <span className="text-xs font-normal">{business?.currency || 'SAR'}</span></div>
            <div className="text-[11px] text-slate-400 mt-1">من الحجوزات المؤكدة والمكتملة</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>قائمة الانتظار</span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">
              {appointments.filter(a => a.status === 'waitlist').length}
            </div>
            <div className="text-[11px] text-sky-400/80 mt-1">
              معلق: {appointments.filter(a => a.status === 'pending').length}
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>الحجوزات المؤكدة</span>
              <TrendingUp className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">{stats?.confirmedCount || appointments.filter(a => a.status === 'confirmed').length}</div>
            <div className="text-[11px] text-emerald-400 mt-1">جاهزة للاستقبال</div>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800 text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${activeTab === 'calendar' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
          >
            <Calendar className="w-4 h-4" />
            <span>التقويم اليومي والأجندة</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${activeTab === 'appointments' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
          >
            <Clock className="w-4 h-4" />
            <span>جدول المواعيد ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${activeTab === 'services' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
          >
            <Layers className="w-4 h-4" />
            <span>إدارة الخدمات المفتوحة ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${activeTab === 'staff' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
          >
            <Users className="w-4 h-4" />
            <span>فريق العمل والخبراء ({staff.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${activeTab === 'branding' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
          >
            <Palette className="w-4 h-4" />
            <span>تخصيص القالب والهوية والتصميم</span>
          </button>

          <button
            onClick={() => setActiveTab('trial')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${activeTab === 'trial' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-amber-400 hover:bg-slate-800'}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>الاشتراك والتجربة</span>
          </button>
        </div>

        {/* TAB 1: CALENDAR VIEW */}
        {activeTab === 'calendar' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>أجندة المواعيد للليوم والأسابيع القادمة</span>
              </h3>
              <span className="text-xs text-slate-400">تحديث فوري تلقائي</span>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                لا توجد مواعيد مسجلة حتى الآن. يمكنك إضافة حجز يدوي أو مشاركة رابطك مع العملاء.
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((app) => (
                  <div key={app.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex flex-col items-center justify-center text-xs font-bold border border-amber-500/30 shrink-0">
                        <span>{app.appointment_time}</span>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white flex items-center gap-2">
                          <span>{app.customer_name}</span>
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {app.booking_code}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {app.service_title} • الموظف: <strong className="text-slate-200">{app.staff_name}</strong>
                          <span className="block mt-0.5 text-[11px] text-slate-400">
                            التاريخ: <strong className="text-slate-200">{app.appointment_date}</strong>
                            <span className="text-amber-400/80"> · {formatHijriAr(app.appointment_date)}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-0 border-slate-800 pt-3 md:pt-0">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        app.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        app.status === 'completed' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        app.status === 'cancelled' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        app.status === 'waitlist' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {app.status === 'confirmed' ? 'مؤكد' : app.status === 'completed' ? 'مكتمل' : app.status === 'cancelled' ? 'ملغى' : app.status === 'waitlist' ? 'انتظار' : 'معلق'}
                      </span>

                      <div className="flex flex-col sm:flex-row items-end gap-1.5">
                        <WhatsAppHelper
                          phone={app.customer_phone}
                          customerName={app.customer_name}
                          serviceTitle={app.service_title}
                          date={app.appointment_date}
                          time={app.appointment_time}
                          bookingCode={app.booking_code}
                          businessName={business?.name || ''}
                          businessPhone={business?.phone}
                          type="confirm"
                          compact
                        />
                        <WhatsAppHelper
                          phone={app.customer_phone}
                          customerName={app.customer_name}
                          serviceTitle={app.service_title}
                          date={app.appointment_date}
                          time={app.appointment_time}
                          bookingCode={app.booking_code}
                          businessName={business?.name || ''}
                          businessPhone={business?.phone}
                          type="reminder"
                          compact
                          showCopy={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: APPOINTMENTS LIST & STATUS MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-white">إدارة قائمة المواعيد والحالات</h3>
              <button
                onClick={() => setShowNewAppointmentModal(true)}
                className="py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition"
              >
                + حجز جديد
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold">
                    <th className="py-3 px-2">كود الحجز</th>
                    <th className="py-3 px-2">العميل</th>
                    <th className="py-3 px-2">الخدمة</th>
                    <th className="py-3 px-2">الموظف</th>
                    <th className="py-3 px-2">التاريخ والوقت</th>
                    <th className="py-3 px-2">السعر</th>
                    <th className="py-3 px-2">الحالة</th>
                    <th className="py-3 px-2 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-2 font-mono text-amber-400 font-bold">{app.booking_code}</td>
                      <td className="py-3.5 px-2 font-bold text-white">
                        {app.customer_name}
                        <span className="block text-[10px] text-slate-400 font-normal dir-ltr text-right">{app.customer_phone}</span>
                      </td>
                      <td className="py-3.5 px-2 text-slate-300">{app.service_title}</td>
                      <td className="py-3.5 px-2 text-slate-300">{app.staff_name}</td>
                      <td className="py-3.5 px-2 text-slate-300">
                        <span className="block text-white text-xs">{app.appointment_date} • {app.appointment_time}</span>
                        <span className="block text-[10px] text-amber-400/80 mt-0.5">{formatHijriAr(app.appointment_date)}</span>
                      </td>
                      <td className="py-3.5 px-2 font-bold text-amber-300">{app.price} {business?.currency || 'SAR'}</td>
                      <td className="py-3.5 px-2">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-lg text-slate-200 px-2 py-1 text-[11px] focus:outline-none"
                        >
                          <option value="pending">معلق</option>
                          <option value="waitlist">قائمة انتظار</option>
                          <option value="confirmed">تأكيد الموعد</option>
                          <option value="completed">مكتمل</option>
                          <option value="cancelled">ملغى</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <WhatsAppHelper
                            phone={app.customer_phone}
                            customerName={app.customer_name}
                            serviceTitle={app.service_title}
                            date={app.appointment_date}
                            time={app.appointment_time}
                            bookingCode={app.booking_code}
                            businessName={business?.name || ''}
                            businessPhone={business?.phone}
                            type="confirm"
                            compact
                          />
                          <WhatsAppHelper
                            phone={app.customer_phone}
                            customerName={app.customer_name}
                            serviceTitle={app.service_title}
                            date={app.appointment_date}
                            time={app.appointment_time}
                            bookingCode={app.booking_code}
                            businessName={business?.name || ''}
                            businessPhone={business?.phone}
                            type="reminder"
                            compact
                            showCopy={false}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FLEXIBLE OPEN SERVICES & PRICING */}
        {activeTab === 'services' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-bold text-lg text-white">إدارة الخدمات المفتوحة والأسعار</h3>
                <p className="text-xs text-slate-400">يمكنك إضافة أي نوع من الخدمات بمرونة كاملة دون التقيد بتصنيف محدد</p>
              </div>
              <button
                onClick={() => setShowAddServiceModal(true)}
                className="py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خدمة جديدة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((serv) => (
                <div key={serv.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                        {serv.category || 'عامة'}
                      </span>
                      <span className="text-xs text-slate-400">{serv.duration_min} دقيقة</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-white text-base">{serv.title}</h4>
                    </div>

                    {/* Location Badge */}
                    <div className="mb-3">
                      {serv.location_type === 'online' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                          <Video className="w-3 h-3" />
                          <span>أونلاين عبر الزوم/الاتصال</span>
                        </span>
                      )}
                      {serv.location_type === 'home_visit' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <Home className="w-3 h-3" />
                          <span>زيارة في موقع العميل/المنزل</span>
                        </span>
                      )}
                      {(!serv.location_type || serv.location_type === 'branch') && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>حضوري بالفرع</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{serv.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="font-black text-amber-400 text-base">{serv.price} {serv.currency || business?.currency || 'SAR'}</span>
                    <button
                      onClick={async () => {
                        if (confirm('هل أنت تأكد من حذف هذه الخدمة؟')) {
                          await fetch(apiUrl('/api/services'), { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: serv.id }) });
                          loadData();
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STAFF & TEAM */}
        {activeTab === 'staff' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-white">طاقم العمل والخبراء</h3>
                <p className="text-xs text-slate-400">إدارة فريقك ليتمكن العملاء من الاختيار بينهم عند الحجز</p>
              </div>
              <button
                onClick={() => setShowAddStaffModal(true)}
                className="py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة عضو فريق جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {staff.map((st) => (
                <div key={st.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={st.avatar} alt={st.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{st.name}</h4>
                      <p className="text-xs text-amber-400 mt-0.5">{st.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (confirm('حذف هذا الموظف؟')) {
                        await fetch(apiUrl('/api/staff'), { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: st.id }) });
                        loadData();
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BRANDING & VISUAL CUSTOMIZER */}
        {activeTab === 'branding' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-lg text-white">مُخصّص الهوية والقالب المباشر (Visual Customizer)</h3>
                <p className="text-xs text-slate-400">تعديل الألوان والخطوط وصورة الهيدر مع معاينة فورية لصفحة الحجز</p>
              </div>

              <button
                type="button"
                onClick={() => setShowImportExportModal(true)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <FileJson className="w-4 h-4 text-amber-400" />
                <span>استيراد/تصدير JSON 📁</span>
              </button>
            </div>

            {/* Split Screen Layout: Customizer Form + Live Booking Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Controls */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Palette Swatches */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">اختر طقم الألوان السريع بنقرة واحدة:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {colorSwatches.map((swatch, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (business) {
                            setBusiness({
                              ...business,
                              primary_color: swatch.primary,
                              secondary_color: swatch.secondary
                            });
                          }
                        }}
                        className="p-2 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 flex items-center justify-between text-right transition"
                      >
                        <span className="text-[11px] font-bold text-slate-300 truncate">{swatch.name}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <div className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: swatch.primary }} />
                          <div className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: swatch.secondary }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">اسم النشاط التجارى</label>
                    <input
                      type="text"
                      value={business?.name || ''}
                      onChange={(e) => setBusiness(business ? { ...business, name: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">العملة الافتراضية</label>
                    <select
                      value={business?.currency || 'SAR'}
                      onChange={(e) => setBusiness(business ? { ...business, currency: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-bold text-xs"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>{c.name} ({c.symbol} {c.code})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">اللون الرئيسي (HEX Color)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={business?.primary_color || '#0f172a'}
                        onChange={(e) => setBusiness(business ? { ...business, primary_color: e.target.value } : null)}
                        className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={business?.primary_color || '#0f172a'}
                        onChange={(e) => setBusiness(business ? { ...business, primary_color: e.target.value } : null)}
                        className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs dir-ltr text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">اللون الثانوي / التمييزي</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={business?.secondary_color || '#d97706'}
                        onChange={(e) => setBusiness(business ? { ...business, secondary_color: e.target.value } : null)}
                        className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={business?.secondary_color || '#d97706'}
                        onChange={(e) => setBusiness(business ? { ...business, secondary_color: e.target.value } : null)}
                        className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs dir-ltr text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">رابط صورة الهيدر (Cover Banner URL)</label>
                    <input
                      type="text"
                      value={business?.cover_url || ''}
                      onChange={(e) => setBusiness(business ? { ...business, cover_url: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs dir-ltr text-right font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">معرف الرابط المباشر (Slug)</label>
                    <input
                      type="text"
                      value={business?.slug || ''}
                      onChange={(e) => setBusiness(business ? { ...business, slug: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs dir-ltr text-right font-mono"
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-2">الوصف والنذة التعريفية</label>
                    <textarea
                      rows={2}
                      value={business?.description || ''}
                      onChange={(e) => setBusiness(business ? { ...business, description: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>

                {/* Template Preset Selector */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="font-bold text-xs text-white mb-2">تطبيق ثيم جاهز من القوالب المتاحة (12+ قالب):</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => {
                          if (business) {
                            setBusiness({
                              ...business,
                              template_id: tmpl.id,
                              primary_color: tmpl.primaryColor,
                              secondary_color: tmpl.secondaryColor,
                              cover_url: tmpl.heroImage
                            });
                          }
                        }}
                        className={`p-2 rounded-xl border text-right transition ${business?.template_id === tmpl.id ? 'bg-amber-500/20 border-amber-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                      >
                        <div className="font-bold text-[11px] text-white truncate">{tmpl.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={async () => {
                    if (!business) return;
                    await fetch(apiUrl('/api/businesses'), {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        id: business.id,
                        name: business.name,
                        slug: business.slug,
                        description: business.description,
                        currency: business.currency,
                        template_id: business.template_id,
                        primary_color: business.primary_color,
                        secondary_color: business.secondary_color,
                        cover_url: business.cover_url,
                        logo_url: business.logo_url
                      })
                    });
                    alert('🎉 تم حفظ جميع التعديلات والألوان وتطبيقها على رابط متجرك المباشر بنجاح!');
                    loadData();
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition shadow-lg shadow-amber-500/20"
                >
                  حفظ وتطبيق الهوية والتعديلات أونلاين
                </button>
              </div>

              {/* Live Mini Preview Screen */}
              <div className="lg:col-span-5 bg-slate-950 p-4 rounded-3xl border border-slate-800 space-y-4 sticky top-20">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>معاينة حية ومباشرة لصفحة العميل</span>
                  </span>
                  <a href={publicUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1">
                    <span>فتح بالكامل</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Simulated Public Booking Card */}
                <div className="rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 text-xs">
                  <div className="h-28 relative">
                    <img src={business?.cover_url || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop'} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <img src={business?.logo_url} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0" />
                      <div>
                        <div className="font-bold text-white text-xs">{business?.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{business?.description}</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 flex justify-between items-center mt-2">
                      <div>
                        <div className="font-bold text-white text-xs">{services[0]?.title || 'خدمة حجز أونلاين'}</div>
                        <div className="text-[10px] text-slate-400">45 دقيقة</div>
                      </div>
                      <div className="font-bold text-amber-400">{services[0]?.price || 150} {business?.currency || 'SAR'}</div>
                    </div>

                    <button className="w-full py-2 bg-amber-500 text-slate-950 font-black rounded-lg text-xs mt-2">
                      تأكيد الحجز الفوري
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 6: TRIAL & SUBSCRIPTION */}
        {activeTab === 'trial' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6">
            <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-300 text-xs leading-relaxed">
              🎉 أنت حالياً مستمتع بنظام <strong>التجربة المجانية لمدة 7 أيام</strong> بكامل المزايا. يمكنك اختيار خطة الترقية المناسبة لضمان واستمرارية خدمة عملائك دون انقطاع.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <h4 className="font-bold text-white mb-2">الخطة الأساسية (Basic)</h4>
                <div className="text-2xl font-black text-amber-400 mb-4">99 ر.س / شهر</div>
                <button 
                  onClick={() => alert('سيتم تحويلك إلى بوابة الدفع للترقية!')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  الترقية الآن
                </button>
              </div>

              <div className="p-6 bg-slate-950 rounded-2xl border-2 border-amber-500 text-center relative">
                <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  الخطة الحالية
                </span>
                <h4 className="font-bold text-white mb-2">الخطة الاحترافية (Pro Trial)</h4>
                <div className="text-2xl font-black text-amber-400 mb-4">199 ر.س / شهر</div>
                <button 
                  onClick={() => alert('اشتراكك نشط ضمن الفترة التجريبية')}
                  className="w-full py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  نشط حالياً (مجاناً)
                </button>
              </div>

              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <h4 className="font-bold text-white mb-2">خطة الأعمال (Enterprise)</h4>
                <div className="text-2xl font-black text-amber-400 mb-4">399 ر.س / شهر</div>
                <button 
                  onClick={() => alert('سيتم التواصل معك للتفعيل')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  الترقية الآن
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* QR Code Printable Modal */}
      <QRCodeModal
        slug={slug || 'demo'}
        businessName={business?.name || 'متجري'}
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
      />

      {/* Template Import Export JSON Modal */}
      <TemplateImportExportModal
        isOpen={showImportExportModal}
        onClose={() => setShowImportExportModal(false)}
        currentBusiness={business}
        onImportSuccess={(importedData) => {
          if (business) {
            setBusiness({
              ...business,
              name: importedData.businessName || business.name,
              primary_color: importedData.primary_color || business.primary_color,
              secondary_color: importedData.secondary_color || business.secondary_color,
              currency: importedData.currency || business.currency,
              template_id: importedData.template_id || business.template_id,
              cover_url: importedData.cover_url || business.cover_url
            });
          }
        }}
      />

      {/* Add Flexible Open Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-lg w-full">
            <h3 className="font-bold text-lg text-white mb-4">إضافة خدمة مخصصة (خدمة مفتوحة)</h3>
            <form onSubmit={handleAddService} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم الخدمة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: جلسة تدريب خيل، استشارة قانونية، تصوير منتجات..."
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">السعر *</label>
                  <input
                    type="number"
                    required
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">العملة</label>
                  <select
                    value={newServiceCurrency}
                    onChange={(e) => setNewServiceCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-bold"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.symbol} {c.code} — {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">المدة (بالدقائق)</label>
                  <input
                    type="number"
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">التصنيف الخاص</label>
                  <input
                    type="text"
                    placeholder="مثال: استشارات، تصوير، دورات..."
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">مكان ونوع تقديم الخدمة</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewServiceLocationType('branch')}
                    className={`p-2 rounded-xl border text-center text-[11px] font-bold ${newServiceLocationType === 'branch' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800'}`}
                  >
                    حضوري بالفرع
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewServiceLocationType('online')}
                    className={`p-2 rounded-xl border text-center text-[11px] font-bold ${newServiceLocationType === 'online' ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-slate-950 text-slate-300 border-slate-800'}`}
                  >
                    أونلاين (زوم)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewServiceLocationType('home_visit')}
                    className={`p-2 rounded-xl border text-center text-[11px] font-bold ${newServiceLocationType === 'home_visit' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-950 text-slate-300 border-slate-800'}`}
                  >
                    زيارة للعميل
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">تفاصيل ومميزات الخدمة</label>
                <textarea
                  rows={2}
                  placeholder="وصف تفصيلي يشرح للعميل ما الذي تشمله هذه الخدمة..."
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold"
                >
                  إضافة الخدمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full">
            <h3 className="font-bold text-lg text-white mb-4">إضافة عضو فريق جديد</h3>
            <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">الاسم *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: د. محمد، الكابتن هشام..."
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">التخصص / المسمى الوظيفي</label>
                <input
                  type="text"
                  placeholder="مثال: خبير التصفيف والعناية"
                  value={newStaffRole}
                  onChange={(e) => setNewStaffRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Manual Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full">
            <h3 className="font-bold text-lg text-white mb-4">تسجيل حجز يدوي مباشر</h3>
            <form onSubmit={handleCreateManualBooking} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم العميل *</label>
                <input
                  type="text"
                  required
                  placeholder="عبدالله أحمد"
                  value={manualCustomerName}
                  onChange={(e) => setManualCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">رقم الجوال *</label>
                <input
                  type="text"
                  required
                  placeholder="+966500000000"
                  value={manualCustomerPhone}
                  onChange={(e) => setManualCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">اختر الخدمة *</label>
                <select
                  required
                  value={manualServiceId || ''}
                  onChange={(e) => setManualServiceId(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="">-- حدد الخدمة --</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title} ({s.price} {s.currency || 'SAR'})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">التاريخ</label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">الوقت</label>
                  <input
                    type="time"
                    value={manualTime}
                    onChange={(e) => setManualTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  تأكيد الحجز
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
