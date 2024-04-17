import { readFileSync } from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import getDiffTree from './getDiffTree.js';
import switchingFormat from './formatters/index.js';

const gettingFileData = (filepath) => {
  const fullPathToFile = path.resolve(filepath);
  const file = readFileSync(fullPathToFile, 'utf-8');
  const fileFormat = path.extname(filepath).substring(1);
  const dataOfFile = parseFile(file, fileFormat);
  return dataOfFile;
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const dataOfFile1 = gettingFileData(filepath1);
  const dataOfFile2 = gettingFileData(filepath2);
  const tree = getDiffTree(dataOfFile1, dataOfFile2);
  const result = switchingFormat(tree, formatName);
  return result;
};

export default gendiff;
