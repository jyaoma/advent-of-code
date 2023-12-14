const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const patterns = [];

let tempPattern = [];

lines.forEach(line => {
    if (line === '') {
        patterns.push(tempPattern);
        tempPattern = [];
    } else tempPattern.push(line);
});
patterns.push(tempPattern);

let sum = 0;

patterns.forEach(pattern => {
    // check horizontal
    for (let r = 1; r < pattern.length; r++) {
        let ptr0 = r - 1;
        let ptr1 = r;
        let valid = true;
        while (ptr0 >= 0 && ptr1 < pattern.length) {
            if (pattern[ptr0--] !== pattern[ptr1++]) valid = false;
        }
        if (valid) {
            sum += r * 100;
            return;
        }
    }

    for (let c = 1; c < pattern[0].length; c++) {
        let ptr0 = c - 1;
        let ptr1 = c;
        let valid = true;
        while (ptr0 >= 0 && ptr1 < pattern[0].length) {
            pattern.forEach(line => {
                if (line[ptr0] !== line[ptr1]) {
                    valid = false;
                }
            });
            ptr0--;
            ptr1++;
        }
        if (valid) {
            sum += c;
            return;
        }
    }
});

console.log(sum);