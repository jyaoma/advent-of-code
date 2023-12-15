const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const line = file.trim();

const commands = line.split(',');

const boxes = new Array(256).fill(null).map(() => ({}));

commands.forEach(command => {
    let wordSum = 0;
    let parts;
    if (command.includes('-')) {
        parts = [command.slice(0, command.length - 1), '-'];
    } else if (command.includes('=')) {
        parts = command.split('=');
    }
    const [label, action] = parts;
    for (let i = 0; i < label.length; i++) {
        const charCode = label.charCodeAt(i);
        wordSum += charCode;
        wordSum = wordSum * 17 % 256;
    }
    // console.log(wordSum);
    if (action === '-') {
        delete boxes[wordSum][label]
    } else {
        boxes[wordSum][label] = action;
    }
});

// console.log(slots);

let sum = 0;
boxes.forEach((box, b) => {
    Object.keys(box).forEach((slot, s) => {
        // console.log(slot)
        const commandTotal = (b + 1) * (s + 1) * box[slot];
        // console.log({ commandTotal });
        sum += commandTotal;
    });
});

console.log(sum);