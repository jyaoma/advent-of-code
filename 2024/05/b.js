const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });

const lines = file.split('\r\n');

const pageIndex = {};

let invalids = [];
let isChecking = false;
lines.forEach((line) => {
  if (line === '') {
    isChecking = true;
  } else {
    if (isChecking) {
      const pages = line.split(',');
      let isValid = true;
      pages.forEach((page, i) => {
        for (let j = i + 1; j < pages.length; j++) {
          const otherPage = pages[j];
          // console.log(otherPage);
          isValid =
            isValid &&
            (!pageIndex[otherPage] || !pageIndex[otherPage].includes(page));
        }
      });
      if (!isValid) {
        invalids.push(line);
      }
    } else {
      const [a, b] = line.split('|');
      if (!pageIndex[a]) pageIndex[a] = [];
      pageIndex[a].push(b);
    }
  }
});

let answer = 0;

invalids.forEach(invalidLine => {
    const pages = invalidLine.split(',');
    const validPages = [];

    const addPage = page => {
        for (let i = 0; i < pages.length; i++) {
            let otherPage = pages[i];
            if (pageIndex[otherPage]?.includes(page) && !validPages.includes(otherPage)) {
                addPage(otherPage);
            }
        }
        if (!validPages.includes(page)) validPages.push(page);
    }

    pages.forEach(page => {
      addPage(page)
    });

    answer += parseInt(validPages[(validPages.length - 1) / 2])
})

console.log(answer);
