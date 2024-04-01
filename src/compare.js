import _ from 'lodash';

export default (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2));
    const newObj = {};
    for (const key of keys) {
      if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && obj1[key] === obj2[key]) {
        newObj[key] = value1;
      }
      if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
        newObj[key] = 'deleted';
      }
      if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        newObj[key] = 'added';
      } if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && obj1[key] !== obj2[key]) {
        newObj[key] = 'changed';
      }
    }
    return newObj;
};
