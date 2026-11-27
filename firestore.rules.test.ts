/**
 * Security TDD Harness for Firestore Rules ("Dirty Dozen" Payloads)
 *
 * Designed for `@firebase/rules-unit-testing` against local Firestore Emulator:
 * `npx vitest run firestore.rules.test.ts` (when Firestore emulator is running).
 */

export interface DirtyDozenScenario {
  id: number;
  name: string;
  targetPath: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  auth?: { uid: string; email?: string; email_verified?: boolean };
  payload?: Record<string, unknown>;
  expectedOutcome: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_PAYLOADS: DirtyDozenScenario[] = [
  {
    id: 1,
    name: 'Unauthenticated user read on /users/{userId}',
    targetPath: 'users/u_victim_gmail_com',
    operation: 'get',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Cross-user PII read on /users/{userId}',
    targetPath: 'users/u_victim_gmail_com',
    operation: 'get',
    auth: { uid: 'attacker_uid', email: 'attacker@gmail.com', email_verified: true },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Non-admin collection scrape on /users',
    targetPath: 'users',
    operation: 'list',
    auth: { uid: 'user_uid', email: 'user@gmail.com', email_verified: true },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Unverified admin email spoof attack',
    targetPath: 'users',
    operation: 'list',
    auth: { uid: 'spoof_uid', email: 'mdmursalineparvez@gmail.com', email_verified: false },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Privilege escalation ghost field (role/isAdmin) in /users/{userId}',
    targetPath: 'users/u_attacker_gmail_com',
    operation: 'create',
    auth: { uid: 'attacker_uid', email: 'attacker@gmail.com', email_verified: true },
    payload: {
      uid: 'u_attacker_gmail_com',
      email: 'attacker@gmail.com',
      name: 'Attacker',
      role: 'admin',
      isAdmin: true,
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Plaintext password injection into /users/{userId}',
    targetPath: 'users/u_user_gmail_com',
    operation: 'create',
    auth: { uid: 'user_uid', email: 'user@gmail.com', email_verified: true },
    payload: {
      uid: 'u_user_gmail_com',
      email: 'user@gmail.com',
      name: 'User',
      password: 'plaintextPassword123',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Shadow field injection in /info_requests/{requestId}',
    targetPath: 'info_requests/req_shadow_1',
    operation: 'create',
    payload: {
      id: 'req_shadow_1',
      question: 'Valid question?',
      status: 'pending',
      createdAtMs: Date.now(),
      isAdminApproved: true,
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'State shortcutting in /info_requests/{requestId}',
    targetPath: 'info_requests/req_state_1',
    operation: 'create',
    payload: {
      id: 'req_state_1',
      question: 'Valid question?',
      status: 'resolved',
      createdAtMs: Date.now(),
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Document ID poisoning (invalid characters / >128 chars)',
    targetPath: `users/${'a'.repeat(150)}`,
    operation: 'create',
    auth: { uid: 'user_uid', email: 'user@gmail.com', email_verified: true },
    payload: {
      email: 'user@gmail.com',
      name: 'Bad ID',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Value poisoning (>2000 chars question on /info_requests)',
    targetPath: 'info_requests/req_oversized_1',
    operation: 'create',
    payload: {
      id: 'req_oversized_1',
      question: 'x'.repeat(2500),
      status: 'pending',
      createdAtMs: Date.now(),
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Orphaned subcollection write without parent /users/{userId}',
    targetPath: 'users/u_missing_parent/data/historyDoc',
    operation: 'create',
    auth: { uid: 'attacker_uid', email: 'attacker@gmail.com', email_verified: true },
    payload: {
      historyJson: '[]',
      updatedAtMs: Date.now(),
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Unauthorized write tampering on /test/connection',
    targetPath: 'test/connection',
    operation: 'create',
    auth: { uid: 'attacker_uid', email: 'attacker@gmail.com', email_verified: true },
    payload: {
      status: 'tampered',
    },
    expectedOutcome: 'PERMISSION_DENIED',
  },
];
