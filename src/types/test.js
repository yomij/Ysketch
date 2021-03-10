/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var removeDuplicates = function (S) {
  const stack = [];
  for (let i = 0; i < S.length; i++) {
    if (stack.length > 0 && stack[stack.length - 1] == S[i]) {
      stack.pop();
    } else {
      stack.push(S[i]);
    }
  }
  return stack.join('');
};

console.log(removeDuplicates('asdasssssa'));
