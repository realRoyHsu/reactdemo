/**
 * 数组去重
 * @param {*} arr
 * @param {*} key
 */
export function arrayJsonRepeatFilter(arr, key) {
  const obj = {};
  return arr.reduce((total, item) => {
    // eslint-disable-next-line no-unused-expressions
    obj[item[key]] ? "" : (obj[item[key]] = true && total.push(item));
    return total;
  }, []);
}
