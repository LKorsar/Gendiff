import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parse.js';
import getDiffTree from './getDiffTree.js';
import getDiffInformation from './stringify.js';

const gendiff = (filepath1, filepath2) => {
  const getFilePath1 = path.resolve(filepath1);
  const getFilePath2 = path.resolve(filepath2);

  const getFileData1 = readFileSync(getFilePath1);
  const getFileData2 = readFileSync(getFilePath2);

  const obj1 = parseFile(getFileData1);
  const obj2 = parseFile(getFileData2);

  const tree = getDiffTree(obj1, obj2);
  const result = getDiffInformation(tree);
  console.log(result);
};

export default gendiff;
