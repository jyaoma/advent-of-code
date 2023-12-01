const fs = require('fs');

const actualFile = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf8' });

const lines = actualFile.split('\n');

const numbers = lines
    .map(line => line.replace(/\D/g, ''))
    .map(line => `${line[0]}${line[line.length - 1]}`)
    .map(num => parseInt(num))
    .reduce((acc, cur) => acc + cur)

console.log(numbers);

