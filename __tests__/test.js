import { readFileSync } from 'fs';
import genDiff from '../src';

const PathToBeforeJSON = '__tests__/__fixtures__/before.json';
const PathToAfterJSON = '__tests__/__fixtures__/after.json';
const PathToBeforeYml = '__tests__/__fixtures__/before.yml';
const PathToAfterYml = '__tests__/__fixtures__/after.yml';
const PathToBeforeIni = '__tests__/__fixtures__/before.ini';
const PathToAfterIni = '__tests__/__fixtures__/after.ini';
const PathToBeforeJSONTree = '__tests__/__fixtures__/beforeTree.json';
const PathToAfterJSONTree = '__tests__/__fixtures__/afterTree.json';


const PathToexpectedJson = '__tests__/__fixtures__/expectedJsonString.txt';
const PathToexpectedYml = '__tests__/__fixtures__/expectedYmlString.txt';
const PathToexpectedIni = '__tests__/__fixtures__/expectedIniString.txt';
const PathToexpectedTree = '__tests__/__fixtures__/expectedTree.txt';
const PathToexpectedPlain = '__tests__/__fixtures__/expectedPlainString.txt';


test.each([
  ['tree', PathToBeforeJSON, PathToAfterJSON, PathToexpectedJson],
  ['tree', PathToBeforeYml, PathToAfterYml, PathToexpectedYml],
  ['tree', PathToBeforeIni, PathToAfterIni, PathToexpectedIni],
  ['tree', PathToBeforeJSONTree, PathToAfterJSONTree, PathToexpectedTree],
  ['plain', PathToBeforeJSONTree, PathToAfterJSONTree, PathToexpectedPlain],
])(
  'diff test',
  (format, before, after, pathToExpected) => {
    const result = readFileSync(pathToExpected, 'utf8');
    expect(genDiff(before, after, format)).toEqual(result);
  },
);
