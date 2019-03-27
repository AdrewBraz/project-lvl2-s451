import fs from 'fs';
import genDiff from '../src';

const PathToBeforeJSON = '__tests__/__fixtures__/before.json';
const PathToAfterJSON = '__tests__/__fixtures__/after.json';
const PathToBeforeYml = '__tests__/__fixtures__/before.yml';
const PathToAfterYml = '__tests__/__fixtures__/after.yml';
const PathToBeforeIni = '__tests__/__fixtures__/before.ini';
const PathToAfterIni = '__tests__/__fixtures__/after.ini';

const expectedJson = fs.readFileSync('__tests__/__fixtures__/expectedJsonString.txt', 'utf-8');
const expectedYml = fs.readFileSync('__tests__/__fixtures__/expectedYmlString.txt', 'utf-8');
const expectedIni = fs.readFileSync('__tests__/__fixtures__/expectedIniString.txt', 'utf-8');


test.each([
  [PathToBeforeJSON, PathToAfterJSON, expectedJson],
  [PathToBeforeYml, PathToAfterYml, expectedYml],
  [PathToBeforeIni, PathToAfterIni, expectedIni],
])(
  'diff test',
  (before, after, result) => {
    expect(genDiff(before, after)).toEqual(result);
  },
);
