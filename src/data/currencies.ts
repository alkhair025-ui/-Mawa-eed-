import { TemplateConfig } from '../types';

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'universal-open',
    name: 'قالب مفتوح لكل الأنشطة (Universal Flex)',
    nameEn: 'Universal Custom Business',
    industry: 'custom',
    industryName: 'أي نشاط تجاري أو خدمي مخصص',
    primaryColor: '#0f172a',
    secondaryColor: '#10b981',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&fit=crop',
    badgeText: 'مرونة مطلقة 100%',
    description: 'قالب مرن وشامل يتيح لك إضافة أي نوع خدمات، تخصيص العملة، وتحديد موقع الخدمة (حضوري، أونلاين، أو زيارة منزلية).',
    sampleServices: [
      { title: 'حجز جلسة / خدمة مخصصة', price: 150, duration: 60, category: 'خدمات مخصصة', location_type: 'branch' },
      { title: 'استشارة / خدمة أونلاين مرنة', price: 200, duration: 45, category: 'أونلاين', location_type: 'online' },
      { title: 'خدمة في موقع العميل / زيارة منزلية', price: 300, duration: 90, category: 'زيارة خاصة', location_type: 'home_visit' }
    ],
    sampleStaff: [
      { name: 'مختص الخدمة الأول', role: 'مختص تقديم الخدمات', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop' }
    ]
  },
  {
    id: 'luxury-dark',
    name: 'صالون ورجالي فاخر (Luxe Dark)',
    nameEn: 'Luxury Barber & Grooming',
    industry: 'barber',
    industryName: 'صالون حلاقة وعناية',
    primaryColor: '#0f172a',
    secondaryColor: '#d97706',
    heroImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&fit=crop',
    badgeText: 'أناقة لا تضاهى',
    description: 'قالب كلاسيكي أسود وذهبي راقي مخصص لصالونات الحلاقة والعناية الشخصية.',
    sampleServices: [
      { title: 'حلاقة شعر احترافية + تصفيف VIP', price: 90, duration: 45, category: 'شعر' },
      { title: 'تشذيب وتحديد اللحية بالفوتة الساخنة', price: 60, duration: 30, category: 'لحية' },
      { title: 'باقة العريس الشاملة (شعر + تنظيف بشرة)', price: 350, duration: 90, category: 'باقات VIP' }
    ],
    sampleStaff: [
      { name: 'الكابتن طارق السوري', role: 'خبير التصفيف والعناية باللحية', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop' },
      { name: 'الأسطورة سامر', role: 'متخصص قصات VIP وعلاجات الشعر', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop' }
    ]
  },
  {
    id: 'medical-clean',
    name: 'عيادة طبية ورعاية (Care Clinic)',
    nameEn: 'Medical & Healthcare',
    industry: 'clinic',
    industryName: 'عيادة طبية وأسنان',
    primaryColor: '#0284c7',
    secondaryColor: '#0d9488',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=200&fit=crop',
    badgeText: 'رعاية صحية متكاملة',
    description: 'تصميم طبي هادئ ومريح باللون الأزرق والأخضر للعيادات والمراكز الطبية.',
    sampleServices: [
      { title: 'كشف واستشارة طبية عامة', price: 150, duration: 30, category: 'استشارات' },
      { title: 'تنظيف وتلميع الأسنان الاحترافي', price: 250, duration: 45, category: 'أسنان' },
      { title: 'جلسة تبييض الأسنان بالليزر', price: 600, duration: 60, category: 'أسنان' }
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
    description: 'ألوان زمردية مهدئة ومناسبة لمراكز المساج والعناية بالبشرة والاستجمام.',
    sampleServices: [
      { title: 'جلسة مساج استرخائي بالأعشاب الطبيعية', price: 200, duration: 60, category: 'مساج' },
      { title: 'بديكير ومنيكير الملكي مع البديكير المائي', price: 180, duration: 50, category: 'أظافر' }
    ],
    sampleStaff: [
      { name: 'نورة الخالدي', role: 'أخصائية مساج وعناية بالبشرة', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&fit=crop' }
    ]
  },
  {
    id: 'modern-minimal',
    name: 'استشارات وتدريب (Pro Consult)',
    nameEn: 'Consulting & Coaching',
    industry: 'consulting',
    industryName: 'استشارات وأعمال',
    primaryColor: '#4f46e5',
    secondaryColor: '#06b6d4',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&fit=crop',
    badgeText: 'خبراء التميز والنجاح',
    description: 'تصميم بسيط واحترافي تناسب المستشارين، المحامين، مدربي الحياة والمحاسبين.',
    sampleServices: [
      { title: 'جلسة استشارة استراتيجية أونلاين', price: 400, duration: 60, category: 'استشارات', location_type: 'online' },
      { title: 'جلسة توجيه وتدريب قيادي (Coaching)', price: 500, duration: 45, category: 'تطوير', location_type: 'online' }
    ],
    sampleStaff: [
      { name: 'م. فهد السعدون', role: 'مستشار تطوير الأعمال والنمو', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop' }
    ]
  },
  {
    id: 'fitness-pulse',
    name: 'لياقة ومدرب شخصي (Fit Pulse)',
    nameEn: 'Fitness & Gym Training',
    industry: 'fitness',
    industryName: 'مركز لياقة وتدريب شخصي',
    primaryColor: '#dc2626',
    secondaryColor: '#f97316',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&fit=crop',
    badgeText: 'طاقة ونشاط بلا حدود',
    description: 'قالب ديناميكي باللون الأحمر والبرتقالي لمدربي اللياقة، الكاراتيه، السباحة واليوغا.',
    sampleServices: [
      { title: 'حصة تدريب شخصي VIP (Personal Trainer)', price: 250, duration: 60, category: 'تدريب خاص' },
      { title: 'تقييم لياقة بدنية وتصميم برنامج غذائي', price: 150, duration: 45, category: 'استشارات رياضية' }
    ],
    sampleStaff: [
      { name: 'الكابتن هشام القوي', role: 'مدرب لياقة وبناء أجسام محترف', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&fit=crop' }
    ]
  },
  {
    id: 'studio-craft',
    name: 'استوديو تصوير وإبداع (Studio Craft)',
    nameEn: 'Photography & Creative Studio',
    industry: 'photography',
    industryName: 'استوديو تصوير وفنون',
    primaryColor: '#7c3aed',
    secondaryColor: '#f43f5e',
    heroImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&fit=crop',
    badgeText: 'توثيق اللحظات بلمسة فنية',
    description: 'قالب بنفسجي أنيق مخصص لمصوري الأعراس، الاستوديوهات الفوتوغرافية، وصناع المحتوى.',
    sampleServices: [
      { title: 'جلسة تصوير بورتريه شخصي في الاستوديو', price: 300, duration: 45, category: 'تصوير داخلي' },
      { title: 'حجز الاستوديو مع المعدات والأداء الضوئي', price: 500, duration: 120, category: 'تأجير استوديو' }
    ],
    sampleStaff: [
      { name: 'أ. ماجد الفن', role: 'مصور فوتوغرافي ومخرج إضاءة', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&fit=crop' }
    ]
  },
  {
    id: 'auto-detail',
    name: 'عناية بالسيارات والصيانة (Auto Care)',
    nameEn: 'Auto Detailing & Repair',
    industry: 'auto',
    industryName: 'مركز خدمة وعناية بالسيارات',
    primaryColor: '#2563eb',
    secondaryColor: '#f59e0b',
    heroImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=200&fit=crop',
    badgeText: 'حماية ولمعان استثنائي',
    description: 'قالب أزرق رياضي لمراكز غسيل وتلميع السيارات، حماية النانو سيراميك والصيانة السريعة.',
    sampleServices: [
      { title: 'غسيل وتلميع ساطع (Detailing VIP)', price: 180, duration: 60, category: 'غسيل ساطع' },
      { title: 'جلسة حماية نانو سيراميك للهيكل الخارجي', price: 1200, duration: 180, category: 'حماية وسيراميك' }
    ],
    sampleStaff: [
      { name: 'المهندس وسيم', role: 'خبير التلميع والحماية السيراميك', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&fit=crop' }
    ]
  },
  {
    id: 'equestrian-royal',
    name: 'فروسية وركوب خيل (Royal Equestrian)',
    nameEn: 'Equestrian & Horse Riding',
    industry: 'equestrian',
    industryName: 'مرابط وفروسية وركوب خيل',
    primaryColor: '#854d0e',
    secondaryColor: '#b45309',
    heroImage: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&fit=crop',
    badgeText: 'أصالة وفخامة الخيل العربي',
    description: 'قالب بني وذهبي دافئ مخصص لمرابط وركوب الخيل والأكاديميات التدريبية.',
    sampleServices: [
      { title: 'حصة تدريب ركوب خيل للمبتدئين', price: 200, duration: 45, category: 'تدريب فروسية' },
      { title: 'جولة ركوب خيل حر بالساحة الفسيحة', price: 150, duration: 30, category: 'جولات حرة' }
    ],
    sampleStaff: [
      { name: 'الفارس بدر العتيبي', role: 'مدرب قفز حواجز وفروسية معتمد', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&fit=crop' }
    ]
  },
  {
    id: 'home-services',
    name: 'صيانة منزلية وتنظيف (Home Craft)',
    nameEn: 'Home Maintenance & Cleaning',
    industry: 'home',
    industryName: 'صيانة منزلية وتنظيف وزيارات',
    primaryColor: '#0f766e',
    secondaryColor: '#0284c7',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&fit=crop',
    badgeText: 'خدمات منزلية متكاملة',
    description: 'قالب كحلي وأزرق مخصص لشركات النظافة، الكهرباء، السباكة، والزيارات المنزلية.',
    sampleServices: [
      { title: 'زيارة فحص وصيانة سباكة/كهرباء منزلية', price: 100, duration: 60, category: 'صيانة منزلية', location_type: 'home_visit' },
      { title: 'جلسة تنظيف وتعقيم كنب وسجاد بالبخار', price: 250, duration: 90, category: 'تنظيف بالبخار', location_type: 'home_visit' }
    ],
    sampleStaff: [
      { name: 'فني الصيانة المباشرة', role: 'مشرف الفنيين والزيارات', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&fit=crop' }
    ]
  },
  {
    id: 'tutoring-academy',
    name: 'دروس وتقوية أكاديمية (Learn Pro)',
    nameEn: 'Academic Tutoring & Courses',
    industry: 'education',
    industryName: 'دروس خصوصية وأكاديميات تعليمية',
    primaryColor: '#1d4ed8',
    secondaryColor: '#10b981',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&fit=crop',
    badgeText: 'تفوق وتميز أكاديمي',
    description: 'قالب أزرق تعليمي مخصص للمدرسين الخصوصيين، المعاهد، ومدربي اللغات والتأهيل.',
    sampleServices: [
      { title: 'حصة تقوية فردية في الرياضيات/العلوم (أونلاين)', price: 120, duration: 60, category: 'دروس أونلاين', location_type: 'online' },
      { title: 'حلسة إعداد لاختبارات القدرات والتحصيلي', price: 200, duration: 90, category: 'اختبارات قياس', location_type: 'online' }
    ],
    sampleStaff: [
      { name: 'أ. عبدالأحد التعليمي', role: 'مدرس أول رياضيات وفزياء', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop' }
    ]
  },
  {
    id: 'pet-care',
    name: 'رعاية وعيادة الحيوانات الأليفة (Pet Care)',
    nameEn: 'Pet Grooming & Vet Care',
    industry: 'pets',
    industryName: 'عيادة ورعاية الحيوانات الأليفة',
    primaryColor: '#d97706',
    secondaryColor: '#059669',
    heroImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&fit=crop',
    logoDefault: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&fit=crop',
    badgeText: 'حنان ورعاية فائقة',
    description: 'قالب برتقالي وأخضر مخصص لمراكز الحلاقة والتطعيم والرعاية للحيوانات الأليفة.',
    sampleServices: [
      { title: 'جلسة تنظيف وحلاقة شاملة للقطط/الكلاب', price: 120, duration: 45, category: 'تنظيف وحلاقة' },
      { title: 'كشف واستشارة بيطرية مع التطعيمات', price: 180, duration: 30, category: 'استشارات بيطرية' }
    ],
    sampleStaff: [
      { name: 'د. ياسمين البيطرية', role: 'طبيبة بيطرية وأخصائية رعاية', avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c4021204?w=200&fit=crop' }
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
  }
];
