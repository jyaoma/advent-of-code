const input = [
  3, 1, 5, 4, 4, 4, 5, 3, 4, 4, 1, 4, 2, 3, 1, 3, 3, 2, 3, 2, 5, 1, 1, 4, 4, 3,
  2, 4, 2, 4, 1, 5, 3, 3, 2, 2, 2, 5, 5, 1, 3, 4, 5, 1, 5, 5, 1, 1, 1, 4, 3, 2,
  3, 3, 3, 4, 4, 4, 5, 5, 1, 3, 3, 5, 4, 5, 5, 5, 1, 1, 2, 4, 3, 4, 5, 4, 5, 2,
  2, 3, 5, 2, 1, 2, 4, 3, 5, 1, 3, 1, 4, 4, 1, 3, 2, 3, 2, 4, 5, 2, 4, 1, 4, 3,
  1, 3, 1, 5, 1, 3, 5, 4, 3, 1, 5, 3, 3, 5, 4, 2, 3, 4, 1, 2, 1, 1, 4, 4, 4, 3,
  1, 1, 1, 1, 1, 4, 2, 5, 1, 1, 2, 1, 5, 3, 4, 1, 5, 4, 1, 3, 3, 1, 4, 4, 5, 3,
  1, 1, 3, 3, 3, 1, 1, 5, 4, 2, 5, 1, 1, 5, 5, 1, 4, 2, 2, 5, 3, 1, 1, 3, 3, 5,
  3, 3, 2, 4, 3, 2, 5, 2, 5, 4, 5, 4, 3, 2, 4, 3, 5, 1, 2, 2, 4, 3, 1, 5, 5, 1,
  3, 1, 3, 2, 2, 4, 5, 4, 2, 3, 2, 3, 4, 1, 3, 4, 2, 5, 4, 4, 2, 2, 1, 4, 1, 5,
  1, 5, 4, 3, 3, 3, 3, 3, 5, 2, 1, 5, 5, 3, 5, 2, 1, 1, 4, 2, 2, 5, 1, 4, 3, 3,
  4, 4, 2, 3, 2, 1, 3, 1, 5, 2, 1, 5, 1, 3, 1, 4, 2, 4, 5, 1, 4, 5, 5, 3, 5, 1,
  5, 4, 1, 3, 4, 1, 1, 4, 5, 5, 2, 1, 3, 3,
];

const cache = [];

for (let i = 0; i < 300; i++) {
  if (i < 9) {
    cache[i] = 1;
  } else {
    cache[i] = cache[i - 9] + cache[i - 7];
  }
}

const numberOfDays = 256;
let total = 0;
input.forEach((offset) => {
  total += cache[numberOfDays + (8 - offset)];
});

console.log(total);
