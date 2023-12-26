const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const hail = lines.map(line => {
    const [position, velocity] = line.split(' @ ');
    const [px, py, pz] = position.split(', ').map(x => parseInt(x));
    const [vx, vy, vz] = velocity.split(', ').map(x => parseInt(x));
    return { px, py, pz, vx, vy, vz };
});

// explanation:
// https://www.youtube.com/watch?v=guOyA7Ijqgk
// https://github.com/DeadlyRedCube/AdventOfCode/blob/main/2023/AOC2023/D24.h

const A = hail[8];
const B = hail[10];
const C = hail[12];

const leftMatrix = [
    [ A.vy - B.vy, B.vx - A.vx,           0, B.py - A.py, A.px - B.px,           0 ],
    [ A.vy - C.vy, C.vx - A.vx,           0, C.py - A.py, A.px - C.px,           0 ],
    [ B.vz - A.vz,           0, A.vx - B.vx, A.pz - B.pz,           0, B.px - A.px ],
    [ C.vz - A.vz,           0, A.vx - C.vx, A.pz - C.pz,           0, C.px - A.px ],
    [           0, A.vz - B.vz, B.vy - A.vy,           0, B.pz - A.pz, A.py - B.py ],
    [           0, A.vz - C.vz, C.vy - A.vy,           0, C.pz - A.pz, A.py - C.py ]
];

const rightMatrix = [
    [(B.py * B.vx - B.px * B.vy) - (A.py * A.vx - A.px * A.vy)],
    [(C.py * C.vx - C.px * C.vy) - (A.py * A.vx - A.px * A.vy)],
    [(B.px * B.vz - B.pz * B.vx) - (A.px * A.vz - A.pz * A.vx)],
    [(C.px * C.vz - C.pz * C.vx) - (A.px * A.vz - A.pz * A.vx)],
    [(B.pz * B.vy - B.py * B.vz) - (A.pz * A.vy - A.py * A.vz)],
    [(C.pz * C.vy - C.py * C.vz) - (A.pz * A.vy - A.py * A.vz)]
]

const determinant = matrix => {
    if (matrix.length === 1 && matrix[0].length === 1) return matrix[0][0];
    let sum = 0;
    for (let r = 0; r < matrix.length; r++) {
        const coFactor = matrix[r][0];
        const subMatrix = [];
        for (let sr = 0; sr < matrix.length; sr++) {
            if (r === sr) continue;
            subMatrix.push(matrix[sr].slice(1));
        }
        const negative = r % 2 === 0 ? 1 : -1;
        sum += negative * coFactor * determinant(subMatrix);
    }
    return sum;
}

const transpose = matrix => {
    const result = [];
    for (let c = 0; c < matrix[0].length; c++) {
        const row = [];
        for (let r = 0; r < matrix.length; r++) {
            row.push(matrix[r][c])
        }
        result.push(row);
    }
    return result;
}

const adjugate = matrix => {
    const result = [];
    const transposed = transpose(matrix);

    for (let r = 0; r < matrix.length; r++) {
        const row = [];
        for (let c = 0; c < matrix[0].length; c++) {
            const subMatrix = [];
            for (let sr = 0; sr < matrix.length; sr++) {
                const sRow = [];
                for (let sc = 0; sc < matrix[0].length; sc++) {
                    if (sc !== c) sRow.push(transposed[sr][sc]);
                }
                if (sr !== r) subMatrix.push(sRow);
            }
            const negative = (r + c) % 2 === 0 ? 1 : -1;
            row.push(negative * determinant(subMatrix));
       }
       result.push(row);
    }
    return result;
}

const multiplyMatrix = (matrix1, matrix2) => {
    const result = [];
    for (let r2 = 0; r2 < matrix2.length; r2++) {
        const row = [];
        for (let c2 = 0; c2 < matrix2[0].length; c2++) {
            let sum = 0;
            for (let c1 = 0; c1 < matrix1[0].length; c1++) {
                sum += matrix1[r2][c1] * matrix2[c1][c2];
            }
            row.push(sum);
        }
        result.push(row);
    }
    return result;
}

// console.log(leftMatrix);
// console.log(rightMatrix);

const multiplyCoFactor = (coFactor, matrix) => matrix.map(row => row.map(item => item * coFactor));

// console.log(determinant(leftMatrix))
const inverse = matrix => multiplyCoFactor(1 / determinant(matrix), adjugate(matrix))

// console.log(leftMatrix);
const invMatrix = inverse(leftMatrix);

// console.log(invMatrix);
// console.log(rightMatrix);
const res = multiplyMatrix(invMatrix, rightMatrix);

console.log(res);
console.log(res[0][0] + res[1][0] + res[2][0]);