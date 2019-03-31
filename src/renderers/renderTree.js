import _ from 'lodash';

const addTabs = level => ' '.repeat(2 * level);

const makeValue = (data, level) => {
  if (!(data instanceof Object)) return data;
  const openTab = addTabs(level + 1);
  const closeTab = addTabs(level + 1);
  return `{\n  ${[...Object.keys(data)].map(key => `${openTab}${key}: ${data[key]}`)}\n${closeTab}}`;
};

const render = (ast) => {
  const iter = (data, level) => data.map((item) => {
    const tab = addTabs(level);
    const {
      key, value, valueBefore, valueAfter, children, type,
    } = item;
    const resultValue = makeValue(value, level);
    switch (type) {
      case 'added':
        return `${tab}+ ${key}: ${resultValue}`;
      case 'deleted':
        return `${tab}- ${key}: ${resultValue}`;
      case 'changed':
        return [`${tab}+ ${key}: ${makeValue(valueAfter, level + 1)}`, `${tab}- ${key}: ${makeValue(valueBefore, level + 1)}`];
      case 'unchanged':
        return `${tab}  ${key}: ${resultValue}`;
      case 'node':
        return `  ${tab}${key}: {\n${_.flatten(iter(children, level + 1)).join('\n')}\n${tab}  }`;
      default:
        throw new Error('Unknown type recieved');
    }
  });
  return `{\n${(_.flatten(iter(ast, 1))).join('\n')}\n}`;
};

export default render;
