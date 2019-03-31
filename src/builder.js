import _ from 'lodash';

const buildAst = (dataBefore, dataAfter) => {
  const keysBefore = _.keys(dataBefore);
  const keysAfter = _.keys(dataAfter);
  const keys = _.union(keysBefore, keysAfter);
  const result = keys.map((key) => {
    switch (true) {
      case (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])):
        return { key, children: buildAst(dataBefore[key], dataAfter[key]), type: 'node' };
      case (!_.has(dataBefore, key)):
        return { key, value: dataAfter[key], type: 'added' };
      case (!_.has(dataAfter, key)):
        return { key, value: dataBefore[key], type: 'deleted' };
      case (dataBefore[key] === dataAfter[key]):
        return { key, value: dataBefore[key], type: 'unchanged' };
      case (dataBefore[key] !== dataAfter[key]):
        return {
          key, valueBefore: dataBefore[key], valueAfter: dataAfter[key], type: 'changed',
        };
      default:
        throw new Error('Unknown condition!');
    }
  });
  return result;
};

export default buildAst;
