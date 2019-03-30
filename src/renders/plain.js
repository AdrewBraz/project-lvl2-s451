const makeValue = data => (data instanceof Object ? '[complex value]' : data);

const render = (ast) => {
  const iter = (data, pathTo) => data.map((item) => {
    const {
      key, value, type, children,
    } = item;
    switch (type) {
      case 'added':
        return `Property  ${pathTo}${key} was added with value: ${makeValue(value)}`;
      case 'deleted':
        return `Property  ${pathTo}${key} was removed`;
      case 'changed':
        return `Property  ${pathTo}${key} was updated. From ${makeValue(value[0])} to ${makeValue(value[1])}`;
      case 'unchanged':
        return null;
      case 'node':
        return `${iter(children, `${pathTo}${key}.`).filter(node => node).join('\n')}`;
      default:
        return null;
    }
  });
  return iter(ast, '').join('\n');
};

export default render;
