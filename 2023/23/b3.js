const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

lines.forEach((line, no) => {
    if (line.includes('..') && no % 2 === 0) console.log('oof');
})

const grid = lines.map(line => line.split(''));

const points = {};

points['0,1'] = { s: {} };

for (let r = 1; r < grid.length - 1; r+=2) {
    for (let c = 1; c < grid[0].length - 1; c+=2) {
        if (grid[r][c] === '.') {
            const point = {};
            if(grid[r-1][c] !== '#') point.n = {}
            if(grid[r+1][c] !== '#') point.s = {}
            if(grid[r][c-1] !== '#') point.w = {}
            if(grid[r][c+1] !== '#') point.e = {}

            if (Object.keys(point).length > 2) {
                points[`${r},${c}`] = point;
            }
        }
    }
}

points[`${grid.length - 1},${grid[0].length - 2}`] = {};

console.log(Object.keys(points).length - 2);

const allPointCoords = Object.keys(points);

allPointCoords.forEach(coord => {
    const [pr, pc] = coord.split(',').map(x => parseInt(x));

    let paths = ['n', 's', 'w', 'e'].reduce((a, d) => {
        if (points[coord][d]) return a.concat([[{ r: pr, c: pc, d, i: d }]]);
        return a;
    }, []);

    while (paths.length > 0) {
        paths = paths.reduce((acc, cur) => {
            const newStep = JSON.parse(JSON.stringify(cur[cur.length - 1]));
            switch (newStep.d) {
                case 'n':
                    newStep.r--;
                    break;
                case 's':
                    newStep.r++;
                    break;
                case 'w':
                    newStep.c--;
                    break;
                case 'e':
                    newStep.c++;
                    break;
            }

            if (allPointCoords.includes(`${newStep.r},${newStep.c}`)) {
                points[coord][newStep.i] = {
                    coord: `${newStep.r},${newStep.c}`,
                    length: cur.length
                };
                return acc;
            }

            const { r, c, d, i } = newStep;
            const possibleDirs = [];
            if (
                d !== 'n' &&
                r < grid.length - 1 &&
                grid[r + 1][c] !== '#' &&
                !cur.find(({ r: row, c: col }) => row === r + 1 && col === c)
            ) possibleDirs.push('s')
            if (
                d !== 's' &&
                r > 0 &&
                grid[r - 1][c] !== '#' &&
                !cur.find(({ r: row, c: col }) => row === r - 1 && col === c)
            ) possibleDirs.push('n')
            if (
                d !== 'w' &&
                c < grid[0].length - 1 &&
                grid[r][c + 1] !== '#' &&
                !cur.find(({ r: row, c: col }) => row === r && col === c + 1)
            ) possibleDirs.push('e')
            if (
                d !== 'e' &&
                c > 0 &&
                grid[r][c - 1] !== '#' &&
                !cur.find(({ r: row, c: col }) => row === r && col === c - 1)
            ) possibleDirs.push('w')
            if (possibleDirs.length <= 0) return acc;
            else if (possibleDirs.length >= 2) console.log('error');
            return acc.concat([[...cur, { r, c, d: possibleDirs[0], i }]]);
        }, []);
    }
});

// console.log(points);

const seen = [];
const dfs = (coord) => {
    if (coord === `${grid.length - 1},${grid[0].length - 2}`) return 0;

    let m = -Infinity;

    seen.push(coord);
    const point = points[coord];
    Object.keys(point).forEach(dir => {
        if (!seen.includes(point[dir].coord))
            m = Math.max(m, dfs(point[dir].coord) + points[coord][dir].length)
    });
    const x = seen.pop();
    if (x !== coord) console.error('error 2');

    return m;
}

console.log(dfs('0,1'))