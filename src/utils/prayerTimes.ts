import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes, Madhab } from 'adhan';

export interface FardPrayerItem {
  id: string;
  name: string;
  arabic: string;
  startHMM: string;
  endHMM: string;
  timeRange: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isNext: boolean;
  hasInfo?: boolean;
  hasCaution?: boolean;
}

export interface NafalPrayerItem {
  id: string;
  name: string;
  arabic: string;
  startTime: string;
  endTime: string;
  iconType: 'tahajjud' | 'ishraq' | 'chast' | 'jawwal' | 'awwabin';
  description: string;
  info: string;
  rakats: string;
}

export interface ProhibitedPrayerItem {
  id: string;
  name: string;
  arabic: string;
  startTime: string;
  endTime: string;
  timeRange: string;
  iconType: 'sunrise' | 'noon' | 'sunset';
  reason: string;
}

export type SolarPhaseType =
  | 'dawn'
  | 'sunrise'
  | 'ishraq'
  | 'duha'
  | 'noon'
  | 'asr'
  | 'golden_hour'
  | 'sunset'
  | 'after_sunset'
  | 'night'
  | 'tahajjud';

export interface SolarDetails {
  isDaytime: boolean;
  sunProgressPercent: number; // 0 to 100 during daylight, or 0-100 for night progress
  nightProgressPercent: number;
  solarAltitudeDeg: number; // estimated altitude angle in degrees
  solarAzimuthDeg: number; // estimated azimuth in degrees
  solarPhase: SolarPhaseType;
  solarPhaseLabel: string;
  daylightTotalFormatted: string;
  daylightRemainingFormatted: string;
  nightTotalFormatted: string;
  nightRemainingFormatted: string;
  solarNoonTime: string;
  solarNoonDate: Date;
  sunriseTime: string;
  sunriseDate: Date;
  sunsetTime: string;
  sunsetRange: string;
  sunsetDate: Date;
}

export interface FormattedPrayerTimes {
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  sunsetRange: string; // e.g. "5:50 PM - 6:05 PM"
  isha: string;
  midnight: string;
  tahajjud: string;

  // Modern App Layout from User Screenshot
  fardPrayers: FardPrayerItem[];
  nafalPrayers: NafalPrayerItem[];
  prohibitedPrayers: ProhibitedPrayerItem[];
  withCaution: boolean;
  
  // Date objects for status calculation
  fajrDate: Date;
  sunriseDate: Date;
  dhuhrDate: Date;
  asrDate: Date;
  maghribDate: Date;
  ishaDate: Date;
  midnightDate: Date;
  tahajjudDate: Date;

  // Next prayer
  nextPrayerName: string;
  nextPrayerArabic: string;
  nextPrayerFormattedTime: string;
  nextPrayerDate: Date;
  timeRemainingFormatted: string;
  secondsRemaining: number;
  currentPrayerName: string;

  // Solar Arc & Trajectory
  solar: SolarDetails;
  isDaytime: boolean;
  sunProgressPercent: number;
  daylightRemainingFormatted: string;
  daylightTotalFormatted: string;

  // Qibla
  qiblaBearing: number;
  qiblaCardinal: string;
  kaabaDistanceKm: number;

  // Hijri
  hijriFormatted: string;
  gregorianFormatted: string;
}

export interface CityOption {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export const KAABA_LAT = 21.422487;
export const KAABA_LNG = 39.826206;

export const POPULAR_CITIES: CityOption[] = [
  { name: 'Makkah al-Mukarramah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262 },
  { name: 'Madinah al-Munawwarah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111 },
  { name: 'Jerusalem (Al-Quds)', country: 'Palestine', lat: 31.7683, lng: 35.2137 },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
  { name: 'Chittagong', country: 'Bangladesh', lat: 22.3569, lng: 91.7832 },
  { name: 'Sylhet', country: 'Bangladesh', lat: 24.8949, lng: 91.8687 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011 },
  { name: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587 },
  { name: 'Islamabad', country: 'Pakistan', lat: 33.6844, lng: 73.0479 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.139, lng: 101.6869 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'Birmingham', country: 'United Kingdom', lat: 52.4862, lng: -1.8904 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.006 },
  { name: 'Chicago', country: 'United States', lat: 41.8781, lng: -87.6298 },
  { name: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898 },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
];

export function formatTime12h(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatTimeHMM(date: Date): string {
  const h = date.getHours() % 12 || 12;
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

// Calculate Great Circle Distance in KM to Kaaba
export function calculateKaabaDistance(lat: number, lng: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((KAABA_LAT - lat) * Math.PI) / 180;
  const dLng = ((KAABA_LNG - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) *
      Math.cos((KAABA_LAT * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Calculate Qibla angle from location coordinates to Kaaba
export function calculateQiblaBearing(lat: number, lng: number): number {
  const kaabaLat = (KAABA_LAT * Math.PI) / 180;
  const kaabaLng = (KAABA_LNG * Math.PI) / 180;
  const userLat = (lat * Math.PI) / 180;
  const userLng = (lng * Math.PI) / 180;

  const y = Math.sin(kaabaLng - userLng);
  const x =
    Math.cos(userLat) * Math.tan(kaabaLat) -
    Math.sin(userLat) * Math.cos(kaabaLng - userLng);

  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  return Math.round((qibla + 360) % 360);
}

export function bearingToCardinal(bearing: number): string {
  const cardinals = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'
  ];
  const index = Math.round(bearing / 22.5) % 16;
  return cardinals[index];
}

export function getHijriDate(date: Date = new Date(), offsetDays: number = 0): string {
  const adjusted = new Date(date);
  adjusted.setDate(adjusted.getDate() + offsetDays);

  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formatter.format(adjusted) + ' AH';
  } catch {
    return '13 Rabi al-Awwal 1448 AH';
  }
}

export function calculatePrayerTimes(
  latitude: number = 23.8103,
  longitude: number = 90.4125,
  cityName: string = 'Dhaka',
  methodName: 'MuslimWorldLeague' | 'ISNA' | 'UmmAlQura' | 'Karachi' | 'Egyptian' = 'Karachi',
  isHanafi: boolean = true,
  hijriOffset: number = 0,
  withCaution: boolean = true,
  targetDate: Date = new Date()
): FormattedPrayerTimes {
  const coordinates = new Coordinates(latitude, longitude);
  const now = targetDate;

  let params;
  switch (methodName) {
    case 'ISNA':
      params = CalculationMethod.NorthAmerica();
      break;
    case 'UmmAlQura':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'Karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'Egyptian':
      params = CalculationMethod.Egyptian();
      break;
    default:
      params = CalculationMethod.MuslimWorldLeague();
  }

  if (isHanafi) {
    params.madhab = Madhab.Hanafi;
  } else {
    params.madhab = Madhab.Shafi;
  }

  const prayerTimes = new AdhanPrayerTimes(coordinates, now, params);

  const fajrStr = formatTime12h(prayerTimes.fajr);
  const sunriseStr = formatTime12h(prayerTimes.sunrise);
  const dhuhrStr = formatTime12h(prayerTimes.dhuhr);
  const asrStr = formatTime12h(prayerTimes.asr);
  const maghribStr = formatTime12h(prayerTimes.maghrib);
  const ishaStr = formatTime12h(prayerTimes.isha);

  // Sunset range (Maghrib start to +15 mins twilight period, as in photo 5:50 PM - 6:05 PM)
  const sunsetEndTime = new Date(prayerTimes.maghrib.getTime() + 15 * 60 * 1000);
  const sunsetRange = `${formatTime12h(prayerTimes.maghrib)} - ${formatTime12h(sunsetEndTime)}`;

  // Midnight & Tahajjud calculation
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowPrayers = new AdhanPrayerTimes(coordinates, tomorrow, params);
  const nightDurationMs = tomorrowPrayers.fajr.getTime() - prayerTimes.maghrib.getTime();
  const midnightDate = new Date(prayerTimes.maghrib.getTime() + nightDurationMs / 2);
  const tahajjudStartDate = new Date(prayerTimes.maghrib.getTime() + (nightDurationMs * 2) / 3);

  const midnightStr = formatTime12h(midnightDate);
  const tahajjudStr = formatTime12h(tahajjudStartDate);

  // Next prayer resolution
  const nextPrayer = prayerTimes.nextPrayer();
  let nextPrayerName = 'Fajr';
  let nextPrayerArabic = 'الفجر';
  let nextPrayerTime = prayerTimes.fajr;

  if (nextPrayer === 'fajr') {
    nextPrayerName = 'Fajr';
    nextPrayerArabic = 'الفجر';
    nextPrayerTime = prayerTimes.fajr;
  } else if (nextPrayer === 'sunrise') {
    nextPrayerName = 'Sunrise';
    nextPrayerArabic = 'الشروق';
    nextPrayerTime = prayerTimes.sunrise;
  } else if (nextPrayer === 'dhuhr') {
    nextPrayerName = 'Dhuhr';
    nextPrayerArabic = 'الظهر';
    nextPrayerTime = prayerTimes.dhuhr;
  } else if (nextPrayer === 'asr') {
    nextPrayerName = 'Asr';
    nextPrayerArabic = 'العصر';
    nextPrayerTime = prayerTimes.asr;
  } else if (nextPrayer === 'maghrib') {
    nextPrayerName = 'Maghrib';
    nextPrayerArabic = 'المغرب';
    nextPrayerTime = prayerTimes.maghrib;
  } else if (nextPrayer === 'isha') {
    nextPrayerName = 'Isha';
    nextPrayerArabic = 'العشاء';
    nextPrayerTime = prayerTimes.isha;
  } else {
    nextPrayerTime = tomorrowPrayers.fajr;
    nextPrayerName = 'Fajr';
    nextPrayerArabic = 'الفجر';
  }

  // Active / Current Prayer
  let currentPrayerName = 'Isha';
  if (now >= prayerTimes.fajr && now < prayerTimes.sunrise) {
    currentPrayerName = 'Fajr';
  } else if (now >= prayerTimes.sunrise && now < prayerTimes.dhuhr) {
    currentPrayerName = 'Duha';
  } else if (now >= prayerTimes.dhuhr && now < prayerTimes.asr) {
    currentPrayerName = 'Dhuhr';
  } else if (now >= prayerTimes.asr && now < prayerTimes.maghrib) {
    currentPrayerName = 'Asr';
  } else if (now >= prayerTimes.maghrib && now < prayerTimes.isha) {
    currentPrayerName = 'Maghrib';
  } else {
    currentPrayerName = 'Isha';
  }

  // 1. Faraj (Fardh) Prayers with Start and End window
  const fajrStartHMM = formatTimeHMM(prayerTimes.fajr);
  const fajrEndHMM = withCaution
    ? formatTimeHMM(new Date(prayerTimes.sunrise.getTime() - 2 * 60000))
    : formatTimeHMM(prayerTimes.sunrise);

  const dhuhrStartHMM = withCaution
    ? formatTimeHMM(new Date(prayerTimes.dhuhr.getTime() + 2 * 60000))
    : formatTimeHMM(prayerTimes.dhuhr);
  const dhuhrEndHMM = withCaution
    ? formatTimeHMM(new Date(prayerTimes.asr.getTime() - 1 * 60000))
    : formatTimeHMM(prayerTimes.asr);

  const asrStartHMM = withCaution
    ? formatTimeHMM(new Date(prayerTimes.asr.getTime() + 1 * 60000))
    : formatTimeHMM(prayerTimes.asr);
  const asrEndHMM = withCaution
    ? formatTimeHMM(new Date(prayerTimes.maghrib.getTime() - 3 * 60000))
    : formatTimeHMM(prayerTimes.maghrib);

  const maghribStartHMM = withCaution
    ? formatTimeHMM(new Date(prayerTimes.maghrib.getTime() + 2 * 60000))
    : formatTimeHMM(prayerTimes.maghrib);
  const maghribEndHMM = formatTimeHMM(prayerTimes.isha);

  const ishaStartHMM = withCaution
    ? formatTimeHMM(new Date(prayerTimes.isha.getTime() + 1 * 60000))
    : formatTimeHMM(prayerTimes.isha);
  const ishaEndHMM = withCaution
    ? formatTimeHMM(new Date(tomorrowPrayers.fajr.getTime() - 2 * 60000))
    : formatTimeHMM(tomorrowPrayers.fajr);

  const fardPrayers: FardPrayerItem[] = [
    {
      id: 'Fajr',
      name: 'Fajr',
      arabic: 'الفجر',
      startHMM: fajrStartHMM,
      endHMM: fajrEndHMM,
      timeRange: `${fajrStartHMM} - ${fajrEndHMM}`,
      startDate: prayerTimes.fajr,
      endDate: prayerTimes.sunrise,
      isActive: currentPrayerName === 'Fajr',
      isNext: nextPrayerName === 'Fajr',
      hasCaution: withCaution,
    },
    {
      id: 'Dhuhr',
      name: 'Dhuhr',
      arabic: 'الظهر',
      startHMM: dhuhrStartHMM,
      endHMM: dhuhrEndHMM,
      timeRange: `${dhuhrStartHMM} - ${dhuhrEndHMM}`,
      startDate: prayerTimes.dhuhr,
      endDate: prayerTimes.asr,
      isActive: currentPrayerName === 'Dhuhr',
      isNext: nextPrayerName === 'Dhuhr',
      hasCaution: withCaution,
    },
    {
      id: 'Asr',
      name: 'Asr',
      arabic: 'العصر',
      startHMM: asrStartHMM,
      endHMM: asrEndHMM,
      timeRange: `${asrStartHMM} - ${asrEndHMM}`,
      startDate: prayerTimes.asr,
      endDate: prayerTimes.maghrib,
      isActive: currentPrayerName === 'Asr',
      isNext: nextPrayerName === 'Asr',
      hasInfo: true,
    },
    {
      id: 'Maghrib',
      name: 'Magrib',
      arabic: 'المغرب',
      startHMM: maghribStartHMM,
      endHMM: maghribEndHMM,
      timeRange: `${maghribStartHMM} - ${maghribEndHMM}`,
      startDate: prayerTimes.maghrib,
      endDate: prayerTimes.isha,
      isActive: currentPrayerName === 'Maghrib',
      isNext: nextPrayerName === 'Maghrib',
      hasCaution: true,
    },
    {
      id: 'Isha',
      name: 'Isha',
      arabic: 'العشاء',
      startHMM: ishaStartHMM,
      endHMM: ishaEndHMM,
      timeRange: `${ishaStartHMM} - ${ishaEndHMM}`,
      startDate: prayerTimes.isha,
      endDate: tomorrowPrayers.fajr,
      isActive: currentPrayerName === 'Isha',
      isNext: nextPrayerName === 'Isha',
      hasCaution: withCaution,
    },
  ];

  // 2. Nafal Prayers (Tahajjud, Ishraq, Chast, Jawwal, Awwabin)
  const ishraqStartTime = formatTimeHMM(new Date(prayerTimes.sunrise.getTime() + 15 * 60000));
  const ishraqEndTime = formatTimeHMM(new Date(prayerTimes.dhuhr.getTime() - 7 * 60000));

  const chastStartTime = formatTimeHMM(
    new Date(prayerTimes.sunrise.getTime() + Math.round((prayerTimes.dhuhr.getTime() - prayerTimes.sunrise.getTime()) * 0.45))
  );
  const chastEndTime = formatTimeHMM(new Date(prayerTimes.dhuhr.getTime() - 7 * 60000));

  const nafalPrayers: NafalPrayerItem[] = [
    {
      id: 'tahajjud',
      name: 'Tahajjud',
      arabic: 'التهجد',
      startTime: '--:--',
      endTime: formatTimeHMM(prayerTimes.fajr),
      iconType: 'tahajjud',
      description: 'Performed in the last third of the night before Fajr',
      info: 'Voluntary night prayer with immense spiritual reward',
      rakats: '2 to 8+ Rakats',
    },
    {
      id: 'ishraq',
      name: 'Ishraq',
      arabic: 'الإشراق',
      startTime: ishraqStartTime,
      endTime: ishraqEndTime,
      iconType: 'ishraq',
      description: 'Performed ~15 minutes after sunrise until before noon',
      info: 'Equivalent reward of a complete Hajj and Umrah when done after Fajr remembrance',
      rakats: '2 to 4 Rakats',
    },
    {
      id: 'chast',
      name: 'Chast',
      arabic: 'صلاة الضحى',
      startTime: chastStartTime,
      endTime: chastEndTime,
      iconType: 'chast',
      description: 'Mid-morning Duha prayer before noon Zawal',
      info: 'Serves as charity (sadaqah) for all 360 joints of the body daily',
      rakats: '2, 4, or 8 Rakats',
    },
    {
      id: 'jawwal',
      name: 'Jawwal',
      arabic: 'الزوال',
      startTime: dhuhrStartHMM,
      endTime: '--:--',
      iconType: 'jawwal',
      description: 'Voluntary prayer after sun crosses the meridian',
      info: 'The gates of the heavens are opened at this hour',
      rakats: '2 to 4 Rakats',
    },
    {
      id: 'awwabin',
      name: 'Awwabin',
      arabic: 'الأوابين',
      startTime: formatTimeHMM(new Date(prayerTimes.maghrib.getTime() + 10 * 60000)),
      endTime: formatTimeHMM(prayerTimes.isha),
      iconType: 'awwabin',
      description: 'Performed between Maghrib and Isha prayers',
      info: 'Prayer of the oft-returning and penitent believers',
      rakats: '6 Rakats',
    },
  ];

  // 3. Prohibited Prayer Time (Sunrise, Noon, Sunset)
  const sunriseProhibitedStart = formatTimeHMM(prayerTimes.sunrise);
  const sunriseProhibitedEnd = formatTimeHMM(new Date(prayerTimes.sunrise.getTime() + 14 * 60000));

  const noonProhibitedStart = formatTimeHMM(new Date(prayerTimes.dhuhr.getTime() - 6 * 60000));
  const noonProhibitedEnd = formatTimeHMM(prayerTimes.dhuhr);

  const sunsetProhibitedStart = formatTimeHMM(new Date(prayerTimes.maghrib.getTime() - 15 * 60000));
  const sunsetProhibitedEnd = formatTimeHMM(prayerTimes.maghrib);

  const prohibitedPrayers: ProhibitedPrayerItem[] = [
    {
      id: 'sunrise',
      name: 'Sunrise',
      arabic: 'الشروق',
      startTime: sunriseProhibitedStart,
      endTime: sunriseProhibitedEnd,
      timeRange: `${sunriseProhibitedStart} - ${sunriseProhibitedEnd}`,
      iconType: 'sunrise',
      reason: 'From the beginning of sunrise until the sun has risen above a spear’s length (~15 mins). Any prayer is strictly prohibited.',
    },
    {
      id: 'noon',
      name: 'Noon',
      arabic: 'نصف النهار',
      startTime: noonProhibitedStart,
      endTime: noonProhibitedEnd,
      timeRange: `${noonProhibitedStart} - ${noonProhibitedEnd}`,
      iconType: 'noon',
      reason: 'When the sun is at its absolute zenith (meridian) until it begins to decline at Dhuhr (~5-10 mins). Haram to pray.',
    },
    {
      id: 'sunset',
      name: 'Sunset',
      arabic: 'الغروب',
      startTime: sunsetProhibitedStart,
      endTime: sunsetProhibitedEnd,
      timeRange: `${sunsetProhibitedStart} - ${sunsetProhibitedEnd}`,
      iconType: 'sunset',
      reason: 'When the sun becomes dull yellow/reddish before sinking until Maghrib (~15 mins). Haram to pray except current day\'s missed Asr.',
    },
  ];

  // Time remaining
  const diffMs = nextPrayerTime.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const timeRemainingFormatted =
    hours > 0
      ? `${hours}h ${minutes}m ${seconds}s`
      : `${minutes}m ${seconds}s`;

  // Solar Trajectory & Arc Calculations
  const sunriseMs = prayerTimes.sunrise.getTime();
  const sunsetMs = prayerTimes.maghrib.getTime();
  const dhuhrMs = prayerTimes.dhuhr.getTime();
  const nowMs = now.getTime();
  const isDaytime = nowMs >= sunriseMs && nowMs <= sunsetMs;

  const totalDaylightMs = Math.max(1, sunsetMs - sunriseMs);
  const totalDaylightHours = Math.floor(totalDaylightMs / 3600000);
  const totalDaylightMins = Math.floor((totalDaylightMs % 3600000) / 60000);
  const daylightTotalFormatted = `${totalDaylightHours}h ${totalDaylightMins}m`;

  let sunProgressPercent = 0;
  let daylightRemainingFormatted = '0m';

  if (nowMs < sunriseMs) {
    sunProgressPercent = 0;
    daylightRemainingFormatted = daylightTotalFormatted;
  } else if (nowMs > sunsetMs) {
    sunProgressPercent = 100;
    daylightRemainingFormatted = '0m (Night)';
  } else {
    sunProgressPercent = Math.min(100, Math.max(0, ((nowMs - sunriseMs) / totalDaylightMs) * 100));
    const remMs = sunsetMs - nowMs;
    const remHours = Math.floor(remMs / 3600000);
    const remMins = Math.floor((remMs % 3600000) / 60000);
    daylightRemainingFormatted = remHours > 0 ? `${remHours}h ${remMins}m` : `${remMins}m`;
  }

  // Night progress
  const nightTotalMs = Math.max(1, tomorrowPrayers.fajr.getTime() - prayerTimes.maghrib.getTime());
  const nightTotalHours = Math.floor(nightTotalMs / 3600000);
  const nightTotalMins = Math.floor((nightTotalMs % 3600000) / 60000);
  const nightTotalFormatted = `${nightTotalHours}h ${nightTotalMins}m`;

  let nightProgressPercent = 0;
  let nightRemainingFormatted = '0m';

  if (nowMs >= sunsetMs && nowMs <= tomorrowPrayers.fajr.getTime()) {
    const elapsedNight = nowMs - sunsetMs;
    nightProgressPercent = Math.min(100, Math.max(0, (elapsedNight / nightTotalMs) * 100));
    const remNightMs = Math.max(0, tomorrowPrayers.fajr.getTime() - nowMs);
    const remNHours = Math.floor(remNightMs / 3600000);
    const remNMins = Math.floor((remNightMs % 3600000) / 60000);
    nightRemainingFormatted = remNHours > 0 ? `${remNHours}h ${remNMins}m` : `${remNMins}m`;
  } else if (nowMs < sunriseMs) {
    // Early morning before sunrise (continuation from yesterday's night)
    nightProgressPercent = 85;
    const remNightMs = Math.max(0, prayerTimes.sunrise.getTime() - nowMs);
    const remNHours = Math.floor(remNightMs / 3600000);
    const remNMins = Math.floor((remNightMs % 3600000) / 60000);
    nightRemainingFormatted = remNHours > 0 ? `${remNHours}h ${remNMins}m` : `${remNMins}m`;
  }

  // Determine Current Solar Phase & Label
  let solarPhase: SolarPhaseType = 'after_sunset';
  let solarPhaseLabel = 'After Sunset';

  if (now < prayerTimes.fajr) {
    solarPhase = now >= tahajjudStartDate ? 'tahajjud' : 'night';
    solarPhaseLabel = now >= tahajjudStartDate ? 'Tahajjud Window' : 'Deep Night';
  } else if (now >= prayerTimes.fajr && now < prayerTimes.sunrise) {
    solarPhase = 'dawn';
    solarPhaseLabel = 'Dawn Twilight (Fajr)';
  } else if (now >= prayerTimes.sunrise && now < new Date(prayerTimes.sunrise.getTime() + 20 * 60000)) {
    solarPhase = 'sunrise';
    solarPhaseLabel = 'Sunrise Horizon';
  } else if (now >= new Date(prayerTimes.sunrise.getTime() + 20 * 60000) && now < new Date(prayerTimes.dhuhr.getTime() - 45 * 60000)) {
    solarPhase = 'ishraq';
    solarPhaseLabel = 'Morning (Ishraq / Duha)';
  } else if (now >= new Date(prayerTimes.dhuhr.getTime() - 45 * 60000) && now < new Date(prayerTimes.dhuhr.getTime() + 15 * 60000)) {
    solarPhase = 'noon';
    solarPhaseLabel = 'Solar Noon (Zawal)';
  } else if (now >= prayerTimes.dhuhr && now < prayerTimes.asr) {
    solarPhase = 'duha';
    solarPhaseLabel = 'Midday (Dhuhr)';
  } else if (now >= prayerTimes.asr && now < new Date(prayerTimes.maghrib.getTime() - 30 * 60000)) {
    solarPhase = 'asr';
    solarPhaseLabel = 'Afternoon (Asr)';
  } else if (now >= new Date(prayerTimes.maghrib.getTime() - 30 * 60000) && now < prayerTimes.maghrib) {
    solarPhase = 'golden_hour';
    solarPhaseLabel = 'Golden Hour (Pre-Sunset)';
  } else if (now >= prayerTimes.maghrib && now < new Date(prayerTimes.maghrib.getTime() + 25 * 60000)) {
    solarPhase = 'sunset';
    solarPhaseLabel = 'After Sunset';
  } else if (now >= new Date(prayerTimes.maghrib.getTime() + 25 * 60000) && now < prayerTimes.isha) {
    solarPhase = 'after_sunset';
    solarPhaseLabel = 'Dusk Twilight';
  } else {
    solarPhase = now >= tahajjudStartDate ? 'tahajjud' : 'night';
    solarPhaseLabel = now >= tahajjudStartDate ? 'Tahajjud Window' : 'Night Sky (Isha)';
  }

  // Approximate Solar Altitude Angle in degrees
  let solarAltitudeDeg = 0;
  if (isDaytime) {
    // Peak at solar noon (approx 65° to 85° depending on latitude)
    const midDayFraction = Math.sin((sunProgressPercent / 100) * Math.PI);
    const maxAltitude = Math.max(30, 90 - Math.abs(latitude));
    solarAltitudeDeg = Math.round(midDayFraction * maxAltitude * 10) / 10;
  } else {
    // Below horizon (-6° to -50°)
    solarAltitudeDeg = -Math.round((1 - Math.sin((nightProgressPercent / 100) * Math.PI)) * 40 * 10) / 10;
  }

  // Approximate Solar Azimuth Angle in degrees
  let solarAzimuthDeg = Math.round((90 + (sunProgressPercent / 100) * 180) % 360);

  const solar: SolarDetails = {
    isDaytime,
    sunProgressPercent,
    nightProgressPercent,
    solarAltitudeDeg,
    solarAzimuthDeg,
    solarPhase,
    solarPhaseLabel,
    daylightTotalFormatted,
    daylightRemainingFormatted,
    nightTotalFormatted,
    nightRemainingFormatted,
    solarNoonTime: formatTime12h(prayerTimes.dhuhr),
    solarNoonDate: prayerTimes.dhuhr,
    sunriseTime: formatTime12h(prayerTimes.sunrise),
    sunriseDate: prayerTimes.sunrise,
    sunsetTime: formatTime12h(prayerTimes.maghrib),
    sunsetRange,
    sunsetDate: prayerTimes.maghrib,
  };

  // Qibla calculations
  const qiblaBearing = calculateQiblaBearing(latitude, longitude);
  const qiblaCardinal = bearingToCardinal(qiblaBearing);
  const kaabaDistanceKm = calculateKaabaDistance(latitude, longitude);

  // Matched city object
  const cityObj = POPULAR_CITIES.find((c) => c.name === cityName);
  const country = cityObj ? cityObj.country : 'World';

  // Dates
  const gregorianFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const hijriFormatted = getHijriDate(now, hijriOffset);

  return {
    cityName,
    country,
    latitude,
    longitude,
    fajr: fajrStr,
    sunrise: sunriseStr,
    dhuhr: dhuhrStr,
    asr: asrStr,
    maghrib: maghribStr,
    sunsetRange,
    isha: ishaStr,
    midnight: midnightStr,
    tahajjud: tahajjudStr,
    fardPrayers,
    nafalPrayers,
    prohibitedPrayers,
    withCaution,
    fajrDate: prayerTimes.fajr,
    sunriseDate: prayerTimes.sunrise,
    dhuhrDate: prayerTimes.dhuhr,
    asrDate: prayerTimes.asr,
    maghribDate: prayerTimes.maghrib,
    ishaDate: prayerTimes.isha,
    midnightDate,
    tahajjudDate: tahajjudStartDate,
    nextPrayerName,
    nextPrayerArabic,
    nextPrayerFormattedTime: formatTime12h(nextPrayerTime),
    nextPrayerDate: nextPrayerTime,
    timeRemainingFormatted,
    secondsRemaining: totalSeconds,
    currentPrayerName,
    solar,
    isDaytime,
    sunProgressPercent,
    daylightRemainingFormatted,
    daylightTotalFormatted,
    qiblaBearing,
    qiblaCardinal,
    kaabaDistanceKm,
    hijriFormatted,
    gregorianFormatted,
  };
}
