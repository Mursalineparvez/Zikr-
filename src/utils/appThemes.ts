import { AppTheme } from '../types';

export interface LightThemePalette {
  id: AppTheme;
  nameEn: string;
  nameBn: string;
  descEn: string;
  descBn: string;
  canvasBg: string;
  cardBg: string;
  softBg: string;
  border: string;
  primary: string;
  primaryDark: string;
  primaryMid: string;
  primaryLight: string;
  ink: string;
}

export const APP_LIGHT_THEMES: LightThemePalette[] = [
  {
    id: 'emerald',
    nameEn: 'Soft Emerald',
    nameBn: 'সফট এমেরাল্ড',
    descEn: 'Calm mint-green light canvas with classic emerald accents',
    descBn: 'শান্ত হালকা সবুজ ক্যানভাস ও এমেরাল্ড অ্যাকসেন্ট',
    canvasBg: '#f3faf6',
    cardBg: '#ffffff',
    softBg: '#e4f5ec',
    border: '#c7e6d6',
    primary: '#006A4E',
    primaryDark: '#00523c',
    primaryMid: '#059669',
    primaryLight: '#6ee7b7',
    ink: '#0d2e24',
  },
  {
    id: 'gold',
    nameEn: 'Ivory Gold',
    nameBn: 'আইভরি গোল্ড',
    descEn: 'Warm cream light surface with refined golden amber accents',
    descBn: 'উষ্ণ ক্রিম হালকা থিম ও সোনালি অ্যাকসেন্ট',
    canvasBg: '#fdf9ee',
    cardBg: '#ffffff',
    softBg: '#f9efcf',
    border: '#ebd8a4',
    primary: '#b47409',
    primaryDark: '#8f5a04',
    primaryMid: '#d99b0b',
    primaryLight: '#fde68a',
    ink: '#362407',
  },
  {
    id: 'sky',
    nameEn: 'Sky Ocean',
    nameBn: 'স্কাই ব্লু',
    descEn: 'Airy sky-blue light theme with crisp ocean accents',
    descBn: 'সতেজ হালকা আকাশী নীল থিম ও ওশান অ্যাকসেন্ট',
    canvasBg: '#f2f8fe',
    cardBg: '#ffffff',
    softBg: '#e0f0fe',
    border: '#bddcfb',
    primary: '#0369a1',
    primaryDark: '#075985',
    primaryMid: '#0284c7',
    primaryLight: '#7dd3fc',
    ink: '#0c2a42',
  },
  {
    id: 'violet',
    nameEn: 'Lavender Violet',
    nameBn: 'ল্যাভেন্ডার ভায়োলেট',
    descEn: 'Gentle pastel lavender surface with royal violet accents',
    descBn: 'নরম হালকা বেগুনি থিম ও ভায়োলেট অ্যাকসেন্ট',
    canvasBg: '#f7f4fe',
    cardBg: '#ffffff',
    softBg: '#ede5fe',
    border: '#d6c6fb',
    primary: '#6d28d9',
    primaryDark: '#5b21b6',
    primaryMid: '#7c3aed',
    primaryLight: '#c4b5fd',
    ink: '#28144d',
  },
  {
    id: 'rose',
    nameEn: 'Soft Rose',
    nameBn: 'সফট রোজ',
    descEn: 'Delicate blush-pink light canvas with warm rose accents',
    descBn: 'কোমল হালকা গোলাপি থিম ও রোজ অ্যাকসেন্ট',
    canvasBg: '#fef4f6',
    cardBg: '#ffffff',
    softBg: '#fce4ea',
    border: '#f6c3d0',
    primary: '#be123c',
    primaryDark: '#9f1239',
    primaryMid: '#e11d48',
    primaryLight: '#fda4af',
    ink: '#3f1021',
  },
  {
    id: 'teal',
    nameEn: 'Mint Teal',
    nameBn: 'মিন্ট টিল',
    descEn: 'Fresh light aqua canvas with serene teal accents',
    descBn: 'স্নিগ্ধ হালকা অ্যাকুয়া-টিল থিম ও মিন্ট অ্যাকসেন্ট',
    canvasBg: '#f1fbfa',
    cardBg: '#ffffff',
    softBg: '#ddf5f3',
    border: '#b8e6e2',
    primary: '#0f766e',
    primaryDark: '#115e59',
    primaryMid: '#0d9488',
    primaryLight: '#5eead4',
    ink: '#0c3330',
  },
];

export function getLightThemePalette(theme?: AppTheme): LightThemePalette {
  return APP_LIGHT_THEMES.find((t) => t.id === theme) || APP_LIGHT_THEMES[0];
}
