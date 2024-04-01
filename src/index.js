import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parse.js';
import compare from './compare.js';
import stringifyAndSort from './stringify.js';

const gendiff = (filepath1, filepath2) => {
  const obj1 = parseFile(readFileSync(path.resolve(filepath1)));
  const obj2 = parseFile(readFileSync(path.resolve(filepath2)));
  const obj3 = compare(obj1, obj2);
  const result = stringifyAndSort(obj3);
  console.log(result);
};

export default gendiff;
