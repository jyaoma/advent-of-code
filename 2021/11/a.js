const input = [
  [6, 1, 1, 1, 8, 2, 1, 7, 6, 7],
  [1, 7, 6, 3, 6, 1, 1, 6, 1, 5],
  [3, 5, 1, 2, 6, 8, 3, 1, 3, 1],
  [8, 5, 8, 2, 7, 7, 1, 4, 7, 3],
  [8, 2, 1, 4, 8, 1, 3, 8, 7, 4],
  [2, 3, 2, 5, 8, 2, 3, 2, 1, 7],
  [2, 2, 2, 2, 4, 8, 2, 8, 2, 3],
  [5, 4, 7, 1, 3, 5, 6, 7, 8, 2],
  [3, 7, 3, 8, 6, 7, 1, 2, 8, 7],
  [8, 6, 7, 5, 2, 2, 6, 5, 7, 4],
];

let totalFlashes = 0;

const flashIncrement = (x, y) => {
  input[y][x]++;
  if (x > 0) {
    input[y][x - 1]++;
  }
  if (x < input[y].length - 1) {
    input[y][x + 1]++;
  }
  if (y > 0) {
    input[y - 1][x]++;
    if (x > 0) {
      input[y - 1][x - 1]++;
    }
    if (x < input[y - 1].length - 1) {
      input[y - 1][x + 1]++;
    }
  }
  if (y < input.length - 1) {
    input[y + 1][x]++;
    if (x > 0) {
      input[y + 1][x - 1]++;
    }
    if (x < input[y + 1].length - 1) {
      input[y + 1][x + 1]++;
    }
  }
};

// in each step
const step = () => {
  // increment one energy for every item
  input.forEach((unused, y) => {
    input[y].forEach((unused, x) => {
      input[y][x]++;
    });
  });

  // increment 3x3 square for energy > 9
  // repeatedly until there's no more

  let flashed = [];
  let newFlashed = [null];

  const hasNotFlashed = (inX, inY) =>
    flashed.filter(({ x, y }) => x === inX && y === inY).length === 0;

  while (newFlashed.length > 0) {
    newFlashed = [];
    input.forEach((unused, y) => {
      input[y].forEach((unused, x) => {
        if (input[y][x] > 9 && hasNotFlashed(x, y)) {
          newFlashed.push({ x, y });
          flashIncrement(x, y);
        }
      });
    });
    flashed = flashed.concat(newFlashed);
  }

  // set all energy to 0 where energy > 9
  input.forEach((unused, y) => {
    input[y].forEach((unused, x) => {
      if (input[y][x] > 9) {
        input[y][x] = 0;
      }
    });
  });

  totalFlashes += flashed.length;
};

for (let i = 0; i < 100; i++) {
  step();
}

console.log(totalFlashes);
