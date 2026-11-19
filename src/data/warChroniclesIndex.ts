import { BADR_77_PHASES, BADR_77_EVENTS } from './badr77EventsData';
import { PROPHETIC_WAR_CHRONICLES } from './warChroniclesProphetic';
import { RASHIDUN_WAR_CHRONICLES } from './warChroniclesRashidun';
import { LATER_ERA_WAR_CHRONICLES } from './warChroniclesLaterEras';
import {
  WarChronicleBundle,
  WarChronicleEvent,
  WarChroniclePhase,
} from './warChroniclesTypes';

export type { WarChronicleBundle, WarChronicleEvent, WarChroniclePhase };

const BADR_CHRONICLE_BUNDLE: WarChronicleBundle = {
  warId: 'badr',
  headerMetaBn: 'দ্বিতীয় হিজরির রমজান · বদর প্রান্তর, মদিনার দক্ষিণ-পশ্চিমে · ৭ পর্ব · মোট ৭৭ ঘটনা',
  headerMetaEn: 'Ramadan 2 AH · Valley of Badr, SW of Madinah · 7 Phases · 77 Events',
  titleBn: 'বদর যুদ্ধ, ৭ পর্বে — পূর্ণাঙ্গ ৭৭টি প্রামাণ্য ঘটনা',
  titleEn: 'Battle of Badr in 7 Phases — All 77 Documented Events',
  subtitleBn:
    'প্রতিটি ঘটনার সাথে পবিত্র কুরআন, সহীহ হাদিস বা সীরাতে ইবনে হিশামের সুনির্দিষ্ট সূত্র যুক্ত আছে।',
  subtitleEn:
    'Every event includes verified references from the Holy Quran, Sahih Hadith, or Sirah Ibn Hisham.',
  phases: BADR_77_PHASES,
  events: BADR_77_EVENTS,
};

export const ALL_WAR_CHRONICLES: Record<string, WarChronicleBundle> = {
  badr: BADR_CHRONICLE_BUNDLE,
  ...PROPHETIC_WAR_CHRONICLES,
  ...RASHIDUN_WAR_CHRONICLES,
  ...LATER_ERA_WAR_CHRONICLES,
};

export function getWarChronicle(warId: string): WarChronicleBundle | null {
  return ALL_WAR_CHRONICLES[warId] || null;
}
