import renderTree from './renderTree';
import renderPlain from './renderPlain';
import renderJson from './renderJSON';

const renderFormats = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default format => renderFormats[format];
