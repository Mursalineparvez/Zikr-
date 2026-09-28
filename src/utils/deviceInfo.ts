export interface DeviceInfo {
  model: string;
  osVersion: string;
  location: string;
  appVersion: string;
  deviceLanguage: string;
}

export function getDetectedDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      model: 'Android Phone',
      osVersion: '10',
      location: 'Asia/Dhaka (Network Timezone)',
      appVersion: 'ZikrMate v411_38.1',
      deviceLanguage: 'en',
    };
  }

  const ua = navigator.userAgent || '';
  let model = 'Android Phone';
  let osVersion = '10';
  const deviceLanguage = (navigator.language || 'en').split('-')[0];

  if (/Windows/i.test(ua)) {
    model = 'Windows PC';
    osVersion = '11_64';
  } else if (/Macintosh|MacIntel/i.test(ua)) {
    model = 'Apple Mac';
    osVersion = '14_1';
  } else if (/iPhone/i.test(ua)) {
    model = 'Apple iPhone';
    const iosMatch = ua.match(/OS\s+([0-9_]+)/i);
    if (iosMatch) osVersion = iosMatch[1].replace(/_/g, '.');
  } else if (/Android/i.test(ua)) {
    const androidMatch = ua.match(/Android\s+([0-9\._]+)/i);
    if (androidMatch) {
      osVersion = androidMatch[1].replace(/_/g, '.');
    }
    const modelMatch = ua.match(/;\s*([^;]+?)\s*Build/i);
    if (modelMatch && modelMatch[1]) {
      model = modelMatch[1].trim();
    } else if (/Samsung|SM-/i.test(ua)) {
      const smMatch = ua.match(/(SM-[A-Z0-9]+)/i);
      model = smMatch ? `Samsung ${smMatch[1]}` : 'Samsung Galaxy';
    } else if (/Xiaomi|Redmi|POCO/i.test(ua)) {
      model = 'Xiaomi Redmi';
    } else if (/vivo/i.test(ua)) {
      model = 'Vivo Phone';
    } else if (/OPPO|Realme/i.test(ua)) {
      model = 'Oppo / Realme Phone';
    } else {
      model = 'Android Phone';
    }
  } else if (/Linux/i.test(ua)) {
    model = 'Linux PC';
    osVersion = 'Ubuntu';
  }

  let location = 'Asia/Dhaka (Network Timezone)';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      location = `${tz} (Network Timezone)`;
    }
  } catch {}

  return {
    model,
    osVersion,
    location,
    appVersion: 'ZikrMate v411_38.1',
    deviceLanguage,
  };
}
