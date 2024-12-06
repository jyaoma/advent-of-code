const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const pageIndex = {};

let answer = 0;
let isChecking = false;
lines.forEach(line => {
    if (line === '') {
        isChecking = true;
        console.log(pageIndex);
    }
    else {
        if (isChecking) {
            const pages = line.split(',');
            let isValid = true;
            pages.forEach((page, i) => {
                for (let j = i + 1; j < pages.length; j++) {
                    const otherPage = pages[j];
                    // console.log(otherPage);
                    isValid =
                      isValid &&
                      (!pageIndex[otherPage] ||
                        !pageIndex[otherPage].includes(page));
                }
            })
            if (isValid) {
                answer += parseInt(pages[(pages.length - 1) / 2])
            }
        } else {
            const [a, b] = line.split('|');
            if (!pageIndex[a]) pageIndex[a] = [];
            pageIndex[a].push(b);
        }
    }
})

console.log(answer);