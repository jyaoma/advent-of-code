const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const lineLength = lines[0].length; 

let sum = 0;

const isSymbol = char => !char.match(/\d/) && char !== '.';

for (let lineNo = 0; lineNo < lines.length; lineNo++) {
    const line = lines[lineNo];
    const isFirstLine = lineNo === 0;
    const isLastLine = lineNo === lines.length - 1;
    let curNumber = '';
    let isCounted = false;
    for (let colNo = 0; colNo < lineLength; colNo++) {
        const isFirstCol = colNo === 0;
        const isLastCol = colNo === lineLength - 1;

        if (line[colNo].match(/\d/)) {
            curNumber += line[colNo];

            if (!isFirstLine) {
                if (isSymbol(lines[lineNo - 1][colNo])) isCounted = true;
                if (!isFirstCol && isSymbol(lines[lineNo - 1][colNo - 1])) isCounted = true;
                if (!isLastCol && isSymbol(lines[lineNo - 1][colNo + 1])) isCounted = true;
            }

            if (!isLastLine) {
                if (isSymbol(lines[lineNo + 1][colNo])) isCounted = true;
                if (!isFirstCol && isSymbol(lines[lineNo + 1][colNo - 1])) isCounted = true;
                if (!isLastCol && isSymbol(lines[lineNo + 1][colNo + 1])) isCounted = true;
            }
            
            if (!isFirstCol && isSymbol(line[colNo - 1])) isCounted = true;           
            if (!isLastCol && isSymbol(line[colNo + 1])) isCounted = true;

            if (isLastCol && isCounted) sum += parseInt(curNumber);
        } else if (curNumber !== '') {
            if (isCounted) {
                // console.log(curNumber);
                sum += parseInt(curNumber);
            } else {
                // console.log(curNumber);
            }
            isCounted = false;
            curNumber = '';
        }
    }
}

console.log(sum);