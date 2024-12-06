const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\n');

let answer = 0;

let maxY = lines.length;
let maxX = lines[0].length;

lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (char == 'X') {
            if (x >= 3) {
                if (y >= 3 && lines[y - 1][x - 1] == 'M' && lines[y - 2][x - 2] == 'A' && lines[y - 3][x - 3] == 'S') answer++;
                if (lines[y][x - 1] == 'M' && lines[y][x - 2] == 'A' && lines[y][x - 3] == 'S') answer++;
                if (maxY - y > 3 && lines[y + 1][x - 1] == 'M' && lines[y + 2][x - 2] == 'A' && lines[y + 3][x - 3] == 'S') answer++;
            }
            if (maxX - x > 3) {
                if (y >= 3 && lines[y - 1][x + 1] == 'M' && lines[y - 2][x + 2] == 'A' && lines[y - 3][x + 3] == 'S') answer++;
                if (lines[y][x + 1] == 'M' && lines[y][x + 2] == 'A' && lines[y][x + 3] == 'S') answer++;
                if (maxY - y > 3 && lines[y + 1][x + 1] == 'M' && lines[y + 2][x + 2] == 'A' && lines[y + 3][x + 3] == 'S') answer++;
            }
            if (y >= 3 && lines[y - 1][x] == 'M' && lines[y - 2][x] == 'A' && lines[y - 3][x] == 'S') answer++;
            if (maxY - y > 3 && lines[y + 1][x] == 'M' && lines[y + 2][x] == 'A' && lines[y + 3][x] == 'S') answer++;
        }
    })
})

console.log(answer);