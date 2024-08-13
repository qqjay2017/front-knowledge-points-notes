var countTarget1 = function (scores, target) {
  return scores.reduce((memo, cur) => {
    if (cur === target) {
      memo += 1;
    }
    return memo;
  }, 0);
};
