const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let sum = 0;

lines.forEach(line => {
    const numberSeq = line.split(' ').map(num => parseInt(num));

    const recurse = arr => {
        if (arr.filter(num => num !== 0).length === 0) {
            return 0
        }

        const diffArr = [];
        for (let i = 1; i < arr.length; i++) {
            diffArr.push(arr[i] - arr[i - 1]);
        }
        return arr[0] - recurse(diffArr);
    }

    const finalNum = recurse(numberSeq);
    sum += finalNum;
});

console.log(sum);