const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let sum = 0;
lines.forEach(line => {
    const [_, sets] = line.split(': ');

    const setsArr = sets.split('; ');

    const max = {
        red: 0,
        green: 0,
        blue: 0,
    };
    setsArr.forEach(set => {
        const ballColors = set.split(', ');
        ballColors.forEach(ballColor => {
            const [quantity, color] = ballColor.split(' ');
            if (parseInt(quantity) > max[color]) max[color] = parseInt(quantity);
        })
    });

    sum += max.red * max.green * max.blue;
});

console.log(sum);