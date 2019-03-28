import { readFileSync } from 'fs';
import genDiff from '../src';

const PathToBeforeJSON = '__tests__/__fixtures__/before.json';
const PathToAfterJSON = '__tests__/__fixtures__/after.json';
const PathToBeforeYml = '__tests__/__fixtures__/before.yml';
const PathToAfterYml = '__tests__/__fixtures__/after.yml';
const PathToBeforeIni = '__tests__/__fixtures__/before.ini';
const PathToAfterIni = '__tests__/__fixtures__/after.ini';

const PathToexpectedJson = '__tests__/__fixtures__/expectedJsonString.txt';
const PathToexpectedYml = '__tests__/__fixtures__/expectedYmlString.txt';
const PathToexpectedIni = '__tests__/__fixtures__/expectedIniString.txt';


test.each([
  [PathToBeforeJSON, PathToAfterJSON, PathToexpectedJson],
  [PathToBeforeYml, PathToAfterYml, PathToexpectedYml],
  [PathToBeforeIni, PathToAfterIni, PathToexpectedIni],
])(
  'diff test',
  (before, after, pathToExpected) => {
    const result = readFileSync(pathToExpected, 'utf8');
    expect(genDiff(before, after)).toEqual(result);
  },
);
