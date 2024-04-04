import _ from 'lodash';

export default (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return {
        key,
        type: deleted,
        value: obj1[key],
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return {
        key,
        type: added,
        value: obj2[key],
      };
    }
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && obj1[key] !== obj2[key]) {
      return {
        key,
        type: changed,
        value1: obj1[key],
        value2: obj2[key],
      };
    }
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && obj1[key] === obj2[key]) {
      return {
        key,
        type: unchanged,
        value: obj1[key],
      };
    }
  });
  return result;
};
