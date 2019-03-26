import fs from 'fs';
import genDiff from '../src';

const PathToBefore = '__tests__/__fixtures__/before.json';
const PathToAfter = '__tests__/__fixtures__/after.json';
const expectedJson = fs.readFileSync('__tests__/__fixtures__/expectedJsonString.txt', 'utf-8');

describe('diff tests', () => {
  test('test', () => {
    expect(genDiff(PathToBefore, PathToAfter)).toEqual(expectedJson);
  });
});
