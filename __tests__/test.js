import fs from 'fs';
import genDiff from '../src';

const PathToBeforeJSON = '__tests__/__fixtures__/before.json';
const PathToAfterJSON = '__tests__/__fixtures__/after.json';
const PathToBeforeYml = '__tests__/__fixtures__/before.yml';
const PathToAfterYml = '__tests__/__fixtures__/after.yml';

const expectedJson = fs.readFileSync('__tests__/__fixtures__/expectedJsonString.txt', 'utf-8');
const expectedYml = fs.readFileSync('__tests__/__fixtures__/expectedYmlString.txt', 'utf-8');


describe('diff tests', () => {
  test('test JSON', () => {
    expect(genDiff(PathToBeforeJSON, PathToAfterJSON)).toEqual(expectedJson);
  });
  test('test Yml', () => {
    expect(genDiff(PathToBeforeYml, PathToAfterYml)).toEqual(expectedYml);
  });
});
