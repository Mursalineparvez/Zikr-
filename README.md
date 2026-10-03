# 🌙 Zikr+

### **A Modern Islamic Companion for Zikir, Quran, Hadith, Salat, Dua & Daily Aamal**

> **Remember. Reflect. Pray. Track. Grow.**

**Zikr+** is a modern Islamic companion platform designed to bring essential daily worship and Islamic resources together in one calm, intelligent, and beautifully structured digital experience.

Rather than functioning as only a Tasbeeh counter, Zikr+ combines **Zikir, Quran, Kitab Library, Hadith, Salat Times, Dua, and Aamal Tracking** within a unified application architecture.

The application is designed around a simple philosophy:

> **One peaceful space for everyday remembrance, learning, worship, and reflection.**

---

## ✨ The Idea Behind Zikr+

Modern users often depend on multiple applications for different Islamic activities—one for prayer times, another for Quran, another for Zikir, and another for Islamic books.

**Zikr+ brings these experiences together.**

```text
                           🌙 ZIKR+
                              │
              ┌───────────────┼───────────────┐
              │               │               │
           Worship          Learning        Tracking
              │               │               │
        ┌─────┼─────┐    ┌────┼────┐      ┌───┼────┐
        │     │     │    │    │    │      │   │    │
      Zikir  Salat  Dua Quran Hadith Kitab Aamal History
```

The result is a single ecosystem where users can **remember, read, learn, pray, and track** without leaving the application.

---

# 🕌 Core Experience

Zikr+ is organized around seven primary experiences:

| Section              | Purpose                             |
| -------------------- | ----------------------------------- |
| 📿 **Zikir**         | Digital Zikir & Tasbeeh counting    |
| 📖 **Quran**         | Quran reading and reflection        |
| 📚 **Kitab Library** | Islamic books and reading resources |
| 📜 **Hadith**        | Hadith collections and references   |
| 🕌 **Salat Time**    | Daily prayer schedule & Solar trajectory |
| 🤲 **Dua**           | Daily and situational authentic Duas |
| 📋 **Aamal Tracker** | Daily worship, Sunnah & deeds tracking |

---

# 📿 Zikir — The Heart of Zikr+

The Zikir system is designed as an **independent multi-counter engine**, rather than a single shared counter.

Every Zikir maintains its own state, sound, haptic feedback, and configurable target.

```text
┌──────────────────────────────────────┐
│           سُبْحَانَ اللَّهِ          │
│                                      │
│              সুবহানাল্লাহ             │
│                                      │
│               37 / 100               │
│                                      │
│          ███████░░░░░ 37%            │
│                                      │
│              ＋ COUNT                 │
│                Reset                 │
└──────────────────────────────────────┘
```

A user can maintain:

```text
SubhanAllah        37 / 100
Alhamdulillah      50 / 100
Allahu Akbar       75 / 100
Darood Sharif      25 / 100
Astaghfirullah     40 / 100
```

Each counter remains completely independent.

---

# 🌅 Morning & 🌇 Evening Zikir

Zikr+ organizes Zikir into meaningful daily categories with authentic prophetic morning and evening Adhkar.

### সকালের যিকির (Morning Adhkar)

The default morning collection contains authentic Zikir items:

```text
سُبْحَانَ اللَّهِ
সুবহানাল্লাহ

الْحَمْدُ لِلَّهِ
আলহামদুলিল্লাহ

لَا إِلٰهَ إِلَّا اللَّهُ
লা ইলাহা ইল্লাল্লাহ

اللَّهُ أَكْبَرُ
আল্লাহু আকবার

صَلَّى اللَّهُ عَلَى مُحَمَّدٍ وَسَلَّمَ
দরুদ শরীফ

أَسْتَغْفِرُ اللَّهَ
ইস্তিগফার
```

Default target:

**600 total repetitions**

### সন্ধ্যার যিকির (Evening Adhkar)

The evening collection includes configurable targets.

For example:

```text
لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ

33 / 33
```

or:

```text
33 / 100
```

The target system is configurable instead of being permanently locked to one value.

---

# 🔵 Central Intelligence — Total Counter

One of Zikr+'s key UX concepts is the **central total counter**.

Instead of storing a separate total that can become inconsistent, the application derives the total dynamically from individual Zikir states with satisfying bead animations and micro-interactions.

```text
              Individual Counters
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Zikir A       Zikir B      Zikir C
          │            │            │
          └────────────┼────────────┘
                       ↓
                 SUM / Aggregator
                       ↓
                ┌─────────────┐
                │     263     │
                │ TOTAL ZIKIR │
                └─────────────┘
```

Example:

```text
Morning
230 / 600

Evening
33 / 133

────────────────

Overall
263 / 733
```

Everything is calculated dynamically from actual user data.

---

# 📊 Daily Progress

The Zikir dashboard provides an overview of the user's daily activity.

```text
                    আজকের অগ্রগতি

                         36%

          ─────────────────────────
          Morning       230 / 600
          Evening        33 / 133
          ─────────────────────────
          Overall       263 / 733
```

The progress engine calculates:

```text
Morning Progress
= Morning Count / Morning Target

Evening Progress
= Evening Count / Evening Target

Overall Progress
= Total Count / Total Target
```

No hard-coded percentage is required.

---

# 🧠 Product Architecture

Zikr+ is designed using a **modular architecture** so that each Islamic feature can evolve independently without breaking the rest of the application.

```text
                          ZIKR+
                            │
                    Application Shell
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
       Navigation        UI System        State Layer
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                     Feature Modules
                            │
      ┌─────────┬─────────┬─┴───────┬────────┬────────┐
      ↓         ↓         ↓         ↓        ↓        ↓
    Zikir     Quran     Hadith    Kitab    Salat    Dua
      │                                             │
      └──────────────────┬──────────────────────────┘
                         ↓
                    Aamal Tracker
                         │
                         ↓
                  Storage / Data
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
     Local / Offline Data      Firebase Cloud Sync
```

This architecture allows new features to be added without rewriting the entire application.

---

# 🧩 Feature-Based Architecture

Instead of building the application as one large component, Zikr+ follows a clean, feature-oriented structure.

```text
src/
│
├── App.tsx                     # Core application orchestrator & module router
│
├── components/
│   ├── ZikirCounterView.tsx    # Multi-counter engine & central total
│   ├── CircularCenterCounter.tsx # Interactive primary Tasbeeh ring
│   ├── ZikrCard.tsx            # Independent Zikir card component
│   ├── QuranView.tsx           # Complete 114 Surahs reader with audio & Juz filter
│   ├── HadithView.tsx          # 8 Major collections with searchable chapters
│   ├── KitabView.tsx           # Curated Islamic classical PDF & book library
│   ├── SalatTimeView.tsx       # Live prayer times, prohibited zones & trajectory
│   ├── SolarTrajectoryCard.tsx # Real-time sun/moon physics & twilight curve
│   ├── DuaView.tsx             # Authentic Hisnul Muslim collection with audio
│   ├── AamalTrackerView.tsx    # Daily Muhasabah, Sunnah & deed tracking
│   ├── ProfileModal.tsx        # Profile, Google & OTP authentication & cloud sync
│   └── Header.tsx & BottomNav.tsx # Responsive navigation shell
│
├── utils/
│   ├── soundHaptics.ts         # Audio synthesis & tactile vibration feedback
│   ├── exportPdf.ts            # High-fidelity A4 progress report generator
│   └── aamalTrackerData.ts     # Muhasabah presets, CSV & JSON backup handlers
│
└── services/
    └── firebase.ts             # Firestore sync, OTP verification & guest management
```

This makes the project easy to maintain, test, and extend.

---

# 🔄 Zikir Data Flow

The Zikir system follows a predictable, unidirectional data flow:

```text
             User taps counter
                    │
                    ↓
             Counter Handler
                    │
                    ↓
             Update Zikir State
                    │
            ┌───────┴───────┐
            ↓               ↓
        Save Data       Recalculate
            │               │
            │               ↓
            │          Daily Progress
            │               │
            │               ↓
            │         Overall Total
            │
            ↓
       Persistent Storage (IndexedDB / LocalStorage / Cloud)
```

This makes counter behavior instantaneous, resilient against network failures, and 100% offline-ready.

---

# 💾 Persistence Architecture

Zikr+ is designed around **persistent user data**.

The application preserves:

```text
Zikir Counts
Zikir Targets
Daily Progress
Zikir History
Bookmarks
Quran Reading Position
Aamal Progress & Streaks
Theme (Day ☀️ / Night 🌙)
Language (English, বাংলা, اردو, हिन्दी)
Sound & Haptics Settings
```

User data is cached locally first (`IndexedDB` & `LocalStorage`), with automatic background synchronization to Firebase Firestore when signed in.

---

# 📅 Daily Data Model

A daily Zikir record conceptually looks like:

```json
{
  "date": "2026-10-03",
  "morning": {
    "morning-subhanallah": 37,
    "morning-alhamdulillah": 50
  },
  "evening": {
    "evening-la-hawla": 33
  }
}
```

This allows historical statistics to be built without mixing one day's progress with another.

---

# 🗂️ Structured Zikir Data

Zikir content is kept separate from UI components.

Example:

```javascript
{
  id: "morning-subhanallah",
  category: "morning",
  arabic: "سُبْحَانَ اللَّهِ",
  bengali: "সুবহানাল্লাহ",
  targetOptions: [100],
  defaultTarget: 100
}
```

Variable target:

```javascript
{
  id: "evening-la-hawla",
  category: "evening",
  arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
  bengali: "লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ",
  targetOptions: [33, 100],
  defaultTarget: 33
}
```

---

# 📖 Quran Experience

The Quran section is designed as a focused reading environment.

* Surah navigation (114 Surahs complete)
* Arabic Uthmani text with proper font rendering
* Verified Bengali, English, Urdu & Hindi translations
* Ayah-by-ayah navigation & audio recitations
* Real-time search by Surah name, number, or revelation type
* 30 Juz filtering
* Bookmarks & Favorites
* Automatic "Continue Reading" resume card

Arabic content is displayed using proper **RTL rendering** with large, elegant calligraphy.

---

# 📚 Kitab Library

The Kitab Library transforms Zikr+ into a broader Islamic knowledge platform.

Users can browse:

```text
📚 Aqeedah
📚 Fiqh
📚 Tafsir
📚 Hadith
📚 Seerah
📚 Islamic History
📚 Dua & Zikir
```

Integrated with in-app reading, table of contents navigation, and offline reading capability.

---

# 📜 Hadith

The Hadith module provides an organized reading and discovery experience.

```text
Sahih al-Bukhari
Sahih Muslim
Sunan Abi Dawud
Jami` at-Tirmidhi
Sunan an-Nasa'i
Sunan Ibn Majah
Muwatta Malik
Riyad as-Salihin
```

Features:
* Chapter-by-chapter categorization
* Arabic text, pronunciation, and full translation
* Grade verification (Sahih / Hasan / Da'if)
* One-click copying & sharing

---

# 🕌 Salat Time & Solar Science

The Salat module provides an accurate daily prayer schedule with astronomical solar trajectory.

```text
Fajr        (Dawn twilight)
Sunrise     (Shuruk)
Dhuhr       (Solar noon peak)
Asr         (Shadow elongation)
Maghrib     (Sunset twilight)
Isha        (Nightfall)
Tahajjud    (Last third of night)
```

Experience includes:
* Current active prayer & next prayer countdown (live seconds)
* Macro solar trajectory chart with altitude/azimuth angles
* Prohibited prayer times alerts (Sunrise, Noon Zenith, Sunset)
* GPS geolocation & offline worldwide city selection
* Dynamic Hijri calendar date synchronization

---

# 🤲 Dua

Zikr+ organizes authentic Duas from **Hisnul Muslim** into practical categories:

```text
Morning & Evening
Before Sleep & After Waking
During Salat & After Prayer
Protection & Istikhara
Illness & Forgiveness
Food & Travel
Daily Life
```

Each entry contains Arabic, transliteration, full translation, and hadith source references.

---

# 📋 Aamal Tracker (Muhasabah)

The Aamal Tracker provides a daily spiritual evaluation system:

```text
        TODAY'S AAMAL

✓ 5 Fard Prayers on time
✓ Quran Tilawat
✓ Morning & Evening Adhkar
✓ Tahajjud / Ishraq
✓ Reading Hadith
✓ Sadaqah (Charity)
✓ Istighfar & Darood
```

Users can evaluate their daily completion, view weekly/monthly streaks, and export reports in PDF or CSV formats.

---

# 🎨 Design System

Zikr+ follows a **calm Islamic modernism** design direction.

### Visual principles

* Minimal & distraction-free
* Deep Emerald Green (`#006747`, `#00875a`) & Medina Gold (`#f59e0b`)
* Warm Porcelain White in Day Mode & Deep Pine Slate in Night Mode
* Zero eye-strain dark mode
* Accessible touch targets (minimum 44px)
* Fluid micro-animations

### UI language

The interface harmoniously combines:

**Arabic + Bengali + English + Urdu + Hindi**

Arabic receives dedicated calligraphic typography and strict RTL layout handling.

---

# 🌐 Internationalization

The application supports seamless one-click language switching:

```text
English
বাংলা (Bengali)
العربية (Arabic)
اردو (Urdu)
हिन्दी (Hindi)
```

All translation keys are centrally maintained in `appTranslations.ts`.

---

# 📱 Responsive Architecture

Zikr+ uses a responsive-first philosophy.

```text
                             ZIKR+
                               │
       ┌───────────────────────┼───────────────────────┐
       ↓                       ↓                       ↓
     Mobile                 Tablet                  Desktop
       │                       │                       │
       ↓                       ↓                       ↓
 Single-column          Adaptive 2-column       Expanded multi-column
 Touch thumb cards       Balanced grid          Spacious reader layout
```

---

# 🌙 Theme System

Zikr+ supports a synchronized, instant theme toggle:

```text
                  Theme Provider
                        │
        ┌───────────────┴───────────────┐
        ↓                               ↓
   ☀️ Day Mode                     🌙 Night Mode
(Porcelain Mint & Emerald)       (Deep Pine Slate & Gold)
```

Theme changes persist across page reloads and device sessions.

---

# 📲 PWA & Offline Support

Zikr+ is a certified Progressive Web App.

* Service Worker caching for 100% offline availability
* Installable directly on Android, iOS, Windows, and macOS
* Maskable SVG icons and splash themes
* Standalone window display mode without browser address bars

---

# 🤖 Android Architecture

The responsive web/PWA experience can be packaged for Android directly:

```text
                  Zikr+ Web / PWA
                         │
                         ↓
                 Standalone PWA
                         │
                         ↓
            TWA / Bubblewrap / Capacitor
                         │
                         ↓
                   Android Studio
                   /            \
                  ↓              ↓
              Debug APK      Release AAB
```

A built-in standalone export guide is provided inside the application.

---

# 🧪 Quality & Testing Checklist

```text
✓ Individual counter increments instantaneously
✓ Counters remain strictly isolated
✓ Target changes smoothly (33 / 100 / custom)
✓ Sound synthesis & vibration haptics trigger reliably
✓ Reset affects only the active target
✓ Central total sums all counts accurately
✓ Progress bar reflects accurate daily achievement
✓ State persists across page reload & browser close
✓ Daily reset handles date rollover gracefully
✓ Firebase Firestore real-time cloud sync functions correctly
✓ 114 Surahs load cleanly with RTL font support
✓ PDF report compiles with table summaries
✓ Responsive across mobile, foldables, tablets & desktops
```

---

# 🛠️ Technology Stack

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS, Lucide Icons, Canvas Confetti
* **State & Persistence:** React Hooks, LocalStorage, IndexedDB
* **Backend & Cloud:** Firebase Firestore, Firebase Authentication
* **Document Engine:** html2pdf.js, html2canvas, jsPDF
* **PWA:** Service Worker Cache API, Web App Manifest

---

# 📂 Project Structure

```text
ZIKR+
│
├── Application Shell
│   ├── Header.tsx (Branding, Language & Quick Actions)
│   ├── BottomNav.tsx (Mobile Thumb Navigation)
│   ├── Theme Toggle (Day ☀️ / Night 🌙)
│   └── ProfileModal.tsx (Accounts, Security & Cloud Sync)
│
├── Worship Features
│   ├── Zikir (Multi-counter & Master Dial)
│   ├── Salat (Timetable & Solar Curve)
│   ├── Dua (Categorized Supplications)
│   └── Aamal Tracker (Muhasabah & Deeds Log)
│
├── Knowledge Features
│   ├── Quran (114 Surahs, Juz & Audio)
│   ├── Hadith (8 Canonical Collections)
│   └── Kitab Library (Classics & Study Guides)
│
└── Shared Services
    ├── Sound & Haptics Engine
    ├── PDF & CSV Export Utilities
    ├── Firebase Firestore Cloud Sync
    └── Standalone APK Packager
```

---

# 🎯 Product Vision

Zikr+ is not just another counter app.

It is designed as a **digital Islamic sanctuary** where technology stays quiet in the background and the user's worship, learning, and remembrance remain at the center.

> **Zikir → Remember**  
> **Quran → Read**  
> **Hadith → Learn**  
> **Salat → Pray**  
> **Dua → Ask**  
> **Aamal → Track**  
> **Kitab → Explore**

---

# 🌙 The Zikr+ Philosophy

> ### **Less distraction. More remembrance.**

The interface is intentionally peaceful.

It will never contain distracting ads, intrusive notifications, or clutter. Instead, it offers a serene, spiritually uplifting space for believers to return to every day.

---

# 📌 Project Highlights

```text
🌙 Modern Islamic UI
📿 Multi-Zikir Counter
🔵 Central Total Counter
🌅 Morning & Evening Adhkar
📊 Dynamic Daily Progress
📅 Persistent History & Streaks
📖 Complete 114 Surahs Quran
📚 Islamic Kitab Library
📜 8 Hadith Collections
🕌 Salat Times & Solar Trajectory
🤲 Authentic Hisnul Muslim Duas
📋 Daily Aamal Muhasabah
🌐 Multilingual (BN, AR, EN, UR, HI)
↔️ Proper Arabic RTL Calligraphy
💾 Offline-First + Firebase Cloud Sync
📱 Mobile, Tablet & Desktop Responsive
📲 PWA (Installable on iOS & Android)
🤖 Android APK Export Ready
```

---

# 🤝 Contributing

Contributions, feedback, and suggestions are welcome.

You can contribute through:
* Bug reports & feature suggestions
* Additional authentic Hadith or Dua collections
* Language translations
* UI/UX refinements

---

# ⭐ Support

If **Zikr+** brings peace to your daily worship and remembrance, consider giving the repository a ⭐ on GitHub.

---

# 📜 License

Released under the **MIT License**. Free and open for the Ummah.

---

# 🌙 Zikr+

### **Islamic Companion & Daily Worship Platform**

**Zikir • Quran • Kitab • Hadith • Salat • Dua • Aamal**

> **Remember. Reflect. Pray. Track. Grow.**

---

## 📌 GitHub About

**Description:**

> 🌙 Zikr+ — A modern Islamic Companion & Daily Worship platform featuring Zikir, Quran, Kitab Library, Hadith, Salat Times, Dua, Aamal Tracking, daily progress, history, multilingual Arabic/Bengali support, responsive PWA design, and Android compatibility.

**Topics:**

```text
zikrplus
zikr
islamic-app
islamic-companion
islamic
dhikr
tasbeeh
quran
hadith
dua
salat
prayer-times
aamal
kitab
islamic-books
bengali
arabic
rtl
pwa
android
react
typescript
```

**Tagline:**

> 🌙 **Zikr+ — A peaceful digital companion for remembrance, worship, learning, and daily Aamal.**
