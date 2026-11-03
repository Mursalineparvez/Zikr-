// Script to generate comprehensive 260+ topic dataset matching MessageBD categorization with authentic Quran Ayahs & Hadiths
import * as fs from 'fs';

interface TopicRaw {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  categoryBn: string; // আকীদা ও ঈমান, ইবাদত ও সালাত, আম্বিয়া ও রাসুল, আখিরাত ও পরকাল, পরিবার ও সমাজ, শরীয়ত ও বিধিবিধান, ইতিহাস ও জাতিসমূহ, চরিত্র ও নীতি
  icon: string;
  colorTheme: 'emerald' | 'amber' | 'blue' | 'rose' | 'purple' | 'teal' | 'indigo' | 'cyan';
  badgeBn: string;
  badgeEn: string;
  descriptionBn: string;
  descriptionEn: string;
  ayahs: Array<{
    id: string;
    surahNumber: number;
    ayahNumber: number;
    globalNumber: number;
    surahNameBn: string;
    surahNameAr: string;
    surahNameEn: string;
    arabic: string;
    translationBn: string;
    translationEn: string;
    transliterationBn: string;
    themeNoteBn: string;
    themeNoteEn: string;
  }>;
  hadiths: Array<{
    id: string;
    narratorBn: string;
    narratorEn: string;
    arabic?: string;
    translationBn: string;
    translationEn: string;
    referenceBn: string;
    referenceEn: string;
  }>;
}

console.log('Generating topics data...');
