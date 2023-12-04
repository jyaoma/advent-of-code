const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let sum = 0;

lines.forEach(rawLine => {
    const line = rawLine.trim();

    const [cardNum, rawNumbers] = line.split(': ');
    const [winningNumbers, myNumbers] = rawNumbers.split(' | ');
    const parsedWinning = winningNumbers.split(' ').map(num => parseInt(num)).filter(num => num > 0);
    const parsedMy = myNumbers.split(' ').map(num => parseInt(num)).filter(num => num > 0);

    // console.log(parsedWinning);
    // console.log(parsedMy);

    let numWinning = -1;
    parsedWinning.forEach(winning => {
        if (parsedMy.includes(winning)) numWinning++;
    });

    if (numWinning >= 0) {
        sum += 2 ** numWinning;
    }
})

console.log(sum);