const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const hail = lines.map(line => {
    const [position, velocity] = line.split(' @ ');
    const [px, py, pz] = position.split(', ').map(x => parseInt(x));
    const [vx, vy, vz] = velocity.split(', ').map(x => parseInt(x));
    return { px, py, pz, vx, vy, vz };
});

const min = 200000000000000;
const max = 400000000000000;
let counter = 0;

for (let a = 0; a < hail.length - 1; a++) {
    const hailA = hail[a];
    for (let b = a + 1; b < hail.length; b++) {
        const hailB = hail[b];

        if (hailA.vx * hailB.vy - hailA.vy * hailB.vx === 0) {
            // console.log(`${a} and ${b} are parallel`);
            continue;
        } else {
            const c1 = hailB.px - hailA.px;
            const c2 = hailB.py - hailA.py;
            const a1 = hailA.vx;
            const a2 = hailA.vy;
            const b1 = hailB.vx * -1;
            const b2 = hailB.vy * -1;

            const x = (c1 * b2 - b1 * c2) / (a1 * b2 - b1 * a2);
            const y = (a1 * c2 - c1 * a2) / (a1 * b2 - b1 * a2);

            const int = [
                x * hailA.vx + hailA.px,
                x * hailA.vy + hailA.py
            ];

            if (int[0] >= min && int[0] <= max && int[1] >= min && int[1] <= max && x >= 0 && y >= 0) {
                counter++;
            }
        }
    }
}

console.log(counter);