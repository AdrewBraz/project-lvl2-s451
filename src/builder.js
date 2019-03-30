import _ from 'lodash';

const builder = (dataBefore, dataAfter) => {
  const keysBefore = _.keys(dataBefore);
  const keysAfter = _.keys(dataAfter);
  const keys = _.union(keysBefore, keysAfter);
  const result = keys.map((key) => {
    switch (true) {
      case (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])):
        return { key, children: builder(dataBefore[key], dataAfter[key]), type: 'node' };
      case (!_.has(dataBefore, key)):
        return { key, value: dataAfter[key], type: 'added' };
      case (!_.has(dataAfter, key)):
        return { key, value: dataBefore[key], type: 'deleted' };
      case (dataBefore[key] === dataAfter[key]):
        return { key, value: dataBefore[key], type: 'unchanged' };
      default:
        return { key, value: [dataBefore[key], dataAfter[key]], type: 'changed' };
    }
  });
  return result;
};

export default builder;
