const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let sum = 0;

lines.forEach(line => {
    const [springsStr, numberStr] = line.split(' ');
    const springs = `${springsStr}?${springsStr}?${springsStr}?${springsStr}?${springsStr}`.split('');
    const numbers = `${numberStr},${numberStr},${numberStr},${numberStr},${numberStr}`.split(',').map(numStr => parseInt(numStr));
    
    console.log(`${springs.join('')} ${numbers.join()}`);
    console.log('----------');

    const patches = [];
    let tempPatch = {};
    for (let i = 0; i < springs.length; i++) {
        if (springs[i] === '#' && !tempPatch.start && tempPatch.start !== 0) tempPatch.start = i;
        if (springs[i] !== '#' && !tempPatch.size && tempPatch.start) {
            tempPatch.size = i - tempPatch.start;
            patches.push({...tempPatch});
            tempPatch = {};
        }
    }

    const isValid = (test, limit = springs.length) => {
        for (let i = 0; i < limit; i++) {
            const actualSpring = springs[i];
            if (actualSpring === '#') {
                if (i >= test.length) return false;
                if (test[i] !== '#') return false;
            } else if (actualSpring === '.') {
                if (test[i] === '#') return false;
            }
        }
        return true;
    };

    const tree = new Array(numbers.length).fill(null).map(() => ({}));

    const recurse = (numIndex, prevSolution = []) => {
        if (numIndex >= numbers.length) return isValid(prevSolution) ? 1 : 0;
        else {
            const number = numbers[numIndex];
            const remainingNumbers = numbers.filter((_, i) => i > numIndex);
            const remainingSpaceNeeded = remainingNumbers.length ? remainingNumbers.reduce((acc, cur) => acc + cur + 1, 0) - 1 : 0;
            const leeway = springs.length - prevSolution.length - number - remainingSpaceNeeded;

            let thisTreeSum = 0;
            
            for (let l = 0; l <= leeway; l++) {
                const existingValue = tree[numIndex][prevSolution.length + l];
                if (existingValue || existingValue === 0) {
                    thisTreeSum += tree[numIndex][prevSolution.length + l];
                } else {
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

                    if (!isValid(curSolution, curSolution.length)) continue;

                    const subTreeSum = recurse(numIndex + 1, curSolution);
                    tree[numIndex][prevSolution.length + l] = subTreeSum;
                    thisTreeSum += subTreeSum;
                }
            }

            if (numIndex === 1) console.log(thisTreeSum);
            return thisTreeSum;
        }
    }

    const thisLineSum = recurse(0);
    console.log(thisLineSum);
    sum += thisLineSum
});

console.log(sum);