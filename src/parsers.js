import yaml from 'js-yaml';
import ini from 'ini';

const formats = { '.json': JSON.parse, '.yml': yaml.safeLoad, '.ini': ini.parse };

export default (ext, data) => {
  const parser = formats[ext];
  return parser(data);
};
