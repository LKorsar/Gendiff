import url from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect, describe } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Output = readFile('fileOutput_.txt');
const file2Output = readFile('fileOutput_yml.txt');
const file3Output = readFile('fileOutput_plain.txt');

const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';

const file3 = './__fixtures__/file1.yml';
const file4 = './__fixtures__/file2.yml';

describe('formatStylish(default)', () => {
  test('using json-files', () => {
    expect(gendiff(file1, file2)).toEqual(file1Output);
  });
  test('using yml-files', () => {
    expect(gendiff(file3, file4)).toEqual(file2Output);
  });
});

describe('formatPlain', () => {
  test('using json-files', () => {
    expect(gendiff(file1, file2, 'plain')).toEqual(file3Output);
  });
  test('using yml-files', () => {
    expect(gendiff(file3, file4, 'plain')).toEqual(file3Output);
  });
});
