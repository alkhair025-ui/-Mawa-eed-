/** Optional deposit / local payment methods (Syria-first, extensible). */

export type PaymentMethodId =
  | 'pay_on_arrival'
  | 'syriatel_cash'
  | 'mtn_cash'
  | 'sham_cash'
  | 'bank_transfer'
  | 'custom';

export interface PaymentMethodConfig {
  id: PaymentMethodId;
  enabled: boolean;
  /** Wallet number, account number, or free text instructions */
  account: string;
  label?: string;
}

export interface PaymentSettings {
  /** Master switch: require deposit when booking */
  deposit_enabled: boolean;
  /** 'percent' of service price or fixed amount */
  deposit_type: 'percent' | 'fixed';
  deposit_value: number;
  currency: string;
  methods: PaymentMethodConfig[];
}

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  deposit_enabled: false,
  deposit_type: 'percent',
  deposit_value: 20,
  currency: 'SYP',
  methods: [
    { id: 'pay_on_arrival', enabled: true, account: '' },
    { id: 'syriatel_cash', enabled: false, account: '' },
    { id: 'mtn_cash', enabled: false, account: '' },
    { id: 'sham_cash', enabled: false, account: '' },
    { id: 'bank_transfer', enabled: false, account: '' },
    { id: 'custom', enabled: false, account: '', label: 'طريقة أخرى' },
  ],
};

export const METHOD_LABELS_AR: Record<PaymentMethodId, string> = {
  pay_on_arrival: 'الدفع عند الحضور',
  syriatel_cash: 'سيريتل كاش',
  mtn_cash: 'MTN كاش',
  sham_cash: 'شام كاش',
  bank_transfer: 'تحويل بنكي',
  custom: 'طريقة مخصصة',
};

export function parsePaymentSettings(raw: unknown): PaymentSettings {
  try {
    const obj = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!obj || typeof obj !== 'object') return { ...DEFAULT_PAYMENT_SETTINGS, methods: DEFAULT_PAYMENT_SETTINGS.methods.map((m) => ({ ...m })) };
    const base = { ...DEFAULT_PAYMENT_SETTINGS, methods: DEFAULT_PAYMENT_SETTINGS.methods.map((m) => ({ ...m })) };
    return {
      deposit_enabled: Boolean(obj.deposit_enabled),
      deposit_type: obj.deposit_type === 'fixed' ? 'fixed' : 'percent',
      deposit_value: Number(obj.deposit_value) || 0,
      currency: obj.currency || 'SYP',
      methods: Array.isArray(obj.methods)
        ? base.methods.map((def) => {
            const found = obj.methods.find((m: PaymentMethodConfig) => m.id === def.id);
            return found ? { ...def, ...found } : def;
          })
        : base.methods,
    };
  } catch {
    return { ...DEFAULT_PAYMENT_SETTINGS, methods: DEFAULT_PAYMENT_SETTINGS.methods.map((m) => ({ ...m })) };
  }
}

export function calcDepositAmount(servicePrice: number, settings: PaymentSettings): number {
  if (!settings.deposit_enabled) return 0;
  if (settings.deposit_type === 'fixed') return Math.max(0, settings.deposit_value);
  return Math.round((servicePrice * settings.deposit_value) / 100);
}

export function enabledMethods(settings: PaymentSettings): PaymentMethodConfig[] {
  return settings.methods.filter((m) => m.enabled);
}
