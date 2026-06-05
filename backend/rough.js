const nums = [3, 7, 2, 9, 5];

const max = nums.reduce((a, b) => (a > b ? a : b));

console.log("Largest number:", max);