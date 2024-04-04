import { fileURLToPath } from 'url';
import { dirname }, path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Output = readFile('fileOutput_.txt');

const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';

test('simple using', () => {
  expect(gendiff(file1, file2)).toEqual(file1Output);
});
