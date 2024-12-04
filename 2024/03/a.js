const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let answer = 0;

lines.forEach(line => {
    const matches = line.match(/mul\((\d+),(\d+)\)/g);
    matches.forEach(match => {
        const [ i, a, b ] = /\((\d+),(\d+)\)/g.exec(match);
        answer += a * b;
    })
})

console.log(answer);