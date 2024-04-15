import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import getDiffTree from './getDiffTree.js';
import switchingFormat from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const getFilePath1 = path.resolve(filepath1);
  const getFilePath2 = path.resolve(filepath2);

  const getFileData1 = readFileSync(getFilePath1, 'utf-8');
  const getFileData2 = readFileSync(getFilePath2, 'utf-8');

  const formatOfFile1 = path.extname(filepath1).substring(1);
  const formatOfFile2 = path.extname(filepath2).substring(1);

  const dataOfFile1 = parseFile(getFileData1, formatOfFile1);
  const dataOfFile2 = parseFile(getFileData2, formatOfFile2);

  const tree = getDiffTree(dataOfFile1, dataOfFile2);
  const result = switchingFormat(tree, formatName);
  return result;
};

export default gendiff;
