import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  X,
  Search,
  RefreshCw,
  Users,
  Smartphone,
  MapPin,
  Clock,
  KeyRound,
  CheckCircle2,
  Trash2,
  ChevronRight,
  Sparkles,
  BookOpen,
  Calendar,
  Lock,
  Download,
  Filter,
  Activity,
  User,
  ExternalLink,
} from 'lucide-react';
import {
  fetchAllUsersForAdmin,
  subscribeToAllUsersForAdmin,
  fetchUserDetailForAdmin,
  deleteUserByAdmin,
  AdminUserRecord,
} from '../services/firebase';
import { HistorySession, UserProfile } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { getAllSavedAccounts } from '../utils/accountRegistry';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserProfile: UserProfile;
  soundEnabled: boolean;
  isDayTheme: boolean;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  currentUserProfile,
  soundEnabled,
  isDayTheme,
}) => {
  const currentEmail = (currentUserProfile.emailOrPhone || '').toLowerCase().trim();
  const isOwner = currentEmail === 'mdmursalineparvez@gmail.com';

  // Admin Authentication State (Strictly only for mdmursalineparvez@gmail.com)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(isOwner);

  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Users data state
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'today' | 'google' | 'phone'>('all');

  // Selected User Detail Modal
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<{
    historySessions: HistorySession[];
    aamalLogs: Record<string, any>;
  } | null>(null);
  const [isLoadingUserDetail, setIsLoadingUserDetail] = useState<boolean>(false);

  // Confirm delete modal
  const [userToDelete, setUserToDelete] = useState<AdminUserRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Helper to merge cloud records with local device registry
  const mergeCloudAndVaultUsers = (cloudData: AdminUserRecord[]): AdminUserRecord[] => {
    const localVault = getAllSavedAccounts();
    const userMap = new Map<string, AdminUserRecord>();

    // 1. Add all users from cloud
    cloudData.forEach((u) => {
      userMap.set(u.userKey.toLowerCase(), { ...u });
      if (u.email) {
        userMap.set(u.email.toLowerCase(), userMap.get(u.userKey.toLowerCase())!);
      }
    });

    // 2. Merge with locally saved accounts
    Object.values(localVault).forEach((acc) => {
      const p = acc.profile;
      const em = (p.emailOrPhone || '').toLowerCase().trim();
      if (!em) return;

      const uk = 'u_' + em.replace(/[^a-z0-9]/g, '_');
      const existing = userMap.get(uk) || userMap.get(em);
      const localTime = p.lastSyncedAt || (acc.savedAt ? new Date(acc.savedAt).getTime() : Date.now());

      if (existing) {
        // Upgrade existing with recent local session data
        if (localTime > existing.lastSyncedAt) {
          existing.lastSyncedAt = localTime;
        }
        if (p.name && (!existing.name || existing.name.includes('ZikrMate User'))) {
          existing.name = p.name;
        }
        if (p.photoUrl && !existing.photoUrl) {
          existing.photoUrl = p.photoUrl;
        }
        if (p.deviceModel && !existing.deviceModel.includes('Vivo')) {
          existing.deviceModel = p.deviceModel;
        }
        if (p.location) {
          existing.location = p.location;
        }
        if (p.authProvider === 'google') {
          existing.verificationMethod = 'Google Sign-In';
        }
        if (p.password) {
          existing.hasPassword = true;
        }
      } else {
        const newRecord: AdminUserRecord = {
          userKey: uk,
          name: p.name || (em.includes('@') ? em.split('@')[0] : 'User'),
          emailOrPhone: em,
          email: em.includes('@') ? em : '',
          phone: !em.includes('@') ? em : '',
          photoUrl: p.photoUrl || '',
          location: p.location || 'Bangladesh',
          deviceModel: p.deviceModel || 'Mobile Device',
          osVersion: p.osVersion || 'Android',
          verificationMethod: p.authProvider === 'google' ? 'Google Sign-In' : (em.includes('@') ? 'Google / Email' : 'Phone Verified'),
          lastSyncedAt: localTime,
          createdAtMs: acc.savedAt ? new Date(acc.savedAt).getTime() : Date.now(),
          lifetimeTotalCount: 0,
          activeZikrs: [],
          hasPassword: !!p.password,
        };
        userMap.set(uk, newRecord);
        if (em.includes('@')) {
          userMap.set(em, newRecord);
        }
      }
    });

    // Deduplicate unique objects and sort descending by last activity
    const uniqueUsers = Array.from(new Set(userMap.values()));
    return uniqueUsers.sort((a, b) => b.lastSyncedAt - a.lastSyncedAt);
  };

  // Load users list when modal opens & admin is authenticated
  const loadUsersData = async () => {
    if (!isOwner) return;
    setIsLoading(true);
    try {
      const data = await fetchAllUsersForAdmin();
      const merged = mergeCloudAndVaultUsers(data);
      setUsers(merged);
    } catch (e) {
      console.warn('loadUsersData notice:', e);
      const fallback = mergeCloudAndVaultUsers([]);
      setUsers(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !isOwner) return;

    setIsAdminAuthenticated(true);
    loadUsersData();
    const unsubscribe = subscribeToAllUsersForAdmin((data) => {
      const merged = mergeCloudAndVaultUsers(data);
      setUsers(merged);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [isOpen, isOwner]);

  // Strictly block any non-owner access
  if (!isOpen || !isOwner) return null;

  // Handle Admin PIN Login
  const handleAdminPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    // Secret default PIN is 786786 or 123456
    if (adminPinInput.trim() === '786786' || adminPinInput.trim() === '123456' || adminPinInput.trim() === '786') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('zikrmate_admin_session_auth', 'true');
      } catch {}
      if (soundEnabled) soundHaptics.playMilestone();
      loadUsersData();
    } else {
      setPinError('ভুল অ্যাডমিন পিন কোড! সঠিক পিন কোড দিন।');
      if (soundEnabled) soundHaptics.playTap();
    }
  };

  // Inspect specific user for detailed history & aamal logs
  const handleInspectUser = async (user: AdminUserRecord) => {
    setSelectedUser(user);
    setIsLoadingUserDetail(true);
    setSelectedUserDetail(null);
    if (soundEnabled) soundHaptics.playTap();

    const detail = await fetchUserDetailForAdmin(user.userKey);
    setSelectedUserDetail(detail);
    setIsLoadingUserDetail(false);
  };

  // Delete user record
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    const success = await deleteUserByAdmin(userToDelete.userKey);
    setIsDeleting(false);

    if (success) {
      setUsers((prev) => prev.filter((u) => u.userKey !== userToDelete.userKey));
      if (selectedUser?.userKey === userToDelete.userKey) {
        setSelectedUser(null);
      }
      setUserToDelete(null);
      if (soundEnabled) soundHaptics.playMilestone();
    }
  };

  // Filtered Users List
  const nowMs = Date.now();
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.emailOrPhone.toLowerCase().includes(q) ||
      u.deviceModel.toLowerCase().includes(q) ||
      u.location.toLowerCase().includes(q) ||
      u.osVersion.toLowerCase().includes(q);

    if (!matchSearch) return false;

    if (filterType === 'today') {
      // Active in last 24 hours
      return nowMs - u.lastSyncedAt <= 24 * 60 * 60 * 1000;
    }
    if (filterType === 'google') {
      return (
        u.verificationMethod.toLowerCase().includes('google') ||
        u.email.toLowerCase().includes('@gmail.com') ||
        u.emailOrPhone.toLowerCase().includes('@gmail.com')
      );
    }
    if (filterType === 'phone') {
      return u.verificationMethod === 'phone' || !!u.phone;
    }

    return true;
  });

  // Calculate metrics
  const totalUsers = users.length;
  const activeTodayCount = users.filter((u) => nowMs - u.lastSyncedAt <= 24 * 60 * 60 * 1000).length;
  const grandTotalZikrsCount = users.reduce((acc, curr) => acc + (curr.lifetimeTotalCount || 0), 0);
  const mobileDeviceUsersCount = users.filter(
    (u) =>
      u.deviceModel.toLowerCase().includes('vivo') ||
      u.deviceModel.toLowerCase().includes('samsung') ||
      u.deviceModel.toLowerCase().includes('iphone') ||
      u.deviceModel.toLowerCase().includes('realme') ||
      u.deviceModel.toLowerCase().includes('xiaomi') ||
      u.deviceModel.toLowerCase().includes('oppo') ||
      u.deviceModel.toLowerCase().includes('android') ||
      u.deviceModel.toLowerCase().includes('mobile')
  ).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl h-full sm:h-[92vh] sm:rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
          isDayTheme
            ? 'bg-[#f8fcfb] text-slate-800 border-emerald-200'
            : 'bg-[#071d22] text-white border-[#1c5561]'
        }`}
      >
        {/* 1. ADMIN TOP BAR */}
        <div className="bg-gradient-to-r from-[#1b5e39] via-[#236a42] to-[#11462d] text-white px-4 py-3.5 flex items-center justify-between shadow-md shrink-0 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-300/40 flex items-center justify-center font-bold shadow-inner">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                <span>ZikrMate Admin Dashboard</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-extrabold uppercase">
                  Super Admin
                </span>
              </h2>
              <p className="text-[11px] text-teal-100/90 leading-tight">
                ইউজার ড্যাশবোর্ড, ডিভাইস মেট্রিক্স ও আমল ইতিহাস
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={loadUsersData}
                disabled={isLoading}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition active:scale-95 cursor-pointer text-xs flex items-center gap-1.5 font-bold"
                title="Refresh users"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">রিফ্রেশ</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/20 transition active:scale-95 cursor-pointer text-white"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. ADMIN AUTH VERIFICATION (IF NOT AUTHENTICATED YET) */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <div
              className={`w-full max-w-sm p-6 rounded-3xl border shadow-xl space-y-4 ${
                isDayTheme ? 'bg-white border-slate-200' : 'bg-[#0a252b] border-[#184e5a]'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/30">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  অ্যাডমিন প্যানেল সিকিউরিটি
                </h3>
                <p className="text-xs text-slate-500 dark:text-teal-300/80 mt-1 leading-relaxed">
                  অ্যাডমিন ড্যাশবোর্ড ব্যবহারের জন্য গোপন অ্যাডমিন পিন কোডটি দিন।
                </p>
              </div>

              <form onSubmit={handleAdminPinSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="password"
                    autoFocus
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    placeholder="পিন কোড লিখুন (e.g. 786786)"
                    className={`w-full rounded-2xl px-4 py-3 border text-center font-mono font-bold text-sm tracking-widest focus:outline-none transition ${
                      isDayTheme
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600'
                        : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                    }`}
                  />
                </div>

                {pinError && (
                  <p className="text-xs font-bold text-rose-500 bg-rose-500/10 p-2 rounded-xl border border-rose-500/20">
                    {pinError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন</span>
                </button>
              </form>

              <p className="text-[10px] text-slate-400 dark:text-teal-400/60 font-mono">
                Owner: mdmursalineparvez@gmail.com
              </p>
            </div>
          </div>
        ) : (
          /* 3. MAIN ADMIN DASHBOARD CONTENT */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-3 sm:p-5 space-y-4">
            {/* STATS METRICS CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
              {/* Metric 1: Total Users */}
              <div
                className={`p-3 rounded-2xl border shadow-sm space-y-1 ${
                  isDayTheme
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 text-slate-800'
                    : 'bg-gradient-to-br from-[#092e34] to-[#0c3740] border-[#1c5561] text-white'
                }`}
              >
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="text-[11px] font-bold">মোট ব্যবহারকারী</span>
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-lg sm:text-2xl font-black font-mono tracking-tight">
                  {isLoading ? '...' : totalUsers}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-teal-300/70 truncate">
                  ক্লাউড রেজিস্টার্ড ইউজার
                </div>
              </div>

              {/* Metric 2: Active Today */}
              <div
                className={`p-3 rounded-2xl border shadow-sm space-y-1 ${
                  isDayTheme
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 text-slate-800'
                    : 'bg-gradient-to-br from-[#2a220b] to-[#362a0f] border-amber-900/50 text-white'
                }`}
              >
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                  <span className="text-[11px] font-bold">আজকের সক্রিয় ইউজার</span>
                  <Activity className="w-4 h-4" />
                </div>
                <div className="text-lg sm:text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-300">
                  {isLoading ? '...' : activeTodayCount}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-teal-300/70 truncate">
                  গত ২৪ ঘণ্টায় ব্যবহৃত
                </div>
              </div>

              {/* Metric 3: Mobile Apps */}
              <div
                className={`p-3 rounded-2xl border shadow-sm space-y-1 ${
                  isDayTheme
                    ? 'bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200 text-slate-800'
                    : 'bg-gradient-to-br from-[#092b33] to-[#0e3740] border-teal-900/60 text-white'
                }`}
              >
                <div className="flex items-center justify-between text-teal-600 dark:text-teal-400">
                  <span className="text-[11px] font-bold">মোবাইল ডিভাইস</span>
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="text-lg sm:text-2xl font-black font-mono tracking-tight text-teal-600 dark:text-teal-300">
                  {isLoading ? '...' : mobileDeviceUsersCount}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-teal-300/70 truncate">
                  Vivo, Samsung, iPhone ইত্যাদি
                </div>
              </div>

              {/* Metric 4: Total Global Zikrs */}
              <div
                className={`p-3 rounded-2xl border shadow-sm space-y-1 ${
                  isDayTheme
                    ? 'bg-gradient-to-br from-purple-50 to-teal-50 border-purple-200 text-slate-800'
                    : 'bg-gradient-to-br from-[#1e1333] to-[#261842] border-purple-900/50 text-white'
                }`}
              >
                <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
                  <span className="text-[11px] font-bold">সর্বমোট জিকির</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-lg sm:text-2xl font-black font-mono tracking-tight text-purple-600 dark:text-purple-300">
                  {isLoading ? '...' : grandTotalZikrsCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-teal-300/70 truncate">
                  সব ইউজারের সম্মিলিত গণনা
                </div>
              </div>
            </div>

            {/* SEARCH & FILTER CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 dark:text-teal-400/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="নাম, ইমেইল, মোবাইল, ডিভাইস মডেল (e.g. Vivo) বা লোকেশন দিয়ে সার্চ করুন..."
                  className={`w-full rounded-2xl pl-10 pr-4 py-2.5 border text-xs font-semibold focus:outline-none transition ${
                    isDayTheme
                      ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600'
                      : 'bg-[#051417] border-[#184850] text-white focus:border-emerald-500'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-bold shrink-0">
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`py-2 px-3 rounded-xl transition cursor-pointer shrink-0 ${
                    filterType === 'all'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-[#092329] text-slate-600 dark:text-teal-300'
                  }`}
                >
                  সব ইউজার ({totalUsers})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('today')}
                  className={`py-2 px-3 rounded-xl transition cursor-pointer shrink-0 ${
                    filterType === 'today'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-[#092329] text-slate-600 dark:text-teal-300'
                  }`}
                >
                  আজকের সক্রিয় ({activeTodayCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('google')}
                  className={`py-2 px-3 rounded-xl transition cursor-pointer shrink-0 ${
                    filterType === 'google'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-[#092329] text-slate-600 dark:text-teal-300'
                  }`}
                >
                  Google Sign-In ({users.filter((u) => u.verificationMethod.toLowerCase().includes('google') || u.email.toLowerCase().includes('@gmail.com') || u.emailOrPhone.toLowerCase().includes('@gmail.com')).length})
                </button>
              </div>
            </div>

            {/* USERS LIST TABLE / CARDS */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
              {isLoading ? (
                <div className="p-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-500 dark:text-teal-300/80">
                    ফায়ারস্টোর থেকে সকল ইউজার ডাটা ও ডিভাইস মেট্রিক্স লোড হচ্ছে...
                  </p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div
                  className={`p-10 rounded-2xl border text-center space-y-2 ${
                    isDayTheme ? 'bg-white border-slate-200' : 'bg-[#0a252b] border-[#184e5a]'
                  }`}
                >
                  <Users className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-600 dark:text-teal-200">
                    কোনো ইউজার রেকর্ড পাওয়া যায়নি!
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-teal-400/60">
                    সার্চ বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => {
                  const isRecentlyActive = nowMs - user.lastSyncedAt <= 24 * 60 * 60 * 1000;
                  const dateStr = new Date(user.lastSyncedAt).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={user.userKey}
                      className={`p-3.5 sm:p-4 rounded-2xl border shadow-sm transition-all hover:shadow-md ${
                        isDayTheme
                          ? 'bg-white border-slate-200 hover:border-emerald-300'
                          : 'bg-[#0a252b] border-[#174853] hover:border-teal-500/60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* User Profile Info */}
                        <div className="flex items-start gap-3">
                          <div className="relative shrink-0">
                            <div className="w-11 h-11 rounded-2xl overflow-hidden bg-emerald-100 dark:bg-emerald-950 border border-emerald-500/40 shadow-inner flex items-center justify-center">
                              {user.photoUrl ? (
                                <img src={user.photoUrl} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-6 h-6 text-emerald-600" />
                              )}
                            </div>
                            {isRecentlyActive && (
                              <span
                                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0a252b]"
                                title="Active Today"
                              />
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                                {user.name}
                              </h4>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                                {user.verificationMethod.toUpperCase()}
                              </span>
                            </div>

                            <div className="text-xs font-mono font-semibold text-slate-600 dark:text-teal-200">
                              {user.emailOrPhone}
                            </div>

                            {/* Device & Location Info */}
                            <div className="flex items-center gap-3 flex-wrap text-[11px] text-slate-500 dark:text-teal-300/80 pt-0.5 font-medium">
                              <span className="flex items-center gap-1 font-mono">
                                <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>{user.deviceModel}</span>
                                <span className="text-[10px] text-slate-400">({user.osVersion})</span>
                              </span>

                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                                <span>{user.location}</span>
                              </span>

                              <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                                <Clock className="w-3 h-3" />
                                <span>{dateStr}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Actions & Metrics */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-teal-900/40">
                          <div className="text-left sm:text-right">
                            <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                              মোট জিকির
                            </div>
                            <div className="text-base sm:text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                              {user.lifetimeTotalCount.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleInspectUser(user)}
                              className="py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>আমল হিস্ট্রি</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setUserToDelete(user)}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 transition cursor-pointer"
                              title="Delete user document"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* 4. SUB-MODAL: USER DETAIL INSPECTION (ZIKR BREAKDOWN & AAMAL HISTORY) */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
            <div
              className={`w-full max-w-2xl max-h-[90vh] rounded-3xl border shadow-2xl p-4 sm:p-6 space-y-4 overflow-y-auto transition-all ${
                isDayTheme
                  ? 'bg-gradient-to-b from-[#f9fcfb] to-white text-slate-800 border-emerald-200'
                  : 'bg-gradient-to-b from-[#0a252b] to-[#071a1e] text-white border-[#1c5561]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-teal-900/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                      {selectedUser.name} - আমল ও জিকির রিপোর্ট
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-teal-300/80">
                      {selectedUser.emailOrPhone}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* USER DEVICE TELEMETRY SUMMARY */}
              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                  isDayTheme ? 'bg-slate-50 border-slate-200' : 'bg-[#051417] border-[#184850]'
                }`}
              >
                <div className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>ডিভাইস ও সিস্টেম ডাটা (Device Telemetry)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-slate-600 dark:text-teal-200">
                  <div>Model: {selectedUser.deviceModel}</div>
                  <div>OS: {selectedUser.osVersion}</div>
                  <div>Location: {selectedUser.location}</div>
                  <div>Auth: {selectedUser.verificationMethod}</div>
                  <div>
                    Last Active:{' '}
                    {new Date(selectedUser.lastSyncedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div>Lifetime Count: {selectedUser.lifetimeTotalCount.toLocaleString()}</div>
                </div>
              </div>

              {/* ACTIVE ZIKR BREAKDOWN */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-teal-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>বর্তমান জিকির কাউন্ট (Active Zikr Breakdown)</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedUser.activeZikrs.map((z) => (
                    <div
                      key={z.id}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                        isDayTheme ? 'bg-white border-slate-200' : 'bg-[#081d22] border-[#154650]'
                      }`}
                    >
                      <span className="font-bold text-slate-800 dark:text-teal-100 truncate max-w-[100px]">
                        {z.name}
                      </span>
                      <span className="font-black font-mono text-emerald-600 dark:text-emerald-400">
                        {z.count} / {z.target}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* HISTORICAL SESSIONS & AAMAL LOGS */}
              {isLoadingUserDetail ? (
                <div className="p-8 text-center space-y-2">
                  <RefreshCw className="w-6 h-6 text-emerald-500 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-500 dark:text-teal-300">
                    ইউজারের আর্কাইভ ইতিহাস লোড হচ্ছে...
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  {/* History Sessions List */}
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-teal-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-500" />
                      <span>সংরক্ষিত হিস্ট্রি সেশন ({selectedUserDetail?.historySessions.length || 0})</span>
                    </h4>

                    {selectedUserDetail?.historySessions && selectedUserDetail.historySessions.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {selectedUserDetail.historySessions.map((s) => (
                          <div
                            key={s.id}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                              isDayTheme ? 'bg-white border-slate-200' : 'bg-[#081d22] border-[#154650]'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {s.dateStr || new Date(s.timestamp).toLocaleDateString()}
                              </div>
                              {s.note && (
                                <div className="text-[10px] text-slate-500 dark:text-teal-300">
                                  {s.note}
                                </div>
                              )}
                            </div>
                            <div className="font-black font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                              +{s.totalCount} zikrs
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 dark:text-teal-400/60 italic">
                        এই ইউজারের কোনো স্থায়ী হিস্ট্রি সেশন সেভ করা নেই।
                      </p>
                    )}
                  </div>

                  {/* Daily Aamal Logs Summary */}
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-teal-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      <span>দৈনিক আমল ট্র্যাকার ইতিহাস</span>
                    </h4>

                    {selectedUserDetail?.aamalLogs && Object.keys(selectedUserDetail.aamalLogs).length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {Object.keys(selectedUserDetail.aamalLogs).map((dateKey) => {
                          const log = selectedUserDetail.aamalLogs[dateKey];
                          return (
                            <div
                              key={dateKey}
                              className={`p-3 rounded-xl border text-xs space-y-1 ${
                                isDayTheme ? 'bg-white border-slate-200' : 'bg-[#081d22] border-[#154650]'
                              }`}
                            >
                              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                                <span>তারিখ: {dateKey}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold">
                                  Score: {log.scorePercentage || 0}%
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-teal-300/80 font-mono">
                                পাঁচ ওয়াক্ত নামাজ: {log.prayers ? Object.values(log.prayers).filter((v: any) => v && v.offered).length : 0} / ৫ | সূরা মুলক: {log.surahMulk ? 'হ্যাঁ ✓' : 'না'} | আয়াতুল কুরসি: {log.ayatulKursi ? 'হ্যাঁ ✓' : 'না'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 dark:text-teal-400/60 italic">
                        আমল ট্র্যাকারে কোনো হিসাব পাওয়া যায়নি।
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. CONFIRM DELETE MODAL */}
        {userToDelete && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div
              className={`w-full max-w-sm rounded-3xl border p-5 shadow-2xl space-y-4 ${
                isDayTheme ? 'bg-white border-slate-200' : 'bg-[#0f343c] border-[#1c5763] text-white'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/30">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  ইউজার ডিলিট নিশ্চিতকরণ
                </h3>
                <p className="text-xs text-slate-500 dark:text-teal-200">
                  আপনি কি নিশ্চিত <strong>"{userToDelete.name}"</strong>-এর ক্লাউড রেকর্ড স্থায়ীভাবে মুছে ফেলতে চান?
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUserToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteUser}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'হ্যাঁ, ডিলিট করুন'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
