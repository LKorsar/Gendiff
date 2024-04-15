import _ from 'lodash';

const spacesCountOnLevel = 4;
const replacer = ' ';

const getIndentSize = (depth) => {
  const leftShift = 2;
  const indentSize = depth * spacesCountOnLevel - leftShift;
  return replacer.repeat(indentSize);
};

const getIndentSizeIfUnchanged = (depth) => {
  const indentSize = depth * spacesCountOnLevel;
  return replacer.repeat(indentSize);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(([key, value]) => `${getIndentSizeIfUnchanged(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${getIndentSizeIfUnchanged(depth)}}`;
};

const iter = (diff, depth = 1) => diff.map((node) => {
  switch (node.type) {
    case 'added':
      return `${getIndentSize(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed': {
      return `${getIndentSize(depth)}- ${node.key}: ${stringify(node.value1, depth)}\n${getIndentSize(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
    }
    case 'deleted':
      return `${getIndentSize(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'unchanged':
      return `${getIndentSizeIfUnchanged(depth)}${node.key}: ${stringify(node.value, depth)}`;
    case 'nested': {
      const childrenLines = iter(node.children, depth + 1);
      return `${getIndentSizeIfUnchanged(depth)}${node.key}: {\n${childrenLines.join('\n')}\n${getIndentSizeIfUnchanged(depth)}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'!`);
  }
});

const getStylishFormat = (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};

export default getStylishFormat;
