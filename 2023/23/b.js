const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

lines.forEach((line, no) => {
    if (line.includes('..') && no % 2 === 0) console.log('oof');
})

const grid = lines.map(line => line.split(''));

let paths = [
    [{ r: 1, c: 1, d: 'e' }]
];

let maxCompletedLength = 0;

while (paths.length > 0) {
    paths = paths.reduce((acc, path) => {
        const lastMove = path[path.length - 1];
        let { r, c, d } = JSON.parse(JSON.stringify(lastMove));        
        switch (d) {
            case 'n':
                r-=2;
                break;
            case 's':
                r+=2;
                break;
            case 'w':
                c-=2;
                break;
            case 'e':
                c+=2;
                break;
        }

        // console.log({ r, c });

        if (r === grid.length - 2 && c === grid[0].length - 2) {
            if (path.length > maxCompletedLength) maxCompletedLength = (path.length + 1) * 2;
            return acc;
        }

        const possibleDirs = [];
        if (
            d !== 'n' &&
            r < grid.length - 3 &&
            grid[r + 1][c] !== '#' &&
            // grid[r + 2][c] !== '#' &&
            !path.find(({ r: row, c: col }) => row === r + 2 && col === c)
        ) possibleDirs.push('s');
        if (
            d !== 's' &&
            r > 2 &&
            grid[r - 1][c] !== '#' &&
            // grid[r - 2][c] !== '#' &&
            !path.find(({ r: row, c: col }) => row === r - 2 && col === c)
        ) possibleDirs.push('n');
        if (
            d !== 'w' &&
            c < grid[0].length - 3 &&
            grid[r][c + 1] !== '#' &&
            // grid[r][c + 2] !== '#' &&
            !path.find(({ r: row, c: col }) => row === r && col === c + 2)
        ) possibleDirs.push('e');
        if (
            d !== 'e' &&
            c > 2 &&
            grid[r][c - 1] !== '#' &&
            // grid[r][c - 2] !== '#' &&
            !path.find(({ r: row, c: col }) => row === r && col === c - 2)
        ) possibleDirs.push('w');

        if (possibleDirs.length <= 0) return acc;

        const result = possibleDirs.map(dir => [...path, { r, c, d: dir }]);
        return [...acc, ...result];
    }, []);
    const lastPath = paths[paths.length - 1];
    const lastMove = lastPath[lastPath.length - 1];
    console.log({ length: paths.length, progress: lastMove.r + lastMove.c});
}

console.log(maxCompletedLength);