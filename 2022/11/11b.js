const actualInput = [
  'Monkey 0:',
  '  Starting items: 78, 53, 89, 51, 52, 59, 58, 85',
  '  Operation: new = old * 3',
  '  Test: divisible by 5',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 7',
  '',
  'Monkey 1:',
  '  Starting items: 64',
  '  Operation: new = old + 7',
  '  Test: divisible by 2',
  '    If true: throw to monkey 3',
  '    If false: throw to monkey 6',
  '',
  'Monkey 2:',
  '  Starting items: 71, 93, 65, 82',
  '  Operation: new = old + 5',
  '  Test: divisible by 13',
  '    If true: throw to monkey 5',
  '    If false: throw to monkey 4',
  '',
  'Monkey 3:',
  '  Starting items: 67, 73, 95, 75, 56, 74',
  '  Operation: new = old + 8',
  '  Test: divisible by 19',
  '    If true: throw to monkey 6',
  '    If false: throw to monkey 0',
  '',
  'Monkey 4:',
  '  Starting items: 85, 91, 90',
  '  Operation: new = old + 4',
  '  Test: divisible by 11',
  '    If true: throw to monkey 3',
  '    If false: throw to monkey 1',
  '',
  'Monkey 5:',
  '  Starting items: 67, 96, 69, 55, 70, 83, 62',
  '  Operation: new = old * 2',
  '  Test: divisible by 3',
  '    If true: throw to monkey 4',
  '    If false: throw to monkey 1',
  '',
  'Monkey 6:',
  '  Starting items: 53, 86, 98, 70, 64',
  '  Operation: new = old + 6',
  '  Test: divisible by 7',
  '    If true: throw to monkey 7',
  '    If false: throw to monkey 0',
  '',
  'Monkey 7:',
  '  Starting items: 88, 64',
  '  Operation: new = old * old',
  '  Test: divisible by 17',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 5',
];

const exampleInput = [
  'Monkey 0:',
  '  Starting items: 79, 98',
  '  Operation: new = old * 19',
  '  Test: divisible by 23',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 3',
  '',
  'Monkey 1:',
  '  Starting items: 54, 65, 75, 74',
  '  Operation: new = old + 6',
  '  Test: divisible by 19',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 0',
  '',
  'Monkey 2:',
  '  Starting items: 79, 60, 97',
  '  Operation: new = old * old',
  '  Test: divisible by 13',
  '    If true: throw to monkey 1',
  '    If false: throw to monkey 3',
  '',
  'Monkey 3:',
  '  Starting items: 74',
  '  Operation: new = old + 3',
  '  Test: divisible by 17',
  '    If true: throw to monkey 0',
  '    If false: throw to monkey 1',
];

const input = exampleInput;

const monkeys = [];

let currentMonkey = {
  counter: 0,
};
let currentMonkeyNo = null;

const dataIfExists = (line, lineStart) => {
  if (line.startsWith(lineStart)) {
    return line.slice(lineStart.length);
  }
};

input.forEach((line) => {
  const monkeyString = dataIfExists(line, 'Monkey ');
  if (monkeyString) currentMonkeyNo = parseInt(monkeyString);

  const startingItems = dataIfExists(line, '  Starting items: ');
  if (startingItems)
    currentMonkey.items = JSON.parse(`[${startingItems}]`).map((num) =>
      BigInt(num)
    );

  const operation = dataIfExists(line, '  Operation: new = old ');
  if (operation) {
    const [operator, operand] = operation.split(' ');
    if (operator === '+') {
      if (operand === 'old') {
        currentMonkey.operation = (old) => old * 2n;
      } else {
        currentMonkey.operation = (old) => old + BigInt(operand);
      }
    } else if (operator === '*') {
      if (operand === 'old') {
        currentMonkey.operation = (old) => old ** 2n;
      } else {
        currentMonkey.operation = (old) => old * BigInt(operand);
      }
    }
  }

  const test = dataIfExists(line, '  Test: divisible by ');
  if (test) currentMonkey.test = BigInt(test);

  const trueMonkey = dataIfExists(line, '    If true: throw to monkey ');
  if (trueMonkey) currentMonkey.trueMonkey = parseInt(trueMonkey);

  const falseMonkey = dataIfExists(line, '    If false: throw to monkey ');
  if (falseMonkey) currentMonkey.falseMonkey = parseInt(falseMonkey);

  if (line === '') {
    monkeys[currentMonkeyNo] = currentMonkey;
    currentMonkeyNo = null;
    currentMonkey = {
      counter: 0,
    };
  }
});
monkeys[currentMonkeyNo] = currentMonkey;

let trues = new Array(monkeys.length).fill(0);

// console.log(monkeys);

for (let round = 0; round < 100; round++) {
  if (round % 100 === 0 || round > 800 && round % 10 === 0 || round > 980) console.log(`round ${round}`);
  monkeys.forEach((monkey, i) => {
    monkey.items.forEach((item) => {
      const doOp = monkey.operation(item);
      const div = doOp / monkey.test;
      const testResult = div * monkey.test === doOp;
      if (testResult) {
        trues[i]++;
        monkeys[monkey.trueMonkey].items.push(doOp);
      } else {
        monkeys[monkey.falseMonkey].items.push(doOp);
      }
    });
    monkeys[i].counter += monkey.items.length;
    monkeys[i].items = [];
  });
}

console.log(monkeys.map(monkey => monkey.counter));
// console.log(monkeys);
console.log(trues);
