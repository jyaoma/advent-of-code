const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let answer = 0;

lines.forEach(line => {
    const allMatchesIter = line.matchAll(/mul\(\d+,\d+\)/g);
    const allMatches = [...allMatchesIter];
    const allDos = [...line.matchAll(/do\(\)/g)].map(x => x.index);
    const allDoNots = [...line.matchAll(/don't\(\)/g)].map(x => x.index);
    const toMatchOrNotToMatch = index => {
        let maxDoNot = -1;
        allDoNots.forEach(item => {
            if (item > maxDoNot && item < index) maxDoNot = item
        });
        if (maxDoNot == -1) return true;
        let result = false;
        allDos.forEach(item => {
            if (item > maxDoNot && item < index) result = true;
        });
        return result;
    }

    console.log(allMatches.map(match => match.index))
    console.log({ allDos, allDoNots })

    allMatches
        .filter(match => toMatchOrNotToMatch(match.index))
        .map(match => match[0])
        .forEach(match => {
            const [ i, a, b ] = /\((\d+),(\d+)\)/g.exec(match);
            answer += a * b;
        })
})

// lines.forEach(line => {
//     const matches = line.match(/mul\((\d+),(\d+)\)/g);
//     matches.forEach(match => {
//         const [ i, a, b ] = /\((\d+),(\d+)\)/g.exec(match);
//         answer += a * b;
//     })
// })

console.log(answer);