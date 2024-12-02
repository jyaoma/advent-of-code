const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let answer = 0;
lines.forEach(line => {
    const numStrs = line.split(' ');
    const numbers = numStrs.map(x => parseInt(x));
    console.log(numbers);
    if (numbers[0] != numbers[1]) {
        let isIncreasing = numbers[1] > numbers[0];
        let shouldAdd = Math.abs(numbers[1] - numbers[0]) <= 3;
        for (let i = 2; i < numbers.length && shouldAdd; i++) {
            if (Math.abs(numbers[i] - numbers[i - 1]) > 3 || isIncreasing && numbers[i] <= numbers[i - 1] || !isIncreasing && numbers[i] >= numbers[i - 1])
                shouldAdd = false;
        }
        if (shouldAdd) {
            console.log("Safe");
            answer++;
        }
    }
})

console.log(answer);