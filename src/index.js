import fs from 'fs';
import path from 'path';
import parse from './parsers';
import builder from './builder';
import render from './render';

const getObject = (pathToFile) => {
  const ext = path.extname(pathToFile);
  return parse(ext, fs.readFileSync(pathToFile, 'utf8'));
};

const makeDiffs = (objectBefore, objectAfter) => builder(objectBefore, objectAfter);

const genDiff = (pathToFile1, pathToFile2) => {
  const firstObject = getObject(pathToFile1);
  const secondObject = getObject(pathToFile2);
  const ast = makeDiffs(firstObject, secondObject);
  const difference = render(ast);
  return difference;
};

export default genDiff;
