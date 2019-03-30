import _ from 'lodash';

const addTabs = level => ' '.repeat(2 * level);

const makeValue = (data, level) => {
  if (!(data instanceof Object)) return data;
  const openTab = addTabs(level + 1);
  const closTab = addTabs(level);
  return `{\n${[...Object.keys(data)].map(key => `${openTab}${key}: ${data[key]}`)}\n${closTab}}`;
};

const render = (ast) => {
  const iter = (data, level) => data.map((item) => {
    const tab = addTabs(level);
    const {
      key, value, children, type,
    } = item;
    const resultValue = makeValue(value, level);
    switch (type) {
      case 'added':
        return `${tab}+ ${key}: ${resultValue}`;
      case 'deleted':
        return `${tab}- ${key}: ${resultValue}`;
      case 'changed':
        return [`${tab}+ ${key}: ${makeValue(value[1], level + 1)}`, `${tab}- ${key}: ${makeValue(value[0], level + 1)}`];
      case 'unchanged':
        return `${tab}  ${key}: ${resultValue}`;
      case 'node':
        return `${tab}${key}: {\n${_.flatten(iter(children, level + 1)).join('\n')}\n${tab}}`;
      default:
        return null;
    }
  });
  return `{\n${(_.flatten(iter(ast, 1))).join('\n')}\n}`;
};

export default render;
