// const input = [
//   3, 1, 5, 4, 4, 4, 5, 3, 4, 4, 1, 4, 2, 3, 1, 3, 3, 2, 3, 2, 5, 1, 1, 4, 4, 3,
//   2, 4, 2, 4, 1, 5, 3, 3, 2, 2, 2, 5, 5, 1, 3, 4, 5, 1, 5, 5, 1, 1, 1, 4, 3, 2,
//   3, 3, 3, 4, 4, 4, 5, 5, 1, 3, 3, 5, 4, 5, 5, 5, 1, 1, 2, 4, 3, 4, 5, 4, 5, 2,
//   2, 3, 5, 2, 1, 2, 4, 3, 5, 1, 3, 1, 4, 4, 1, 3, 2, 3, 2, 4, 5, 2, 4, 1, 4, 3,
//   1, 3, 1, 5, 1, 3, 5, 4, 3, 1, 5, 3, 3, 5, 4, 2, 3, 4, 1, 2, 1, 1, 4, 4, 4, 3,
//   1, 1, 1, 1, 1, 4, 2, 5, 1, 1, 2, 1, 5, 3, 4, 1, 5, 4, 1, 3, 3, 1, 4, 4, 5, 3,
//   1, 1, 3, 3, 3, 1, 1, 5, 4, 2, 5, 1, 1, 5, 5, 1, 4, 2, 2, 5, 3, 1, 1, 3, 3, 5,
//   3, 3, 2, 4, 3, 2, 5, 2, 5, 4, 5, 4, 3, 2, 4, 3, 5, 1, 2, 2, 4, 3, 1, 5, 5, 1,
//   3, 1, 3, 2, 2, 4, 5, 4, 2, 3, 2, 3, 4, 1, 3, 4, 2, 5, 4, 4, 2, 2, 1, 4, 1, 5,
//   1, 5, 4, 3, 3, 3, 3, 3, 5, 2, 1, 5, 5, 3, 5, 2, 1, 1, 4, 2, 2, 5, 1, 4, 3, 3,
//   4, 4, 2, 3, 2, 1, 3, 1, 5, 2, 1, 5, 1, 3, 1, 4, 2, 4, 5, 1, 4, 5, 5, 3, 5, 1,
//   5, 4, 1, 3, 4, 1, 1, 4, 5, 5, 2, 1, 3, 3,
// ];

const input = [3, 4, 3, 1, 2];

const modifiedInput = input.map((day) => ({ day, start: 0 }));

const numberOfGeneratedFish = (initial, start, numberOfDays) =>
  Math.ceil((numberOfDays - start - initial) / 7);

const getNumberOfFish = (initial, start, numberOfDays) => {
  const numberOfNewFish = numberOfGeneratedFish(initial, start, numberOfDays);
  let result = [];
  for (let i = 0; i < numberOfNewFish; i++) {
    result[i] = {
      day: 8,
      start: initial + i * 7 + 1,
    };
  }
  const counts = result.map((fish) =>
    getNumberOfFish(fish.day, fish.start, numberOfDays)
  );
  return counts.reduce((acc, cur) => acc + cur, 0) + 1;
};

// const mainCount = modifiedInput.map((fish) =>
//   getNumberOfFish(fish.day, fish.start, 18)
// );
// const answer = mainCount.reduce((acc, cur) => acc + cur, 0) + 1;

// console.log(answer);

console.log(getNumberOfFish(3, 0, 15));
