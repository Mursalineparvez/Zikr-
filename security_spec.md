# Security Specification & Payload-First Security TDD

## 1. Data Invariants

1. **Zero-Trust Default Deny**: Every document path not explicitly matched is denied (`read, write: if false`).
2. **PII & Password Isolation (`/users/{userId}`)**:
   - Plaintext passwords (`password`, `password_hash`) and client-claimed privilege escalation keys (`role`, `isAdmin`) are strictly forbidden in Firestore user documents.
   - `get`, `create`, `update`, and `delete` on `/users/{userId}` require `request.auth != null && request.auth.token.email_verified == true` and strict ownership (`existing().email == request.auth.token.email` or `userId == request.auth.uid`) or verified `isOwnerAdmin()`.
   - `list` queries across `/users` are strictly restricted to `isOwnerAdmin()` so unauthenticated or non-admin users cannot scrape emails, phones, or device locations.
3. **Master Gate (`/users/{userId}/data/{docId}`)**:
   - Every sub-document operation (`get`, `list`, `create`, `update`, `delete`) evaluates the parent `/users/{userId}` document via `exists()` and `get()` to verify ownership, or `isOwnerAdmin()`.
   - Document IDs (`userId`, `docId`, `requestId`) must match `^[a-zA-Z0-9_\-]+$` with length `1..128`.
4. **Input & Resource Poisoning Guards**:
   - All string fields enforce explicit `.size()` bounds matching `firebase-blueprint.json`.
   - `/info_requests/{requestId}` `create` enforces exact required & allowed keys (`hasAll` + `hasOnly`), `data.id == requestId`, and `data.status == 'pending'`. Read, update, and delete are restricted to `isOwnerAdmin()`.
5. **Health Check Isolation (`/test/connection`)**:
   - Only `get` on `/test/connection` is permitted for startup connectivity probes; writes are denied.

## 2. The "Dirty Dozen" Attack Payloads (All Must Return `PERMISSION_DENIED`)

1. **Unauthenticated User Read (`/users/u_victim_gmail_com`)**: Unauthenticated `get` -> `PERMISSION_DENIED`.
2. **Cross-User PII Read (`/users/u_victim_gmail_com`)**: Signed-in verified user `attacker@gmail.com` reading `victim@gmail.com`'s doc -> `PERMISSION_DENIED`.
3. **Collection Scrape (`/users`)**: Signed-in non-admin user calling `getDocs(collection(db, 'users'))` (`list`) -> `PERMISSION_DENIED`.
4. **Unverified Email Spoof Admin**: User with `token.email == 'mdmursalineparvez@gmail.com'` and `token.email_verified == false` attempting admin `list` or `delete` -> `PERMISSION_DENIED`.
5. **Privilege Escalation / Ghost Field on `/users/{userId}`**: Authenticated user creating/updating `/users/{userId}` with `role: 'admin'` or `isAdmin: true` -> `PERMISSION_DENIED`.
6. **Plaintext Password Injection on `/users/{userId}`**: Authenticated user writing `password: 'secret123'` or `password_hash: 'abc'` to `/users/{userId}` -> `PERMISSION_DENIED`.
7. **Shadow Field Injection on `/info_requests/{requestId}`**: Creating `/info_requests/req_123` with extra ghost field `isAdminApproved: true` -> `PERMISSION_DENIED`.
8. **State Shortcutting on `/info_requests/{requestId}`**: Non-admin creating `/info_requests/req_124` with `status: 'resolved'` instead of `'pending'` -> `PERMISSION_DENIED`.
9. **ID Poisoning on `/users/{userId}`**: Writing to `/users/` with oversized (>128 chars) or invalid-character ID (`../admin` or 500-char string) -> `PERMISSION_DENIED`.
10. **Value Poisoning / DoW String Exhaustion**: Creating `/info_requests/req_125` with a 5000-character `question` (exceeding `maxLength: 2000`) -> `PERMISSION_DENIED`.
11. **Orphaned Subcollection Write (`/users/nonexistent_user/data/historyDoc`)**: Non-admin writing to `/users/nonexistent_user/data/historyDoc` when parent `/users/nonexistent_user` does not exist -> `PERMISSION_DENIED`.
12. **Unauthorized `/test/connection` Tampering**: Anonymous or regular user attempting `setDoc(doc(db, 'test', 'connection'), { hack: true })` -> `PERMISSION_DENIED`.
