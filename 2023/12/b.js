const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/test.txt`, { encoding: 'utf-8'});

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

    const recurse = (numIndex, prevSolution = []) => {
        if (numIndex >= numbers.length) {
            // const valid = isValid(prevSolution);
            // if (valid) {
            //     // console.log(`${prevSolution.join('')} -`);
            //     sum++;
            // } else {
                // console.log(prevSolution.join(''));
            // }
            if (sum === 0) console.log(prevSolution.join(''));
            sum++
        } else {
            const number = numbers[numIndex];
            const remainingNumbers = numbers.filter((_, i) => i > numIndex);
            const remainingSpaceNeeded = remainingNumbers.length ? remainingNumbers.reduce((acc, cur) => acc + cur + 1, 0) - 1 : 0;
            const leeway = springs.length - prevSolution.length - number - remainingSpaceNeeded;
            // let lastNonRequired = remainingNumbers.length;
            // // console.log(patches);
            // const filteredPatches = patches.filter(patch => patch.start > prevSolution.length)
            let l = 0;
            // if (filteredPatches.length) {
            //     let patchPtr = filteredPatches.length - 1;
            //     // console.log(filteredPatches);
            //     // console.log(prevSolution.join(''));
            //     for (; lastNonRequired >= 0; lastNonRequired--) {
            //         // console.log({ lastNonRequired, patchPtr, a: [number, ...remainingNumbers][lastNonRequired - 1], b: patches[patchPtr].size})
            //         if ([number, ...remainingNumbers][lastNonRequired - 1] >= patches[patchPtr].size) {
            //             patchPtr--;
            //         }
            //         if (patchPtr <= 0) break;
            //     }
            //     if (lastNonRequired <= 1) {
            //         // console.log('oof');
            //         l = (filteredPatches[0].start - prevSolution.length) + filteredPatches[0].size - number;
            //         if (l < 0) l = 0;
            //         // console.log({ l });
            //         // console.log();
            //     }
            // }

            for (; l <= leeway; l++) {
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

                recurse(numIndex + 1, curSolution);
            }
        }
    }

    recurse(0);

    console.log();
});

console.log(sum);