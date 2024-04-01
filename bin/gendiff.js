#!/usr/bin node
import { program } from 'commander';
import { readFileSync } from 'fs';
import process from 'process';
import path from 'path';
import parseFile from '../src/index.js';
import compare from '../src/compare.js';
import stringifyAndSort from '../src/stringify.js';

const gendiff = (filepath1, filepath2) => {
  const obj1 = parseFile(readFileSync(path.resolve(filepath1)));
  const obj2 = parseFile(readFileSync(path.resolve(filepath2)));
  const obj3 = compare(obj1, obj2);
  const result = stringifyAndSort(obj3);
  console.log(result);
}

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .option('-h, --help', 'output usage information')
  .argument('<filepath1>')
  .argument('<filepath2>');

program.command('gendiff')  
  .action((filepath1, filepath2, options) => {
    gendiff(filepath1, filepath2);
  });

program.parse();

export default gendiff;