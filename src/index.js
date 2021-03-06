import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './builder';
import getRender from './renderers';


const getObject = (pathToFile) => {
  const ext = path.extname(pathToFile);
  return parse(ext, fs.readFileSync(pathToFile, 'utf8'));
};

const makeDiffs = (objectBefore, objectAfter) => buildAst(objectBefore, objectAfter);

const genDiff = (pathToFile1, pathToFile2, format = 'tree') => {
  const firstObject = getObject(pathToFile1);
  const secondObject = getObject(pathToFile2);
  const ast = makeDiffs(firstObject, secondObject);
  const render = getRender(format);
  const difference = render(ast);
  return difference;
};

export default genDiff;
