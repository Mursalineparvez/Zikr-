export interface WarChroniclePhase {
  phaseNo: number;
  labelBn: string;
  labelEn: string;
  titleBn: string;
  titleEn: string;
  eventCount: number;
}

export interface WarChronicleEvent {
  eventNo: number;
  codeBn: string;
  phaseNo: number;
  phaseTagBn: string;
  phaseTagEn: string;
  titleBn: string;
  titleEn: string;
  subtitleBn?: string;
  subtitleEn?: string;
  pointsBn: string[];
  pointsEn: string[];
  sourceBn: string;
  sourceEn: string;
}

export interface WarChronicleBundle {
  warId: string;
  headerMetaBn: string;
  headerMetaEn: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  phases: WarChroniclePhase[];
  events: WarChronicleEvent[];
}

export function toBnDigits2(n: number): string {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n)
    .padStart(2, '0')
    .replace(/\d/g, (d) => bn[Number(d)]);
}

export function buildWarBundle(config: {
  warId: string;
  datePlaceBn: string;
  datePlaceEn: string;
  battleShortBn: string;
  battleShortEn: string;
  subtitleBn?: string;
  subtitleEn?: string;
  phases: Array<{
    phaseNo: number;
    titleBn: string;
    titleEn: string;
    events: Array<{
      titleBn: string;
      titleEn: string;
      subtitleBn?: string;
      subtitleEn?: string;
      pointsBn: string[];
      pointsEn: string[];
      sourceBn: string;
      sourceEn: string;
    }>;
  }>;
}): WarChronicleBundle {
  const totalEvents = config.phases.reduce((sum, p) => sum + p.events.length, 0);
  const totalBn = toBnDigits2(totalEvents).replace(/^০(?=\d{2})/, '');
  const bnDigits = (n: number) =>
    String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

  const phasesMeta: WarChroniclePhase[] = config.phases.map((p) => ({
    phaseNo: p.phaseNo,
    labelBn: `পর্ব ${bnDigits(p.phaseNo)}`,
    labelEn: `Phase ${p.phaseNo}`,
    titleBn: p.titleBn,
    titleEn: p.titleEn,
    eventCount: p.events.length,
  }));

  let counter = 0;
  const flatEvents: WarChronicleEvent[] = [];

  for (const p of config.phases) {
    const phaseTagBn = `পর্ব ${bnDigits(p.phaseNo)} · ${p.titleBn}`;
    const phaseTagEn = `Phase ${p.phaseNo} · ${p.titleEn}`;
    for (const ev of p.events) {
      counter += 1;
      flatEvents.push({
        eventNo: counter,
        codeBn: `${toBnDigits2(counter)} / ${bnDigits(totalEvents)}`,
        phaseNo: p.phaseNo,
        phaseTagBn,
        phaseTagEn,
        titleBn: ev.titleBn,
        titleEn: ev.titleEn,
        subtitleBn: ev.subtitleBn,
        subtitleEn: ev.subtitleEn,
        pointsBn: ev.pointsBn,
        pointsEn: ev.pointsEn,
        sourceBn: ev.sourceBn,
        sourceEn: ev.sourceEn,
      });
    }
  }

  return {
    warId: config.warId,
    headerMetaBn: `${config.datePlaceBn} · ${bnDigits(config.phases.length)} পর্ব · মোট ${totalBn} ঘটনা`,
    headerMetaEn: `${config.datePlaceEn} · ${config.phases.length} Phases · ${totalEvents} Events`,
    titleBn: `${config.battleShortBn}, ${bnDigits(config.phases.length)} পর্বে — পূর্ণাঙ্গ ${bnDigits(totalEvents)}টি প্রামাণ্য ঘটনা`,
    titleEn: `${config.battleShortEn} in ${config.phases.length} Phases — ${totalEvents} Documented Events`,
    subtitleBn:
      config.subtitleBn ||
      'প্রতিটি ঘটনার সাথে পবিত্র কুরআন, সহীহ হাদিস বা প্রামাণ্য ইতিহাস গ্রন্থের সুনির্দিষ্ট সূত্র যুক্ত আছে।',
    subtitleEn:
      config.subtitleEn ||
      'Every event includes verified references from the Holy Quran, Sahih Hadith, or authoritative classical chronicles.',
    phases: phasesMeta,
    events: flatEvents,
  };
}
