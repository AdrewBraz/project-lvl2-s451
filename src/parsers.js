import yaml from 'js-yaml';

const formats = { '.json': JSON.parse, '.yml': yaml.safeLoad };

export default (ext, obj) => {
  const pickParser = formats[ext];
  return pickParser(obj);
};
