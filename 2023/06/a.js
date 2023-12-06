const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const [rawTimes, rawDistances] = lines;

const times = rawTimes.split(':')[1].split(' ').filter(a => a !== '').map(a => parseInt(a));
const distances = rawDistances.split(':')[1].split(' ').filter(a => a !== '').map(a => parseInt(a));

const factors = [];

for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];

    for (let j = 0; j <= time / 2; j++) {
        const k = time - j;
        if (j * k > distance) {
            factors.push(time - (j * 2) + 1);
            break;
        }
    }
}

const result = factors.reduce((acc, cur) => acc * cur);
console.log(result);