// Create Promise to wait for a specific time between min and max
exports.customWait = (min = 100, max = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.floor(Math.random() * (max - min + 1)) + min);
  });
};

// Fixed wait
exports.fixedWait = (time = 4000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
