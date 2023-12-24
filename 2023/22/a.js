const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/example.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const bricks = {};
const max = { x: 0, y: 0, z: 0 };
lines.forEach((line, i) => {
    const id = i + 1;
    const [start, end] = line.split('~');
    const [sx, sy, sz] = start.split(',').map(c => parseInt(c));
    const [ex, ey, ez] = end.split(',').map(c => parseInt(c));
    if (ex < sx || ey < sy || ez < sz) {
        console.error('end before start');
    }
    if (ex > max.x) max.x = ex;
    if (ey > max.y) max.y = ey;
    if (ez > max.z) max.z = ez;
    bricks[id] = { sx, ex, sy, ey, sz, ez };
});

let space;

const printSpace = () => {
    for (let z = space.length - 1; z >= 1; z--) {
        const grid = space[z];
        console.log(grid.map(y => y.join('')).join(','))
    }
    console.log();
}

const render = (thisBricks) => {
    space = new Array(max.z + 1).fill(null).map(
        () => new Array(max.y + 1).fill(null).map(
            () => new Array(max.x + 1).fill(null).map(() => '.')
        )
    );

    Object.keys(thisBricks).forEach(brickId => {
        const { sx, ex, sy, ey, sz, ez } = thisBricks[brickId];
        for (let x = sx; x <= ex; x++) {
            for (let y = sy; y <= ey; y++) {
                for (let z = sz; z <= ez; z++) {
                    space[z][y][x] = brickId;
                }
            }
        }
    });
}

const checkFall = ({ sx, ex, sy, ey, sz }) => {
    let canFall = sz > 1;
    if (canFall) {
        for (let x = sx; x <= ex; x++) {
            for (let y = sy; y <= ey; y++) {
                if (space[sz - 1][y][x] !== '.') canFall = false;
            }
        }
    }
    return canFall;
}

render(bricks);
let canAnyFall = true;
while (canAnyFall) {
    // render(bricks);
    canAnyFall = false;
    Object.keys(bricks).forEach(brickId => {
        const canFall = checkFall(bricks[brickId]);
        canAnyFall = canAnyFall || canFall;
        if (canFall) {
            for (let x = bricks[brickId].sx; x <= bricks[brickId].ex; x++) {
                for (let y = bricks[brickId].sy; y <= bricks[brickId].ey; y++) {
                    space[bricks[brickId].ez][y][x] = '.';
                    space[bricks[brickId].sz - 1][y][x] = brickId;
                }
            }
            bricks[brickId].sz--;
            bricks[brickId].ez--;
        }
    });

    // printSpace();
};

let answer = 0;
Object.keys(bricks).forEach(brickId => {
    const newBricks = {};
    Object.keys(bricks).forEach(bId => {
        if (bId !== brickId) {
            newBricks[bId] = bricks[bId];
        }
    });

    render(newBricks);
    let canAnyFall = false;
    Object.keys(newBricks).forEach(brickId => {
        const canFall = checkFall(newBricks[brickId]);
        canAnyFall = canAnyFall || canFall;
    });
    if (!canAnyFall) answer++;
});

console.log(answer);