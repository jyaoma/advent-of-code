const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });

const lines = file.split('\r\n');

let list1 = [];
const list2Index = {};

lines.forEach((line) => {
  const [a, b] = line.split('   ');
  list1.push(parseInt(a));
  const number2 = parseInt(b);
  if (!list2Index[number2]) list2Index[number2] = 0;
  list2Index[number2]++
});

let answer = 0;

list1.forEach(item => {
    answer += item * (list2Index[item] ?? 0)
});

console.log(answer)