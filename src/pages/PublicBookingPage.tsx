import React, { useState, useEffect } from 'react';
import { apiUrl } from '../lib/api';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  Video,
  Home,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Business, Service, Staff } from '../types';
import WhatsAppHelper from '../components/WhatsAppHelper';

export default function PublicBookingPage() {
  const { slug } = useParams<{ slug: string }>();

  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Flow Steps
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Service, 2: Staff, 3: Date/Time, 4: Customer Details / Success
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>('17:00');

  // Customer Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Confirmed Result
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Available Time Slots
  const timeSlots = [
    '10:00 ص', '11:30 ص', '01:00 م', '03:30 م', '04:30 م', '05:30 م', '07:00 م', '08:30 م', '09:30 م'
  ];

  useEffect(() => {
    const loadPublicStore = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const resBiz = await fetch(apiUrl(`/api/businesses?slug=${slug}`));
        const bizData = await resBiz.json();

        if (bizData && bizData.id) {
          setBusiness(bizData);

          const [resServ, resStaff] = await Promise.all([
            fetch(apiUrl(`/api/services?business_id=${bizData.id}`)),
            fetch(apiUrl(`/api/staff?business_id=${bizData.id}`))
          ]);

          const dataServ = await resServ.json();
          const dataStaff = await resStaff.json();

          setServices(Array.isArray(dataServ) ? dataServ : []);
          setStaff(Array.isArray(dataStaff) ? dataStaff : []);
        } else {
          // Fallback business
          setBusiness({
            id: 'demo_fallback',
            slug: slug,
            name: 'متجر الحجوزات والخدمات المباشرة',
            industry: 'custom',
            template_id: 'universal-open',
            phone: '+966551234567',
            email: 'info@store.sa',
            address: 'طريق الملك فهد',
            city: 'الرياض',
            primary_color: '#0f172a',
            secondary_color: '#d97706',
            logo_url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop',
            cover_url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop',
            description: 'احجز موعدك بكل سهولة مع أفضل المختصين.',
            trial_start: '',
            trial_end: '',
            subscription_status: 'trialing',
            plan_name: 'Pro'
          });

          setServices([
            { id: 1, business_id: 'demo', title: 'حجز جلسة / خدمة احترافية', price: 150, duration_min: 60, category: 'عامة', currency: 'SAR', description: 'تأكيد فوري للحجز', image_url: '', location_type: 'branch' },
            { id: 2, business_id: 'demo', title: 'استشارة أونلاين عبر الزوم', price: 200, duration_min: 45, category: 'أونلاين', currency: 'SAR', description: 'رابط الزوم يرسل بعد الحجز', image_url: '', location_type: 'online' }
          ]);

          setStaff([
            { id: 101, business_id: 'demo', name: 'أ. أحمد علي', role: 'مختص ومستشار الخدمة', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop', phone: '', is_active: true }
          ]);
        }
      } catch (err) {
        console.error('Load public store error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPublicStore();
  }, [slug]);

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !business) return;

    setSubmitting(true);
    try {
      const res = await fetch(apiUrl('/api/appointments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: business.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail,
          service_id: selectedService.id,
          service_title: selectedService.title,
          staff_id: selectedStaff?.id || null,
          staff_name: selectedStaff?.name || 'أي موظف متاح',
          appointment_date: selectedDate,
          appointment_time: selectedTime,
          price: selectedService.price,
          status: 'confirmed',
          notes: notes
        })
      });

      const data = await res.json();
      setConfirmedBooking(data);
      setStep(4);
    } catch (err) {
      console.error('Booking submission error:', err);
      alert('حدث خطأ أثناء إرسال الحجز، يرجى إعادة المحاولة.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center dir-rtl">
        <Sparkles className="w-10 h-10 text-amber-400 animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-300">جاري تحميل صفحة الحجز...</p>
      </div>
    );
  }

  // Dynamic Theme Colors
  const primaryColor = business?.primary_color || '#0f172a';
  const secondaryColor = business?.secondary_color || '#d97706';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl pb-20">
      
      {/* Branded Header Banner with Custom Theme Colors */}
      <div className="relative h-60 sm:h-72 overflow-hidden border-b border-slate-800">
        <img 
          src={business?.cover_url || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop'} 
          alt={business?.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute bottom-6 right-0 left-0 max-w-4xl mx-auto px-4 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={business?.logo_url || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop'} 
              alt={business?.name} 
              className="w-20 h-20 rounded-2xl object-cover border-4 border-slate-950 shadow-2xl shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-black text-white">{business?.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  مفتوح للحجز أونلاين
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{business?.address} - {business?.city}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        
        {/* Progress Bar */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 mb-6 flex items-center justify-between text-xs font-bold text-slate-400">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-400' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">1</span>
            <span>الخدمة</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-400' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>2</span>
            <span>المختص</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-400' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step >= 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>3</span>
            <span>التاريخ والوقت</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-amber-400' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step >= 4 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>4</span>
            <span>التأكيد</span>
          </div>
        </div>

        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <h2 className="font-bold text-lg text-white mb-2">اختر الخدمة المطلوبة:</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service);
                    setStep(2);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${selectedService?.id === service.id ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                        {service.category || 'عامة'}
                      </span>
                      <span className="text-xs text-slate-400">{service.duration_min} دقيقة</span>
                    </div>

                    <h3 className="font-bold text-white text-base mb-1">{service.title}</h3>

                    {/* Location Badge */}
                    <div className="mb-2">
                      {service.location_type === 'online' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                          <Video className="w-3 h-3" />
                          <span>أونلاين عبر الاتصال/الزوم</span>
                        </span>
                      )}
                      {service.location_type === 'home_visit' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <Home className="w-3 h-3" />
                          <span>زيارة في موقعك/المنزل</span>
                        </span>
                      )}
                      {(!service.location_type || service.location_type === 'branch') && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>حضوري بالفرع</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 mb-3">{service.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="font-black text-amber-400 text-lg">{service.price} {service.currency || business?.currency || 'SAR'}</span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <span>اختيار</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Select Staff */}
        {step === 2 && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-white">اختر الموظف أو المختص:</h2>
              <button onClick={() => setStep(1)} className="text-xs text-slate-400 hover:text-white">تغيير الخدمة</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option: Anyone */}
              <div
                onClick={() => {
                  setSelectedStaff(null);
                  setStep(3);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${selectedStaff === null ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xl">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">أول موظف متاح</h3>
                  <p className="text-xs text-slate-400">لأسرع حجز متاح فوراً</p>
                </div>
              </div>

              {staff.map((member) => (
                <div
                  key={member.id}
                  onClick={() => {
                    setSelectedStaff(member);
                    setStep(3);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${selectedStaff?.id === member.id ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                >
                  <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{member.name}</h3>
                    <p className="text-xs text-amber-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Select Date & Time + Customer Info */}
        {step === 3 && (
          <form onSubmit={handleCreateAppointment} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-bold text-lg text-white">اختر التاريخ والوقت وأدخل بياناتك</h2>
                <p className="text-xs text-slate-400">الخدمة: {selectedService?.title} ({selectedService?.price} {selectedService?.currency || business?.currency || 'SAR'})</p>
              </div>
              <button type="button" onClick={() => setStep(2)} className="text-xs text-slate-400 hover:text-white">تغيير</button>
            </div>

            {/* Date and Time Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">تاريخ الموعد *</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">الوقت المتاح *</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 rounded-xl text-xs font-bold transition ${selectedTime === slot ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="font-bold text-sm text-white">بيانات العميل لتأكيد الموعد:</h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  placeholder="محمد العتيبي"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">رقم الجوال (واتساب) *</label>
                <input
                  type="text"
                  required
                  placeholder="+966500000000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ملاحظات إضافية (اختياري)</label>
                <input
                  type="text"
                  placeholder="أي تفاصيل ترغب بتوضيحها..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl transition shadow-xl shadow-amber-500/20"
            >
              {submitting ? 'جاري تأكيد موعدك...' : 'تأكيد الحجز الآن 🚀'}
            </button>
          </form>
        )}

        {/* STEP 4: Success Confirmation Screen */}
        {step === 4 && confirmedBooking && (
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-6 max-w-lg mx-auto animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                تم تأكيد موعدك بنجاح!
              </span>
              <h2 className="text-2xl font-black text-white mt-3">شكراً لك، {confirmedBooking.customer_name}</h2>
              <p className="text-xs text-slate-400 mt-1">تم إرسال تفاصيل الموعد إلى رقمك المسجل</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-right space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">رمز الحجز:</span>
                <strong className="text-amber-400 font-mono text-sm">{confirmedBooking.booking_code}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">الخدمة:</span>
                <strong className="text-white">{confirmedBooking.service_title}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">المختص:</span>
                <strong className="text-white">{confirmedBooking.staff_name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">التاريخ والوقت:</span>
                <strong className="text-white">{confirmedBooking.appointment_date} • {confirmedBooking.appointment_time}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">الإجمالي:</span>
                <strong className="text-amber-400 font-bold text-sm">{confirmedBooking.price} {business?.currency || 'SAR'}</strong>
              </div>
            </div>

            <div className="pt-2">
              <WhatsAppHelper 
                phone={confirmedBooking.customer_phone} 
                customerName={confirmedBooking.customer_name} 
                serviceTitle={confirmedBooking.service_title} 
                date={confirmedBooking.appointment_date} 
                time={confirmedBooking.appointment_time} 
                bookingCode={confirmedBooking.booking_code} 
                businessName={business?.name || ''} 
              />
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
