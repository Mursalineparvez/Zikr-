/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PROPHETS_25_PART_1 } from './prophets25DataPart1';
import { PROPHETS_25_PART_2 } from './prophets25DataPart2';
import { Prophet25Item, Prophet25FilterKey, PROPHETS_25_FILTERS } from './prophets25Types';

export type { Prophet25Item, Prophet25FilterKey, Prophet25Dua, Prophet25Event, Prophet25FilterMeta } from './prophets25Types';
export { PROPHETS_25_FILTERS };

export const PROPHETS_25_DATABASE: Prophet25Item[] = [
  ...PROPHETS_25_PART_1,
  ...PROPHETS_25_PART_2,
];

export const ULUL_AZM_COUNT = PROPHETS_25_DATABASE.filter((p) => p.isUlulAzm).length;
export const SCRIPTURE_BEARERS_COUNT = PROPHETS_25_DATABASE.filter((p) => Boolean(p.scriptureBn)).length;
export const ARAB_PROPHETS_COUNT = PROPHETS_25_DATABASE.filter((p) => Boolean(p.isArabProphet)).length;
