import yaml from 'js-yaml';

const formats = { '.json': JSON.parse, '.yml': yaml.safeLoad };

export default (ext, obj) => {
  const getParser = formats[ext];
  return getParser(obj);
};
