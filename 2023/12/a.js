const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let sum = 0;

lines.forEach(line => {
    const [springsStr, numberStr] = line.split(' ');
    const springs = springsStr.split('');
    const numbers = numberStr.split(',').map(numStr => parseInt(numStr));

    console.log(`${springs.join('')} ${numbers.join()}`);
    console.log('----------');

    const isValid = (test) => {
        let result = true;
        springs.forEach((actualSpring, i) => {
            if (actualSpring === '#') {
                if (i >= test.length) result = false;
                if (test[i] !== '#') result = false;
            } else if (actualSpring === '.') {
                if (test[i] === '#') result = false;
            }
        });
        return result;
    };

    const recurse = (numIndex, prevSolution = []) => {
        if (numIndex >= numbers.length) {
            const valid = isValid(prevSolution);
            if (valid) {
                console.log(`${prevSolution.join('')} -`);
                sum++;
            } else {
                console.log(prevSolution.join(''));
            }
        } else {
            const number = numbers[numIndex];
            const remainingNumbers = numbers.filter((_, i) => i > numIndex);
            const remainingSpaceNeeded = remainingNumbers.length ? remainingNumbers.reduce((acc, cur) => acc + cur + 1, 0) - 1 : 0;
            const leeway = springs.length - prevSolution.length - number - remainingSpaceNeeded;

            for (let l = 0; l <= leeway; l++) {
                const curSolution = prevSolution.slice();
                if (springs[curSolution.length + l] === '.') continue;
                if (springs[curSolution.length + l + number] === '#') continue;
                if (springs[curSolution.length + l - 1] === '#') continue;
                if (springs.slice(curSolution.length + l, curSolution.length + l + number).filter(s => s === '.').length > 0) continue;
                curSolution.push(
                    ...new Array(l).fill('.'),
                    ...new Array(number).fill('#'),
                    '.'
                );

                recurse(numIndex + 1, curSolution);
            }
        }
    }

    recurse(0);

    console.log();
});

console.log(sum);