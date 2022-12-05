const actualInput = [
  '    [G] [R]                 [P]    ',
  '    [H] [W]     [T] [P]     [H]    ',
  '    [F] [T] [P] [B] [D]     [N]    ',
  '[L] [T] [M] [Q] [L] [C]     [Z]    ',
  '[C] [C] [N] [V] [S] [H]     [V] [G]',
  '[G] [L] [F] [D] [M] [V] [T] [J] [H]',
  '[M] [D] [J] [F] [F] [N] [C] [S] [F]',
  '[Q] [R] [V] [J] [N] [R] [H] [G] [Z]',
  ' 1   2   3   4   5   6   7   8   9 ',
  '',
  'move 5 from 8 to 2',
  'move 2 from 4 to 5',
  'move 3 from 3 to 9',
  'move 4 from 1 to 8',
  'move 5 from 9 to 1',
  'move 3 from 3 to 8',
  'move 2 from 4 to 7',
  'move 6 from 6 to 5',
  'move 5 from 2 to 4',
  'move 2 from 9 to 1',
  'move 1 from 7 to 1',
  'move 4 from 7 to 3',
  'move 5 from 1 to 5',
  'move 3 from 1 to 4',
  'move 8 from 5 to 3',
  'move 7 from 3 to 2',
  'move 10 from 4 to 7',
  'move 1 from 7 to 3',
  'move 1 from 6 to 2',
  'move 3 from 8 to 4',
  'move 4 from 3 to 2',
  'move 1 from 1 to 2',
  'move 4 from 3 to 1',
  'move 2 from 1 to 7',
  'move 3 from 5 to 1',
  'move 7 from 8 to 4',
  'move 9 from 5 to 1',
  'move 9 from 2 to 7',
  'move 6 from 4 to 9',
  'move 14 from 7 to 5',
  'move 2 from 1 to 4',
  'move 6 from 7 to 1',
  'move 4 from 4 to 9',
  'move 6 from 2 to 8',
  'move 2 from 4 to 9',
  'move 2 from 9 to 3',
  'move 3 from 8 to 3',
  'move 5 from 9 to 4',
  'move 1 from 2 to 9',
  'move 5 from 5 to 3',
  'move 3 from 2 to 7',
  'move 1 from 1 to 4',
  'move 3 from 7 to 5',
  'move 4 from 9 to 6',
  'move 2 from 9 to 3',
  'move 5 from 1 to 6',
  'move 7 from 6 to 5',
  'move 1 from 2 to 3',
  'move 10 from 1 to 5',
  'move 1 from 8 to 3',
  'move 14 from 3 to 7',
  'move 1 from 8 to 4',
  'move 2 from 6 to 1',
  'move 28 from 5 to 9',
  'move 1 from 2 to 1',
  'move 5 from 4 to 6',
  'move 2 from 4 to 3',
  'move 13 from 7 to 8',
  'move 1 from 3 to 5',
  'move 1 from 5 to 2',
  'move 1 from 3 to 6',
  'move 1 from 5 to 6',
  'move 22 from 9 to 1',
  'move 1 from 2 to 7',
  'move 3 from 9 to 5',
  'move 2 from 7 to 5',
  'move 18 from 1 to 4',
  'move 7 from 8 to 3',
  'move 4 from 6 to 8',
  'move 2 from 5 to 8',
  'move 5 from 3 to 9',
  'move 2 from 5 to 1',
  'move 3 from 6 to 8',
  'move 1 from 5 to 9',
  'move 2 from 3 to 6',
  'move 10 from 1 to 5',
  'move 15 from 8 to 6',
  'move 10 from 6 to 8',
  'move 1 from 9 to 4',
  'move 1 from 1 to 3',
  'move 4 from 4 to 3',
  'move 5 from 3 to 5',
  'move 9 from 5 to 6',
  'move 13 from 6 to 5',
  'move 8 from 5 to 7',
  'move 8 from 9 to 6',
  'move 2 from 6 to 4',
  'move 2 from 6 to 2',
  'move 3 from 7 to 4',
  'move 2 from 2 to 8',
  'move 1 from 5 to 4',
  'move 3 from 7 to 9',
  'move 1 from 5 to 9',
  'move 5 from 6 to 9',
  'move 10 from 8 to 3',
  'move 3 from 8 to 1',
  'move 5 from 9 to 2',
  'move 1 from 6 to 4',
  'move 4 from 5 to 6',
  'move 7 from 3 to 7',
  'move 5 from 6 to 5',
  'move 19 from 4 to 8',
  'move 15 from 8 to 3',
  'move 2 from 1 to 5',
  'move 7 from 5 to 9',
  'move 2 from 7 to 2',
  'move 3 from 3 to 8',
  'move 5 from 5 to 8',
  'move 10 from 9 to 3',
  'move 1 from 4 to 2',
  'move 10 from 8 to 3',
  'move 29 from 3 to 2',
  'move 2 from 3 to 4',
  'move 1 from 1 to 5',
  'move 2 from 8 to 4',
  'move 1 from 9 to 1',
  'move 1 from 3 to 9',
  'move 1 from 1 to 9',
  'move 2 from 3 to 4',
  'move 33 from 2 to 1',
  'move 2 from 2 to 4',
  'move 1 from 3 to 1',
  'move 22 from 1 to 2',
  'move 6 from 4 to 9',
  'move 4 from 7 to 1',
  'move 16 from 1 to 4',
  'move 3 from 7 to 6',
  'move 2 from 9 to 4',
  'move 1 from 5 to 2',
  'move 9 from 4 to 2',
  'move 1 from 6 to 5',
  'move 7 from 4 to 2',
  'move 6 from 9 to 8',
  'move 4 from 4 to 9',
  'move 4 from 8 to 3',
  'move 2 from 4 to 3',
  'move 2 from 2 to 5',
  'move 2 from 5 to 2',
  'move 1 from 5 to 6',
  'move 3 from 9 to 5',
  'move 1 from 6 to 8',
  'move 2 from 6 to 5',
  'move 1 from 3 to 2',
  'move 1 from 8 to 4',
  'move 2 from 8 to 2',
  'move 5 from 5 to 6',
  'move 44 from 2 to 8',
  'move 1 from 4 to 8',
  'move 3 from 6 to 8',
  'move 2 from 6 to 2',
  'move 37 from 8 to 3',
  'move 1 from 9 to 4',
  'move 1 from 2 to 5',
  'move 5 from 8 to 6',
  'move 1 from 4 to 6',
  'move 1 from 2 to 4',
  'move 16 from 3 to 2',
  'move 1 from 4 to 5',
  'move 1 from 8 to 3',
  'move 4 from 8 to 2',
  'move 1 from 8 to 7',
  'move 2 from 5 to 8',
  'move 15 from 2 to 4',
  'move 5 from 6 to 3',
  'move 1 from 7 to 4',
  'move 1 from 8 to 9',
  'move 1 from 6 to 7',
  'move 1 from 8 to 3',
  'move 2 from 2 to 8',
  'move 1 from 9 to 3',
  'move 2 from 8 to 4',
  'move 1 from 4 to 6',
  'move 33 from 3 to 7',
  'move 1 from 6 to 3',
  'move 1 from 4 to 8',
  'move 1 from 8 to 9',
  'move 4 from 4 to 3',
  'move 9 from 4 to 7',
  'move 3 from 4 to 8',
  'move 11 from 7 to 2',
  'move 14 from 7 to 6',
  'move 1 from 8 to 3',
  'move 1 from 9 to 5',
  'move 1 from 5 to 1',
  'move 8 from 2 to 9',
  'move 1 from 8 to 7',
  'move 6 from 3 to 6',
  'move 18 from 6 to 4',
  'move 1 from 2 to 7',
  'move 1 from 3 to 6',
  'move 14 from 4 to 2',
  'move 4 from 4 to 3',
  'move 3 from 6 to 3',
  'move 19 from 2 to 6',
  'move 16 from 6 to 8',
  'move 1 from 1 to 8',
  'move 16 from 8 to 7',
  'move 3 from 9 to 4',
  'move 3 from 6 to 2',
  'move 3 from 4 to 7',
  'move 4 from 3 to 2',
  'move 2 from 2 to 4',
  'move 4 from 9 to 8',
  'move 5 from 2 to 8',
  'move 29 from 7 to 5',
  'move 6 from 8 to 2',
  'move 2 from 3 to 4',
  'move 2 from 2 to 6',
  'move 1 from 3 to 5',
  'move 4 from 2 to 6',
  'move 8 from 7 to 5',
  'move 1 from 7 to 5',
  'move 2 from 8 to 6',
  'move 1 from 8 to 7',
  'move 6 from 6 to 1',
  'move 2 from 7 to 6',
  'move 1 from 9 to 7',
  'move 3 from 1 to 7',
  'move 3 from 6 to 1',
  'move 1 from 7 to 6',
  'move 3 from 1 to 6',
  'move 1 from 1 to 5',
  'move 4 from 6 to 3',
  'move 2 from 4 to 2',
  'move 38 from 5 to 6',
  'move 3 from 3 to 8',
  'move 4 from 8 to 6',
  'move 22 from 6 to 8',
  'move 1 from 7 to 8',
  'move 2 from 6 to 2',
  'move 2 from 5 to 2',
  'move 2 from 2 to 1',
  'move 2 from 4 to 6',
  'move 2 from 2 to 1',
  'move 1 from 1 to 9',
  'move 2 from 8 to 5',
  'move 2 from 2 to 8',
  'move 2 from 5 to 2',
  'move 2 from 7 to 2',
  'move 1 from 3 to 1',
  'move 4 from 1 to 8',
  'move 1 from 9 to 5',
  'move 1 from 1 to 7',
  'move 1 from 2 to 8',
  'move 29 from 8 to 3',
  'move 15 from 3 to 2',
  'move 12 from 2 to 5',
  'move 1 from 1 to 6',
  'move 3 from 2 to 1',
  'move 6 from 3 to 8',
  'move 2 from 3 to 9',
  'move 1 from 6 to 7',
  'move 12 from 5 to 8',
  'move 2 from 7 to 1',
  'move 2 from 1 to 4',
  'move 2 from 4 to 2',
  'move 1 from 5 to 8',
  'move 1 from 3 to 6',
  'move 2 from 3 to 4',
  'move 3 from 1 to 4',
  'move 5 from 8 to 9',
  'move 4 from 4 to 2',
  'move 5 from 9 to 6',
  'move 26 from 6 to 8',
  'move 7 from 2 to 8',
  'move 3 from 3 to 1',
  'move 1 from 6 to 4',
  'move 14 from 8 to 6',
  'move 2 from 1 to 2',
  'move 1 from 1 to 3',
  'move 18 from 8 to 5',
  'move 15 from 8 to 2',
  'move 5 from 6 to 8',
  'move 4 from 5 to 8',
  'move 7 from 2 to 5',
  'move 2 from 9 to 6',
  'move 1 from 2 to 1',
  'move 7 from 2 to 3',
  'move 7 from 8 to 1',
  'move 2 from 6 to 3',
  'move 1 from 4 to 6',
  'move 2 from 8 to 6',
  'move 10 from 3 to 9',
  'move 18 from 5 to 8',
  'move 1 from 4 to 6',
  'move 2 from 1 to 9',
  'move 12 from 6 to 9',
  'move 1 from 6 to 9',
  'move 9 from 8 to 4',
  'move 6 from 1 to 2',
  'move 3 from 8 to 9',
  'move 14 from 9 to 8',
  'move 5 from 4 to 9',
  'move 2 from 4 to 5',
  'move 16 from 8 to 5',
  'move 12 from 5 to 4',
  'move 7 from 5 to 1',
  'move 1 from 1 to 8',
  'move 1 from 5 to 8',
  'move 1 from 4 to 9',
  'move 8 from 2 to 7',
  'move 12 from 4 to 3',
  'move 2 from 2 to 5',
  'move 1 from 3 to 2',
  'move 3 from 5 to 4',
  'move 1 from 4 to 8',
  'move 3 from 4 to 9',
  'move 18 from 9 to 8',
  'move 8 from 3 to 1',
  'move 5 from 8 to 1',
  'move 1 from 2 to 5',
  'move 3 from 7 to 1',
  'move 3 from 7 to 5',
  'move 1 from 8 to 9',
  'move 5 from 9 to 7',
  'move 2 from 3 to 6',
  'move 16 from 1 to 4',
  'move 14 from 8 to 6',
  'move 2 from 5 to 6',
  'move 4 from 1 to 6',
  'move 3 from 4 to 9',
  'move 15 from 6 to 1',
  'move 5 from 4 to 3',
  'move 2 from 8 to 2',
  'move 6 from 4 to 3',
  'move 15 from 1 to 5',
  'move 14 from 5 to 3',
  'move 5 from 6 to 2',
  'move 2 from 4 to 7',
  'move 1 from 1 to 6',
  'move 2 from 3 to 4',
  'move 3 from 8 to 1',
  'move 1 from 5 to 1',
  'move 5 from 7 to 1',
  'move 7 from 1 to 3',
  'move 3 from 6 to 2',
  'move 4 from 9 to 5',
  'move 2 from 4 to 3',
  'move 4 from 7 to 9',
  'move 8 from 2 to 9',
  'move 1 from 9 to 1',
  'move 2 from 2 to 8',
  'move 11 from 9 to 1',
  'move 6 from 5 to 1',
  'move 21 from 3 to 2',
  'move 1 from 8 to 5',
  'move 5 from 1 to 7',
  'move 12 from 1 to 8',
  'move 1 from 5 to 2',
  'move 5 from 3 to 2',
  'move 4 from 7 to 2',
  'move 1 from 7 to 8',
  'move 13 from 2 to 5',
  'move 13 from 2 to 5',
  'move 2 from 2 to 1',
  'move 1 from 1 to 9',
  'move 26 from 5 to 4',
  'move 3 from 2 to 7',
  'move 2 from 3 to 9',
  'move 1 from 1 to 6',
  'move 5 from 3 to 2',
  'move 2 from 9 to 6',
  'move 1 from 1 to 8',
  'move 3 from 1 to 6',
  'move 24 from 4 to 9',
  'move 13 from 9 to 1',
  'move 2 from 6 to 2',
  'move 3 from 7 to 5',
  'move 2 from 9 to 7',
  'move 8 from 8 to 3',
  'move 4 from 8 to 5',
  'move 2 from 7 to 2',
  'move 8 from 9 to 4',
  'move 10 from 1 to 2',
  'move 1 from 9 to 1',
  'move 1 from 9 to 2',
  'move 4 from 3 to 2',
  'move 4 from 1 to 8',
  'move 3 from 4 to 8',
  'move 12 from 2 to 3',
  'move 3 from 4 to 6',
  'move 5 from 3 to 2',
  'move 9 from 3 to 9',
  'move 4 from 2 to 9',
  'move 1 from 3 to 7',
  'move 6 from 8 to 2',
  'move 4 from 6 to 8',
  'move 1 from 3 to 8',
  'move 6 from 9 to 1',
  'move 2 from 1 to 8',
  'move 5 from 5 to 8',
  'move 3 from 6 to 8',
  'move 1 from 5 to 1',
  'move 7 from 8 to 2',
  'move 1 from 1 to 4',
  'move 1 from 4 to 6',
  'move 1 from 9 to 4',
  'move 1 from 5 to 9',
  'move 1 from 4 to 7',
  'move 12 from 8 to 2',
  'move 4 from 4 to 3',
  'move 2 from 3 to 1',
  'move 1 from 7 to 2',
  'move 1 from 6 to 8',
  'move 1 from 8 to 6',
  'move 4 from 9 to 3',
  'move 1 from 9 to 3',
  'move 13 from 2 to 3',
  'move 3 from 1 to 7',
  'move 2 from 9 to 4',
  'move 2 from 1 to 9',
  'move 2 from 7 to 2',
  'move 1 from 4 to 1',
  'move 2 from 7 to 5',
  'move 14 from 3 to 8',
  'move 1 from 8 to 5',
  'move 2 from 1 to 4',
  'move 2 from 3 to 4',
  'move 2 from 3 to 4',
  'move 10 from 8 to 3',
  'move 2 from 4 to 8',
  'move 1 from 9 to 3',
  'move 3 from 2 to 3',
  'move 16 from 2 to 4',
  'move 1 from 8 to 5',
  'move 11 from 3 to 4',
  'move 2 from 3 to 7',
  'move 3 from 5 to 1',
  'move 1 from 1 to 2',
  'move 3 from 2 to 5',
  'move 1 from 1 to 9',
  'move 2 from 7 to 4',
  'move 8 from 4 to 3',
  'move 1 from 6 to 7',
  'move 1 from 8 to 6',
  'move 1 from 5 to 1',
  'move 6 from 3 to 5',
  'move 2 from 1 to 3',
  'move 5 from 5 to 7',
  'move 2 from 7 to 2',
  'move 2 from 3 to 4',
  'move 4 from 7 to 1',
  'move 1 from 6 to 8',
  'move 1 from 2 to 1',
  'move 3 from 1 to 6',
  'move 2 from 9 to 6',
  'move 8 from 2 to 1',
  'move 2 from 6 to 2',
  'move 2 from 6 to 3',
  'move 6 from 3 to 5',
  'move 2 from 4 to 6',
  'move 2 from 2 to 9',
  'move 1 from 8 to 6',
  'move 2 from 6 to 5',
  'move 1 from 9 to 1',
  'move 11 from 5 to 8',
  'move 7 from 8 to 6',
  'move 23 from 4 to 1',
  'move 1 from 5 to 9',
  'move 1 from 4 to 6',
  'move 2 from 4 to 8',
  'move 1 from 3 to 1',
  'move 6 from 8 to 3',
  'move 2 from 9 to 6',
  'move 3 from 6 to 1',
  'move 3 from 8 to 7',
  'move 1 from 3 to 6',
  'move 18 from 1 to 2',
  'move 5 from 3 to 8',
  'move 13 from 2 to 9',
  'move 5 from 9 to 7',
  'move 1 from 8 to 6',
  'move 5 from 2 to 6',
  'move 2 from 1 to 7',
  'move 9 from 7 to 8',
  'move 11 from 8 to 6',
  'move 2 from 9 to 4',
  'move 16 from 6 to 1',
  'move 2 from 4 to 6',
  'move 1 from 8 to 9',
  'move 1 from 7 to 6',
  'move 8 from 1 to 5',
  'move 3 from 6 to 5',
  'move 8 from 6 to 4',
  'move 7 from 9 to 5',
  'move 1 from 8 to 1',
  'move 6 from 5 to 1',
  'move 9 from 5 to 7',
  'move 4 from 7 to 9',
  'move 1 from 4 to 8',
  'move 1 from 8 to 3',
  'move 1 from 1 to 8',
  'move 1 from 8 to 7',
  'move 22 from 1 to 3',
  'move 1 from 6 to 7',
  'move 2 from 9 to 4',
  'move 1 from 9 to 6',
  'move 1 from 9 to 4',
  'move 10 from 4 to 3',
  'move 1 from 1 to 2',
  'move 2 from 5 to 4',
  'move 27 from 3 to 8',
  'move 5 from 3 to 9',
];

const sampleInput = [
  '    [D]    ',
  '[N] [C]    ',
  '[Z] [M] [P]',
  ' 1   2   3 ',
  '',
  'move 1 from 2 to 1',
  'move 3 from 1 to 3',
  'move 2 from 2 to 1',
  'move 1 from 1 to 2',
];

const input = actualInput;

// find the empty line, everything above is stacks, everything below is instructions
let emptyLineNo = 0;
while (input[emptyLineNo] !== '') emptyLineNo++;

let stackParserLineNo = emptyLineNo - 2;
const layers = {};
while (stackParserLineNo >= 0) {
  const layer = input[stackParserLineNo];
  let stackParserColNo = 0;

  while (stackParserColNo * 4 + 1 < layer.length) {
    const cargo = layer[stackParserColNo * 4 + 1];
    if (cargo !== ' ') {
      if (!layers[stackParserColNo + 1]) layers[stackParserColNo + 1] = [];
      layers[stackParserColNo + 1].push(cargo);
    }
    stackParserColNo++;
  }

  stackParserLineNo--;
}

console.log(layers);

let instructionParserLineNo = emptyLineNo + 1;

while (instructionParserLineNo < input.length) {
  const instruction = input[instructionParserLineNo];
  const splitInstruction = instruction.split(/\s/g);
  const parsedInstruction = {
    move: splitInstruction[1],
    from: splitInstruction[3],
    to: splitInstruction[5],
  };

  let counter = 0;
  while (counter < parsedInstruction.move) {
    const cargo = layers[parsedInstruction.from].pop();
    layers[parsedInstruction.to].push(cargo)
    counter++;
  }

  instructionParserLineNo++;
}

console.log(layers);

let result = '';
for (let i = 1; i <= Object.keys(layers).length; i++) {
  result = result.concat(layers[i][layers[i].length - 1]);
}

console.log(result);