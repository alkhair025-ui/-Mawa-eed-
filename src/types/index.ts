export interface Business {
  id: string;
  slug: string;
  name: string;
  industry: string;
  industry_custom_name?: string;
  template_id: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  logo_url: string;
  cover_url: string;
  primary_color: string;
  secondary_color: string;
  description: string;
  currency?: string;
  ai_generated?: boolean;
  trial_start: string;
  trial_end: string;
  subscription_status: string;
  plan_name: string;
  created_at?: string;
  /** JSON string or object of weekly hours */
  working_hours?: string | Record<string, unknown>;
  /** Simple merchant dashboard PIN */
  access_pin?: string;
  slot_interval_min?: number;
  payment_settings?: string | Record<string, unknown>;
  timezone?: string;
  /** Mini accounting module (plan feature) */
  accounting_enabled?: boolean;
}

export interface Service {
  id: number;
  business_id: string;
  title: string;
  description: string;
  duration_min: number;
  price: number;
  currency: string;
  category: string;
  location_type?: 'branch' | 'online' | 'home_visit' | 'phone';
  custom_fields?: { name: string; required: boolean; type: 'text' | 'number' | 'file' }[];
  image_url?: string;
}

export interface Staff {
  id: number;
  business_id: string;
  name: string;
  role: string;
  avatar: string;
  phone: string;
  is_active: boolean;
}

export interface Appointment {
  id: number;
  business_id: string;
  booking_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service_id: number;
  service_title: string;
  staff_id?: number | null;
  staff_name?: string;
  appointment_date: string;
  appointment_time: string;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'waitlist';
  notes?: string;
  created_at?: string;
  /** deposit / payment */
  deposit_amount?: number;
  payment_method?: string;
  payment_status?: 'not_required' | 'pending' | 'paid' | 'waived';
  payment_ref?: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  nameEn: string;
  industry: string;
  industryName: string;
  primaryColor: string;
  secondaryColor: string;
  heroImage: string;
  logoDefault: string;
  badgeText: string;
  description: string;
  sampleServices: { title: string; price: number; duration: number; category: string; location_type?: string }[];
  sampleStaff: { name: string; role: string; avatar: string }[];
}


export interface LedgerEntry {
  id: number;
  business_id: string;
  type: 'income' | 'expense';
  category: string;
  title: string;
  amount: number;
  currency: string;
  date: string;
  notes?: string;
  created_at?: string;
}
