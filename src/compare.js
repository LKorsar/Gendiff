import _ from 'lodash';

export default (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const coll = [];
  for (const key of keys) {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && obj1[key] === obj2[key]) {
      coll.push(`   ${key}: ${obj1[key]}`);
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      coll.push(` - ${key}: ${obj1[key]}`);
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      coll.push(` + ${key}: ${obj2[key]}`);
    } 
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && obj1[key] !== obj2[key]) {
      coll.push(` - ${key}: ${obj1[key]}`);
      coll.push(` + ${key}: ${obj2[key]}`)
    }
  }
  return coll;
};
