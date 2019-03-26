import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';

const getObject = (pathToFile) => {
  const ext = path.extname(pathToFile);
  return parse(ext, fs.readFileSync(pathToFile, 'utf8'));
};

const makeDiffs = (objectBefore, objectAfter) => {
  const keysBefore = _.keys(objectBefore);
  const keysAfter = _.keys(objectAfter);
  const mitualKeys = _.union(keysBefore, keysAfter);
  const mapped = mitualKeys.map((key) => {
    if (objectBefore[key] === objectAfter[key]) {
      return `    ${key}: ${objectBefore[key]}`;
    }
    if (keysBefore.includes(key)) {
      if (keysAfter.includes(key)) {
        return `  + ${key}: ${objectAfter[key]}\n  - ${key}: ${objectBefore[key]}`;
      }
      return `  - ${key}: ${objectBefore[key]}`;
    }
    return `  + ${key}: ${objectAfter[key]}`;
  });
  return `{\n${mapped.join('\n')}\n}`;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const firstObject = getObject(pathToFile1);
  const secondObject = getObject(pathToFile2);
  const difference = makeDiffs(firstObject, secondObject);
  return difference;
};

export default genDiff;