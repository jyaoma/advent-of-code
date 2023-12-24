const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

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
        console.log(grid.map(y => y.map(num => {
            if (num === '.') return '.... ';
            if (num < 10) return `000${num} `;
            if (num < 100) return `00${num} `;
            if (num < 1000) return `0${num} `;
            return `${num} `;
        }).join('')).join(','))
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

    // printSpace();
}

const checkFall = ({ sx, ex, sy, ey, sz }) => {
    let canFall = sz > 1;
    for (let x = sx; x <= ex; x++) {
        for (let y = sy; y <= ey; y++) {
            if (space[sz - 1][y][x] !== '.') canFall = false;
        }
    }
    return canFall;
}

let canAnyFall = true;
while (canAnyFall) {
    render(bricks);
    canAnyFall = false;
    Object.keys(bricks).forEach(brickId => {
        const canFall = checkFall(bricks[brickId]);
        if (canFall) {
            bricks[brickId].sz--;
            bricks[brickId].ez--;
        }
        canAnyFall = canAnyFall || canFall;
    });
};

let answer = [];
Object.keys(bricks).forEach(brickId => {
    if (brickId % 100 === 0) console.log(brickId);
    const newBricks = {};
    Object.keys(bricks).forEach(bId => {
        if (bId !== brickId) {
            newBricks[bId] = bricks[bId];
        }
    });

    // render(newBricks);
    let canAnyFall = true;
    while (canAnyFall) {
        render(newBricks);
        canAnyFall = false;
        Object.keys(newBricks).forEach(brickId2 => {
            const canFall = checkFall(newBricks[brickId2]);
            if (canFall) {
                for (let x = newBricks[brickId2].sx; x <= newBricks[brickId2].ex; x++) {
                    for (let y = newBricks[brickId2].sy; y <= newBricks[brickId2].ey; y++) {
                        space[newBricks[brickId2].ez][y][x] = '.'
                        space[newBricks[brickId2].sz - 1][y][x] = brickId2
                    }
                }
                newBricks[brickId2].sz--;
                newBricks[brickId2].ez--;
                if (!answer.includes(`${brickId},${brickId2}`)) {
                    answer.push(`${brickId},${brickId2}`)
                }
            }
            
            // render(newBricks);
            canAnyFall = canAnyFall || canFall;
        });

        // if (brickId < 2) printSpace();
    };
});

// console.log(answer);
console.log(answer.length);