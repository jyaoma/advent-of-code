const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let list1 = [];
let list2 = [];

lines.forEach(line => {
    const [a, b] = line.split('   ');
    list1.push(parseInt(a));
    list2.push(parseInt(b));
});

list1 = list1.sort();
list2 = list2.sort();

let answer = 0;
list1.forEach((item, i) => {
    answer += Math.abs(item - list2[i]);
});

console.log(answer);