const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\n');

let answer = 0;

let maxY = lines.length;
let maxX = lines[0].length;

lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (char == 'A' && x >= 1 && y >= 1 && maxX - x > 1 && maxY - y > 1) {
            if (lines[y - 1][x - 1] == 'M' && lines[y + 1][x + 1] == 'S' && lines[y - 1][x + 1] == 'M' && lines[y + 1][x - 1] == 'S') answer++
            if (lines[y - 1][x - 1] == 'S' && lines[y + 1][x + 1] == 'M' && lines[y - 1][x + 1] == 'S' && lines[y + 1][x - 1] == 'M') answer++
            if (lines[y - 1][x - 1] == 'M' && lines[y + 1][x + 1] == 'S' && lines[y - 1][x + 1] == 'S' && lines[y + 1][x - 1] == 'M') answer++
            if (lines[y - 1][x - 1] == 'S' && lines[y + 1][x + 1] == 'M' && lines[y - 1][x + 1] == 'M' && lines[y + 1][x - 1] == 'S') answer++
        }
    })
})

console.log(answer);