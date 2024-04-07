import YAML from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return YAML.safeLoad(data);
    case 'yaml':
      return YAML.safeLoad(data);
    default:
      throw new Error(`'Unknown format! ${format}'`);
  }
};
