const fs = require('fs');

const actualFile = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf8' });

const lines = actualFile.split('\r\n');

const numberKey = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
}

const findNumbers = line => {
    let convertedLine = '';
    let numberKeys = Object.keys(numberKey);
    for (let i = 0; i < line.length; i++) {
        if (line[i].match(/\d/)) {
            convertedLine += line[i];
            continue;
        }
        for (let j = 0; j < numberKeys.length; j++) {
            if (line.slice(i).startsWith(numberKeys[j])) {
                convertedLine += numberKey[numberKeys[j]];
            }
        }
    }
    return convertedLine;
}

const numbers = lines
    .map(line => findNumbers(line))
    .map(line => line.replace(/\D/g, ''))
    .map(line => `${line[0]}${line[line.length - 1]}`)
    .map(num => parseInt(num))
    .reduce((acc, cur) => acc + cur)

console.log(numbers);

