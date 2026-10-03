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
      model: 'Android Mobile Device',
      osVersion: 'Android 13 / 14',
      location: 'Asia/Dhaka (Network Timezone)',
      appVersion: 'Zikr+ v411_38.1',
      deviceLanguage: 'bn',
    };
  }

  const ua = navigator.userAgent || '';
  let model = 'Android Mobile Device';
  let osVersion = 'Android';
  const deviceLanguage = (navigator.language || 'bn').split('-')[0];

  if (/iPhone/i.test(ua)) {
    model = 'Apple iPhone';
    if (/iPhone11,/i.test(ua)) model = 'Apple iPhone 11';
    else if (/iPhone12,/i.test(ua)) model = 'Apple iPhone 12';
    else if (/iPhone13,/i.test(ua)) model = 'Apple iPhone 13';
    else if (/iPhone14,/i.test(ua)) model = 'Apple iPhone 14';
    else if (/iPhone15,/i.test(ua)) model = 'Apple iPhone 15';
    
    const iosMatch = ua.match(/OS\s+([0-9_]+)/i);
    if (iosMatch) osVersion = `iOS ${iosMatch[1].replace(/_/g, '.')}`;
  } else if (/iPad/i.test(ua)) {
    model = 'Apple iPad';
    const iosMatch = ua.match(/OS\s+([0-9_]+)/i);
    if (iosMatch) osVersion = `iPadOS ${iosMatch[1].replace(/_/g, '.')}`;
  } else if (/Android/i.test(ua)) {
    const androidMatch = ua.match(/Android\s+([0-9\._]+)/i);
    if (androidMatch) {
      osVersion = `Android ${androidMatch[1].replace(/_/g, '.')}`;
    } else {
      osVersion = 'Android OS';
    }

    // Try extracting exact model string
    const modelMatch = ua.match(/;\s*([^;]+?)\s*Build/i);
    if (modelMatch && modelMatch[1] && !modelMatch[1].toLowerCase().includes('k')) {
      model = modelMatch[1].trim();
    } else if (/SM-[A-Z0-9]+/i.test(ua)) {
      const sm = ua.match(/(SM-[A-Z0-9]+)/i);
      model = sm ? `Samsung ${sm[1]}` : 'Samsung Galaxy';
    } else if (/Samsung/i.test(ua)) {
      model = 'Samsung Galaxy Phone';
    } else if (/Redmi|POCO|Xiaomi|Mi\s+/i.test(ua)) {
      const miMatch = ua.match(/(Redmi\s*[\w\s]+|POCO\s*[\w\s]+|Mi\s*[\w\s]+)/i);
      model = miMatch ? miMatch[1].trim() : 'Xiaomi Redmi Phone';
    } else if (/vivo/i.test(ua)) {
      const vivoMatch = ua.match(/(vivo\s*[\w\s]+)/i);
      model = vivoMatch ? vivoMatch[1].trim() : 'Vivo Smartphone';
    } else if (/OPPO/i.test(ua)) {
      model = 'OPPO Smartphone';
    } else if (/Realme/i.test(ua)) {
      model = 'Realme Smartphone';
    } else if (/OnePlus/i.test(ua)) {
      model = 'OnePlus Smartphone';
    } else if (/Pixel/i.test(ua)) {
      model = 'Google Pixel Phone';
    } else if (/Infinix/i.test(ua)) {
      model = 'Infinix Phone';
    } else if (/TECNO/i.test(ua)) {
      model = 'Tecno Mobile';
    } else {
      model = 'Android Phone';
    }
  } else if (/Windows/i.test(ua)) {
    model = 'Windows Laptop / PC';
    osVersion = 'Windows 11/10';
  } else if (/Macintosh|MacIntel/i.test(ua)) {
    model = 'Apple MacBook / Mac';
    osVersion = 'macOS';
  } else if (/Linux/i.test(ua)) {
    model = 'Linux Workstation';
    osVersion = 'Linux Desktop';
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
    appVersion: 'Zikr+ v411_38.1',
    deviceLanguage,
  };
}
