const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const line = file.trim();

const commands = line.split(',');

let sum = 0;

commands.forEach(command => {
    let wordSum = 0;
    for (let i = 0; i < command.length; i++) {
        const charCode = command.charCodeAt(i);
        wordSum += charCode;
        wordSum = wordSum * 17 % 256;
    }
    sum += wordSum;
});

console.log(sum);