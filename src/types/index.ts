index.ts‎
+28
Lines changed: 28 additions & 0 deletions
Original file line number	Diff line number	Diff line change
@@ -21,6 +21,15 @@ export interface Business {
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
@@ -64,6 +73,11 @@ export interface Appointment {
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
@@ -81,3 +95,17 @@ export interface TemplateConfig {
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
