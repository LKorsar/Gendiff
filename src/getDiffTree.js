import _ from 'lodash';

const getDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: getDiffTree(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'changed',
        value1: obj1[key],
        value2: obj2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
  return result;
};

export default getDiffTree;
