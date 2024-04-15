import _ from 'lodash';

const getPathToKey = (node, currentPath) => {
  if (currentPath !== '') {
    return `${currentPath}.${node.key}`;
  }
  return `${node.key}`;
};

const stringify = (val) => {
  let currentValue;
  if (!_.isObject(val) && typeof val !== 'boolean' && val !== null) {
    currentValue = `'${val}'`;
    return currentValue;
  }
  if (_.isObject(val)) {
    currentValue = '[complex value]';
    return currentValue;
  }
  currentValue = `${val}`;
  return val;
};

const iter = (diff, path) => diff
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const currentPath = getPathToKey(node, path);
    switch (node.type) {
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'nested':
        return iter(node.children, currentPath).join('\n');
      default:
        return null;
    }
  });

const getPlainFormat = (tree) => {
  const result = iter(tree, '');
  return result.join('\n');
};

export default getPlainFormat;
