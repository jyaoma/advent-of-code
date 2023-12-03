const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const lineLength = lines[0].length; 

let sum = 0;

const search = (row, col) => {
    let str = '';
    if (lines[row][col].match(/\d/)) str = lines[row][col];
    let tempCol = col - 1;
    while (lines[row][tempCol--]?.match(/\d/)) str = lines[row][tempCol + 1] + str;
    tempCol = col + 1;
    while (lines[row][tempCol++]?.match(/\d/)) str = str + lines[row][tempCol - 1];

    return parseInt(str);
}

for (let line = 0; line < lines.length; line++) {
    const isFirstLine = line === 0;
    const isLastLine = line === lines.length - 1;
    for (let col = 0; col < lineLength; col++) {
        const isFirstCol = col === 0;
        const isLastCol = col === lineLength - 1;

        const where = {
            w: false,
            e: false,
            n: false,
            s: false,
            nw: false,
            ne: false,
            sw: false,
            se: false
        }

        if (lines[line][col] === '*') {
            if (!isFirstCol && lines[line][col - 1].match(/\d/)) where.w = true;
            if (!isLastCol && lines[line][col + 1].match(/\d/)) where.e = true;
            if (!isFirstLine) {
                if (lines[line - 1][col].match(/\d/)) where.n = true;
                else {
                    if (!isFirstCol && lines[line - 1][col - 1].match(/\d/)) where.nw = true;
                    if (!isLastCol && lines[line - 1][col + 1].match(/\d/)) where.ne = true;
                }
            }
            if (!isLastLine) {
                if (lines[line + 1][col].match(/\d/)) where.s = true;
                else {
                    if (!isFirstCol && lines[line + 1][col - 1].match(/\d/)) where.sw = true;
                    if (!isLastCol && lines[line + 1][col + 1].match(/\d/)) where.se = true;
                }
            }

            if (Object.values(where).filter(x => x).length === 2) {
                let prod = 1;
                if (where.w) prod *= search(line, col - 1);
                if (where.e) prod *= search(line, col + 1);
                if (where.n) prod *= search(line - 1, col);
                if (where.s) prod *= search(line + 1, col);
                if (where.nw) prod *= search(line - 1, col - 1);
                if (where.sw) prod *= search(line + 1, col - 1);
                if (where.ne) prod *= search(line - 1, col + 1);
                if (where.se) prod *= search(line + 1, col + 1);
                sum += prod;
            }
        }
    }
}

console.log(sum);