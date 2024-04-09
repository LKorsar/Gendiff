export default (tree) => {
  const result = tree.map((item) => {
    if (item.type === 'added') {
      return `  + ${item.key}: ${item.value}`;
    }
    if (item.type === 'deleted') {
      return `  - ${item.key}: ${item.value}`;
    }
    if (item.type === 'changed') {
      return `  - ${item.key}: ${item.value1}\n  + ${item.key}: ${item.value2}`;
    }
    if (item.type === 'unchanged') {
      return `    ${item.key}: ${item.value}`;
    }
    return `    ${item.key}: ${item.value}`;
  });
  const str = result.join('\n');
  return `{\n${str}\n}`;
};
