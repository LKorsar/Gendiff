import getPlainFormat from './plain.js';
import getStylishFormat from './stylish.js';

const switchingFormat = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return getStylishFormat(tree);
    case 'plain':
      return getPlainFormat(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error('Unknown output format');
  }
};

export default switchingFormat;
