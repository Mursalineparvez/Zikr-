import { UserProfile } from '../types';

const ACCOUNTS_DB_KEY = 'zikrmate_cloud_accounts_vault_v1';
const CURRENT_SESSION_KEY = 'zikrmate_user_profile';

export interface SavedAccountRecord {
  profile: UserProfile;
  savedAt: string;
  totalZikrsCount?: number;
  bookmarksCount?: number;
}

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
 * Save / Update an account into the cloud vault
 */
export const saveAccountToRegistry = (profile: UserProfile): void => {
  if (!profile.emailOrPhone && !profile.name) return;
  try {
    const registry = getAllSavedAccounts();
    const key = (profile.emailOrPhone || profile.name).toLowerCase().trim();
    
    registry[key] = {
      profile: {
        ...profile,
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
 * Restore an account by Email or Phone number
 */
export const findSavedAccount = (emailOrPhoneOrName: string): UserProfile | null => {
  const query = emailOrPhoneOrName.toLowerCase().trim();
  if (!query) return null;

  const registry = getAllSavedAccounts();
  if (registry[query]) {
    return registry[query].profile;
  }

  // Fuzzy match on email or phone
  for (const key of Object.keys(registry)) {
    const record = registry[key];
    if (
      record.profile.emailOrPhone?.toLowerCase().trim() === query ||
      record.profile.name?.toLowerCase().trim() === query
    ) {
      return record.profile;
    }
  }

  return null;
};

/**
 * Simulated Google Accounts for Google Sign In
 */
export const GOOGLE_DEMO_ACCOUNTS = [
  {
    name: 'Md. Mursaline Parvez',
    emailOrPhone: 'mdmursalineparvez@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Abdullah Al-Mamun',
    emailOrPhone: 'abdullah.mamun@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Fatima Tuz Zahra',
    emailOrPhone: 'fatima.zahra@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
];
