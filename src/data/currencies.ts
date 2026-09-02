// Complete currency list covering every Arab country plus major world currencies.
// Used by the merchant branding settings, the "add service" modal, and the
// public booking page so businesses across the Arab world can price in their
// local currency.

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
}

export const CURRENCIES: CurrencyOption[] = [
  // الخليج
  { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س' },
  { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ' },
  { code: 'KWD', name: 'دينار كويتي', symbol: 'د.ك' },
  { code: 'QAR', name: 'ريال قطري', symbol: 'ر.ق' },
  { code: 'BHD', name: 'دينار بحريني', symbol: 'د.ب' },
  { code: 'OMR', name: 'ريال عُماني', symbol: 'ر.ع' },
  // بلاد الشام
  { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م' },
  { code: 'SYP', name: 'ليرة سورية', symbol: 'ل.س' },
  { code: 'JOD', name: 'دينار أردني', symbol: 'د.أ' },
  { code: 'LBP', name: 'ليرة لبنانية', symbol: 'ل.ل' },
  // المغرب العربي
  { code: 'DZD', name: 'دينار جزائري', symbol: 'د.ج' },
  { code: 'TND', name: 'دينار تونسي', symbol: 'د.ت' },
  { code: 'MAD', name: 'درهم مغربي', symbol: 'د.م' },
  { code: 'LYD', name: 'دينار ليبي', symbol: 'د.ل' },
  { code: 'MRU', name: 'أوقية موريتانية', symbol: 'أ.م' },
  // العراق واليمن والسودان
  { code: 'IQD', name: 'دينار عراقي', symbol: 'د.ع' },
  { code: 'YER', name: 'ريال يمني', symbol: 'ر.ي' },
  { code: 'SDG', name: 'جنيه سوداني', symbol: 'ج.س' },
  // عملات عالمية شائعة
  { code: 'USD', name: 'دولار أمريكي', symbol: '$' },
  { code: 'EUR', name: 'يورو', symbol: '€' },
  { code: 'GBP', name: 'جنيه إسترليني', symbol: '£' },
  { code: 'TRY', name: 'ليرة تركية', symbol: '₺' },
];

// Arab countries with default city + international dial code, used to seed
// sensible defaults when a merchant creates a new store.
export interface CountryOption {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  dialCode: string; // with leading +
  defaultCity: string;
  currency: string; // default currency code for this country
}

export const ARAB_COUNTRIES: CountryOption[] = [
  { code: 'SA', name: 'السعودية', dialCode: '+966', defaultCity: 'الرياض', currency: 'SAR' },
  { code: 'AE', name: 'الإمارات', dialCode: '+971', defaultCity: 'دبي', currency: 'AED' },
  { code: 'KW', name: 'الكويت', dialCode: '+965', defaultCity: 'الكويت', currency: 'KWD' },
  { code: 'QA', name: 'قطر', dialCode: '+974', defaultCity: 'الدوحة', currency: 'QAR' },
  { code: 'BH', name: 'البحرين', dialCode: '+973', defaultCity: 'المنامة', currency: 'BHD' },
  { code: 'OM', name: 'عُمان', dialCode: '+968', defaultCity: 'مسقط', currency: 'OMR' },
  { code: 'EG', name: 'مصر', dialCode: '+20', defaultCity: 'القاهرة', currency: 'EGP' },
  { code: 'SY', name: 'سوريا', dialCode: '+963', defaultCity: 'دمشق', currency: 'SYP' },
  { code: 'JO', name: 'الأردن', dialCode: '+962', defaultCity: 'عمّان', currency: 'JOD' },
  { code: 'LB', name: 'لبنان', dialCode: '+961', defaultCity: 'بيروت', currency: 'LBP' },
  { code: 'PS', name: 'فلسطين', dialCode: '+970', defaultCity: 'رام الله', currency: 'JOD' },
  { code: 'IQ', name: 'العراق', dialCode: '+964', defaultCity: 'بغداد', currency: 'IQD' },
  { code: 'YE', name: 'اليمن', dialCode: '+967', defaultCity: 'صنعاء', currency: 'YER' },
  { code: 'SD', name: 'السودان', dialCode: '+249', defaultCity: 'الخرطوم', currency: 'SDG' },
  { code: 'DZ', name: 'الجزائر', dialCode: '+213', defaultCity: 'الجزائر', currency: 'DZD' },
  { code: 'TN', name: 'تونس', dialCode: '+216', defaultCity: 'تونس', currency: 'TND' },
  { code: 'MA', name: 'المغرب', dialCode: '+212', defaultCity: 'الرباط', currency: 'MAD' },
  { code: 'LY', name: 'ليبيا', dialCode: '+218', defaultCity: 'طرابلس', currency: 'LYD' },
  { code: 'MR', name: 'موريتانيا', dialCode: '+222', defaultCity: 'نواكشوط', currency: 'MRU' },
];

export function currencySymbol(code?: string): string {
  if (!code) return '';
  const found = CURRENCIES.find((c) => c.code === code);
  return found ? found.symbol : code;
}
