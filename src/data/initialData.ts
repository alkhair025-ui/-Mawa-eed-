import { TemplateConfig } from '../types';

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'luxury-dark',
    name: 'صالون ورجالي فاخر (Luxe Salon)',
    nameEn: 'Luxury Barber & Salon',
    industry: 'barber',
    industryName: 'صالون حلاقة ورجالي',
    primaryColor: '#0f172a',
    secondaryColor: '#d97706',
    heroImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop',
    badgeText: 'أناقة لا تضاهى',
    description: 'قالب كلاسيكي أسود وذهبي مع لمسات راقية مخصص لصالونات الحلاقة والعناية بالرجل.',
    sampleServices: [
      { title: 'حلاقة شعر احترافية + تصفيف VIP', price: 90, duration: 45, category: 'شعر' },
      { title: 'تشذيب وتحديد اللحية بالفوتة الساخنة', price: 60, duration: 30, category: 'لحية' },
      { title: 'باقة العريس الشاملة (شعر + تنظيف بشرة + صبغة)', price: 350, duration: 90, category: 'باقات VIP' },
      { title: 'جلسة تنظيف وتغذية البشرة بالأعشاب', price: 120, duration: 40, category: 'عناية' }
    ],
    sampleStaff: [
      { name: 'الكابتن طارق السوري', role: 'خبير التصفيف والعناية باللحية', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop' },
      { name: 'الأسطورة سامر', role: 'متخصص قصات VIP وعلاجات الشعر', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop' }
    ]
  },
  {
    id: 'medical-clean',
    name: 'عيادة متميزة (Care Clinic)',
    nameEn: 'Medical & Dental Clinic',
    industry: 'clinic',
    industryName: 'عيادة طبية وأسنان',
    primaryColor: '#0284c7',
    secondaryColor: '#0d9488',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=200&fit=crop',
    badgeText: 'رعاية صحية متكاملة',
    description: 'تصميم طبي مريح وعصري باللون الأزرق والأخضر للعيادات والمراكز الطبية والمختبرات.',
    sampleServices: [
      { title: 'كشف واستشارة طبية عامة', price: 150, duration: 30, category: 'استشارات' },
      { title: 'تنظيف وتلميع الأسنان الاحترافي', price: 250, duration: 45, category: 'أسنان' },
      { title: 'جلسة تبييض الأسنان بالليزر', price: 600, duration: 60, category: 'أسنان' },
      { title: 'فحص شامل وفحوصات سريعة', price: 300, duration: 30, category: 'فحوصات' }
    ],
    sampleStaff: [
      { name: 'د. خالد العمري', role: 'استشاري طب وجراحة الأسنان', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&fit=crop' },
      { name: 'د. سارة التميمي', role: 'أخصائية العناية بالبشرة والليزر', avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c4021204?w=200&fit=crop' }
    ]
  },
  {
    id: 'emerald-spa',
    name: 'سبا ومركز تجميل (Serene Spa)',
    nameEn: 'Beauty & Wellness Spa',
    industry: 'spa',
    industryName: 'مركز تجميل وسبا',
    primaryColor: '#059669',
    secondaryColor: '#ec4899',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&fit=crop',
    badgeText: 'استرخاء وجمال تجدد',
    description: 'ألوان هادئة وناعمة تناسب مراكز الاسترخاء والتجميل والعناية بالأظافر والاستجمام.',
    sampleServices: [
      { title: 'جلسة مساج استرخائي بالأعشاب الطبيعية', price: 200, duration: 60, category: 'مساج' },
      { title: 'بديكير ومنيكير الملكي مع البديكير المائي', price: 180, duration: 50, category: 'أظافر' },
      { title: 'جلسة هيدرافيسيال لنضارة البشرة', price: 350, duration: 60, category: 'بشرة' },
      { title: 'جلسة حمام مغربي تقليدي بالأعشاب', price: 280, duration: 75, category: 'استجمام' }
    ],
    sampleStaff: [
      { name: 'نورة الخالدي', role: 'أخصائية مساج وعناية بالبشرة', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&fit=crop' },
      { name: 'مياس الجبير', role: 'خبيرة تصفيف ومكياج سينمائي', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&fit=crop' }
    ]
  },
  {
    id: 'modern-minimal',
    name: 'استشارات وتدريب (Pro Consult)',
    nameEn: 'Consulting & Coaching',
    industry: 'consulting',
    industryName: 'مكاتب استشارات وتدريب',
    primaryColor: '#4f46e5',
    secondaryColor: '#06b6d4',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&fit=crop',
    badgeText: 'خبراء التميز والنجاح',
    description: 'واجهة بسيطة وذكية تناسب المستشارين، المحامين، مدربي الحياة، والمحاسبين.',
    sampleServices: [
      { title: 'جلسة استشارة استراتيجية (أونلاين/حضوري)', price: 400, duration: 60, category: 'استشارات' },
      { title: 'جلسة توجيه وتدريب قيادي (Executive Coaching)', price: 500, duration: 45, category: 'تطوير' },
      { title: 'مراجعة وتقييم نموذج العمل التجاري', price: 800, duration: 90, category: 'أعمال' }
    ],
    sampleStaff: [
      { name: 'م. فهد السعدون', role: 'مستشار تطوير الأعمال والنمو', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop' },
      { name: 'أ. هناء القحطاني', role: 'مستشارة الموارد البشرية والقيادة', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop' }
    ]
  }
];

export const DEMO_BUSINESSES = [
  {
    id: 'biz_salon_luxe',
    slug: 'salon-luxe',
    name: 'صالون الفخامة والروعة للرجال',
    industry: 'barber',
    template_id: 'luxury-dark',
    phone: '+966551234567',
    email: 'info@salonluxe.sa',
    address: 'شارع التخصصي، حي العليا',
    city: 'الرياض',
    logo_url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop',
    cover_url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop',
    primary_color: '#0f172a',
    secondary_color: '#d97706',
    description: 'أفضل تجربة عناية وحلاقة للرجل العصري. طاقم احترافي وبيئة فاخرة تعكس حضورك.',
    trial_start: new Date().toISOString(),
    trial_end: new Date(Date.now() + 7 * 86400000).toISOString(),
    subscription_status: 'trialing',
    plan_name: 'التجربة المجانية (7 أيام)'
  },
  {
    id: 'biz_clinic_care',
    slug: 'care-clinic',
    name: 'مجمع عيادات الرعاية المتقدمة',
    industry: 'clinic',
    template_id: 'medical-clean',
    phone: '+966509876543',
    email: 'booking@careclinic.sa',
    address: 'طريق الملك فهد، مقابل برج المملكة',
    city: 'الرياض',
    logo_url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=200&fit=crop',
    cover_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&fit=crop',
    primary_color: '#0284c7',
    secondary_color: '#0d9488',
    description: 'نخبة من الأطباء والاستشاريين يقدمون أحدث تقنيات العلاج والتجميل بأعلى معايير الجودة.',
    trial_start: new Date().toISOString(),
    trial_end: new Date(Date.now() + 5 * 86400000).toISOString(),
    subscription_status: 'trialing',
    plan_name: 'التجربة المجانية (7 أيام)'
  }
];
