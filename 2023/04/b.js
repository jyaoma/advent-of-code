const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let tree = [];

for (let i = 0; i < lines.length; i++) {
    tree = tree.concat(0);
};

for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();

    const [cardNum, rawNumbers] = line.split(': ');
    const [winningNumbers, myNumbers] = rawNumbers.split(' | ');
    const parsedWinning = winningNumbers.split(' ').map(num => parseInt(num)).filter(num => num > 0);
    const parsedMy = myNumbers.split(' ').map(num => parseInt(num)).filter(num => num > 0);

    let numWinning = 0;
    parsedWinning.forEach(winning => {
        if (parsedMy.includes(winning)) numWinning++;
    });

    let cardsWon = numWinning;
    for (let j = 0; j < numWinning; j++) {
        cardsWon += tree[i + j + 1];
    }
    tree[i] = cardsWon;
}

const sum = lines.length + tree.reduce((acc, cur) => acc + cur, 0);
console.log(sum);