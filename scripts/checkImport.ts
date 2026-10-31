import fs from 'fs';
import path from 'path';

// Let's import the current database to get the structure and IDs
import { SAHABA_CATEGORIES, SahabaItem } from '../src/data/sahabaData';

console.log('Categories:', SAHABA_CATEGORIES.length);
