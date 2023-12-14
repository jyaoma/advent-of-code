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

// const originalSolutions = [];

// patterns.forEach(pattern => {
//     // check horizontal
//     for (let r = 1; r < pattern.length; r++) {
//         let ptr0 = r - 1;
//         let ptr1 = r;
//         let valid = true;
//         while (ptr0 >= 0 && ptr1 < pattern.length) {
//             if (pattern[ptr0--] !== pattern[ptr1++]) valid = false;
//         }
//         if (valid) {
//             originalSolutions.push(`h${r}`);
//             return;
//         }
//     }

//     for (let c = 1; c < pattern[0].length; c++) {
//         let ptr0 = c - 1;
//         let ptr1 = c;
//         let valid = true;
//         while (ptr0 >= 0 && ptr1 < pattern[0].length) {
//             pattern.forEach(line => {
//                 if (line[ptr0] !== line[ptr1]) {
//                     valid = false;
//                 }
//             });
//             ptr0--;
//             ptr1++;
//         }
//         if (valid) {
//             originalSolutions.push(`v${c}`);
//             return;
//         }
//     }
// });

let sum = 0;

patterns.forEach(pattern => {
    // check horizontal
    for (let r = 1; r < pattern.length; r++) {
        let ptr0 = r - 1;
        let ptr1 = r;
        let numErrors = 0;
        while (ptr0 >= 0 && ptr1 < pattern.length) {
            pattern[ptr0].split('').forEach((char, i) => {
                if (char !== pattern[ptr1][i]) numErrors++;
            });
            ptr0--;
            ptr1++;
        }
        if (numErrors === 1) {
            sum += r * 100;
            return;
        }
    }

    for (let c = 1; c < pattern[0].length; c++) {
        let ptr0 = c - 1;
        let ptr1 = c;
        let numErrors = 0;
        while (ptr0 >= 0 && ptr1 < pattern[0].length) {
            pattern.forEach(line => {
                if (line[ptr0] !== line[ptr1]) {
                    numErrors++;
                }
            });
            ptr0--;
            ptr1++;
        }
        if (numErrors === 1) {
            sum += c;
            return;
        }
    }
});

console.log(sum);