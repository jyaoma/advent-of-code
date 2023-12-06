const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const [rawTimes, rawDistances] = lines;

const time = parseInt(rawTimes.split(':')[1].split('').filter(a => a !== ' ').join(''));
const distance = parseInt(rawDistances.split(':')[1].split('').filter(a => a !== ' ').join(''));

for (let j = 0; j <= time / 2; j++) {
    const k = time - j;
    if (j * k > distance) {
        console.log(time - (j * 2) + 1);
        break;
    }
}