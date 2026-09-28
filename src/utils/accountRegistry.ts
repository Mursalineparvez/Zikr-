import { UserProfile } from '../types';

const ACCOUNTS_DB_KEY = 'zikrmate_cloud_accounts_vault_v1';

export interface SavedAccountRecord {
  profile: UserProfile;
  savedAt: string;
}

/**
 * Standardize email or phone identifier for consistent lookup
 */
export const normalizeIdentifier = (raw: string): string => {
  if (!raw) return '';
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.includes('@')) {
    return trimmed;
  }
  // Phone number normalization
  const cleanDigits = trimmed.replace(/\D/g, '');
  if (!cleanDigits) return trimmed;

  // If already full international BD (e.g. 88017... or +88017...)
  if (cleanDigits.startsWith('880') && cleanDigits.length >= 13) {
    return `+${cleanDigits}`;
  }
  // If local BD format starting with 01... (11 digits e.g. 01712345678)
  if (cleanDigits.startsWith('01') && cleanDigits.length === 11) {
    return `+880${cleanDigits.slice(1)}`;
  }
  // If 10 digits starting with 1... (e.g. 1712345678)
  if (cleanDigits.startsWith('1') && cleanDigits.length === 10) {
    return `+880${cleanDigits}`;
  }

  // Generic digits with + if originally started with +
  return trimmed.startsWith('+') ? `+${cleanDigits}` : cleanDigits;
};

/**
 * Get all accounts stored in the local cloud vault
 */
export const getAllSavedAccounts = (): Record<string, SavedAccountRecord> => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse accounts registry', e);
  }
  return {};
};

/**
 * Save / Update an account into the cloud vault while strictly preserving password
 */
export const saveAccountToRegistry = (profile: UserProfile): void => {
  const targetId = profile.emailOrPhone || profile.name;
  if (!targetId) return;

  try {
    const registry = getAllSavedAccounts();
    const key = normalizeIdentifier(targetId);
    const existing = registry[key];

    // Preserve existing password if not provided in new profile
    const finalPassword = profile.password || existing?.profile?.password || '';

    registry[key] = {
      profile: {
        ...profile,
        password: finalPassword,
        isSignedIn: true,
        isVerified: true,
      },
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(ACCOUNTS_DB_KEY, JSON.stringify(registry));
  } catch (e) {
    console.error('Failed to save account to registry', e);
  }
};

/**
 * Restore an account by Email or Phone number (with robust normalization)
 */
export const findSavedAccount = (emailOrPhoneOrName: string): UserProfile | null => {
  if (!emailOrPhoneOrName) return null;
  const rawQuery = emailOrPhoneOrName.trim();
  const normalizedQuery = normalizeIdentifier(rawQuery);
  if (!normalizedQuery) return null;

  const registry = getAllSavedAccounts();

  // 1. Direct key match
  if (registry[normalizedQuery]) {
    return registry[normalizedQuery].profile;
  }
  if (registry[rawQuery.toLowerCase()]) {
    return registry[rawQuery.toLowerCase()].profile;
  }

  // 2. Exact match on emailOrPhone
  for (const key of Object.keys(registry)) {
    const record = registry[key];
    const recId = record.profile.emailOrPhone ? normalizeIdentifier(record.profile.emailOrPhone) : '';
    if (recId && (recId === normalizedQuery || recId === rawQuery.toLowerCase())) {
      return record.profile;
    }
  }

  // 3. Raw digit comparison for phone numbers
  const queryDigits = rawQuery.replace(/\D/g, '');
  if (queryDigits.length >= 8) {
    for (const key of Object.keys(registry)) {
      const record = registry[key];
      const recDigits = (record.profile.emailOrPhone || '').replace(/\D/g, '');
      if (recDigits && (recDigits.endsWith(queryDigits) || queryDigits.endsWith(recDigits))) {
        return record.profile;
      }
    }
  }

  // 4. Exact match on Name only if query is NOT an email or phone number
  if (!rawQuery.includes('@') && queryDigits.length < 5) {
    const queryNameLower = rawQuery.toLowerCase();
    for (const key of Object.keys(registry)) {
      const record = registry[key];
      if (record.profile.name?.toLowerCase().trim() === queryNameLower) {
        return record.profile;
      }
    }
  }

  return null;
};

/**
 * Update password for an account in registry
 */
export const updateAccountPassword = (emailOrPhone: string, newPassword: string): boolean => {
  if (!emailOrPhone || !newPassword) return false;
  const key = normalizeIdentifier(emailOrPhone);

  try {
    const registry = getAllSavedAccounts();
    const existingProf = findSavedAccount(emailOrPhone);

    if (existingProf) {
      const existingKey = normalizeIdentifier(existingProf.emailOrPhone || emailOrPhone);
      registry[existingKey] = {
        profile: {
          ...existingProf,
          password: newPassword,
        },
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(ACCOUNTS_DB_KEY, JSON.stringify(registry));
      return true;
    } else {
      // Register new entry with new password
      registry[key] = {
        profile: {
          name: key.includes('@') ? key.split('@')[0] : 'User',
          emailOrPhone: emailOrPhone.trim(),
          photoUrl: '',
          isSignedIn: true,
          isVerified: true,
          password: newPassword,
        },
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(ACCOUNTS_DB_KEY, JSON.stringify(registry));
      return true;
    }
  } catch (e) {
    console.error('Failed to update account password in registry', e);
  }
  return false;
};
