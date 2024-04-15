import getPlainFormat from './plain.js';
import getStylishFormat from './stylish.js';

const switchingFormat = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return getStylishFormat(tree);
    case 'plain':
      return getPlainFormat(tree);
    default:
      throw new Error('Unknown output format');
  }
};

export default switchingFormat;
