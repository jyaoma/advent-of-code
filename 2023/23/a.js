const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const grid = lines.map(line => line.split(''));

let paths = [
    [{ r: 0, c: 1, d: 's' }]
];

let maxCompletedLength = 0;

while (paths.length > 0) {
    paths = paths.reduce((acc, path) => {
        const lastMove = path[path.length - 1];
        let { r, c, d } = JSON.parse(JSON.stringify(lastMove));
        if (r === grid.length - 2 && grid[r + 1][c] === '.') {
            if (path.length > maxCompletedLength) maxCompletedLength = path.length;
            return acc;
        }
        switch (d) {
            case 'n':
                r--;
                break;
            case 's':
                r++;
                break;
            case 'w':
                c--;
                break;
            case 'e':
                c++;
                break;
        }

        const possibleDirs = [];
        if (!path.find(({ r: row, c: col }) => row === r + 1 && col === c) && r < grid.length - 1 && !'^#'.includes(grid[r + 1][c])) possibleDirs.push('s');
        if (!path.find(({ r: row, c: col }) => row === r - 1 && col === c) && r > 0 && !'v#'.includes(grid[r - 1][c])) possibleDirs.push('n');
        if (!path.find(({ r: row, c: col }) => row === r && col === c + 1) && !'<#'.includes(grid[r][c + 1])) possibleDirs.push('e');
        if (!path.find(({ r: row, c: col }) => row === r && col === c - 1) && !'>#'.includes(grid[r][c - 1])) possibleDirs.push('w');

        if (possibleDirs.length <= 0) return acc;

        const result = possibleDirs.map(dir => [...path, { r, c, d: dir }]);
        return acc.concat(result);
    }, []);
    console.log(paths.length);
}

console.log(maxCompletedLength);