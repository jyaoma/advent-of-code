const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });

const lines = file.split('\r\n');

let answer = 0;

const checkFail = (a, b, isIncreasing) =>
  Math.abs(a - b) > 3 ||
  Math.abs(a - b) < 1 ||
  (isIncreasing && b <= a) ||
  (!isIncreasing && b >= a);

lines.forEach((line) => {
    const numStrs = line.split(' ');
    const numbers = numStrs.map((x) => parseInt(x));
    console.log(numbers);
    let a;
    let shouldAddForwards = true;
    let foundGap = false;
    let isIncreasing = numbers[1] > numbers[0];
    let b = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        a = b;
        b = numbers[i];
        if (checkFail(a, b, isIncreasing)) {
            if (!foundGap) {
                foundGap = true;
                if (i < numbers.length - 1) {
                    i++;
                    b = numbers[i];
                    if (checkFail(a, b, isIncreasing)) {
                        shouldAddForwards = false;
                    }
                }
            } else {
                shouldAddForwards = false;
            }
        }
    }

    numbers.reverse();
    let shouldAddBackwards = true;
    foundGap = false;
    isIncreasing = numbers[1] > numbers[0];
    b = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      a = b;
      b = numbers[i];
      if (checkFail(a, b, isIncreasing)) {
        if (!foundGap) {
          foundGap = true;
          if (i < numbers.length - 1) {
            i++;
            b = numbers[i];
            if (checkFail(a, b, isIncreasing)) {
              shouldAddBackwards = false;
            }
          }
        } else {
          shouldAddBackwards = false;
        }
      }
    }

    if (shouldAddForwards || shouldAddBackwards) {
      console.log('Safe');
      answer++;
    }
});

console.log(answer);
