const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const games = {};

lines.forEach(line => {
    const [header, sets] = line.split(': ');
    const gameNum = parseInt(header.slice(5));

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

    let isPossible = true;
    if (max.red > 12 || max.green > 13 || max.blue > 14) {
        isPossible = false;
    }
    games[gameNum] = isPossible;
});

console.log(games);

let sum = 0;
Object.keys(games).forEach(game => {
    if (games[game]) sum += parseInt(game);
});

console.log(sum);