const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const rows = [];

lines.forEach(line => {
    rows.push(line.split(''))
});

for (let c = 0; c < rows[0].length; c++) {
    let target = 0;
    // while (rows[target][c] !== '.') target++;

    for (let r = 0; r < rows.length; r++) {
        if (rows[r][c] === '#') target = r + 1;
        else if (rows[r][c] === 'O') {
            if (r !== target) {
                rows[target][c] = 'O';
                rows[r][c] = '.';
            }
            target++;
        }
    }
}

// console.log(rows.map(row => row.join('')).join('\n'))

let sum = 0;

rows.forEach((row, i) => {
    const multiplier = rows.length - i;
    const count = row.filter(item => item === 'O').length;
    sum += multiplier * count;
});

console.log(sum);