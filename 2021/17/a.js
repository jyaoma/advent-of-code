const inputPersonal = {
  x1: 70,
  x2: 125,
  y1: -159,
  y2: -121,
};

const inputExample = {
  x1: 20,
  x2: 30,
  y1: -10,
  y2: -5,
};

// const input = inputPersonal;
const input = inputExample;

const printBoard = (coords) => {
  const boundaries = coords.reduce(
    (acc, { x, y }) => {
      const clonedBounds = JSON.parse(JSON.stringify(acc));
      if (x < clonedBounds.x1) clonedBounds.x1 = x;
      if (x > clonedBounds.x2) clonedBounds.x2 = x;
      if (y > clonedBounds.y1) clonedBounds.y1 = y;
      if (y < clonedBounds.y2) clonedBounds.y2 = y;
      return clonedBounds;
    },
    {
      x1: 0, // sub, left
      y1: 0, // sub, top
      x2: input.x2, // right wall of target
      y2: input.y1, // bottom wall of target
    }
  );

  const board = new Array(boundaries.y1 - boundaries.y2 + 1)
    .fill("oof")
    .map(() => new Array(boundaries.x2 - boundaries.x1 + 1).fill("."));

  // submarine
  board[boundaries.y1][-boundaries.x1] = "S";

  // target area
  for (let targetY = input.y2; targetY >= input.y1; targetY--) {
    for (let targetX = input.x1; targetX <= input.x2; targetX++) {
      board[boundaries.y1 - targetY][targetX - boundaries.x1] = "T";
    }
  }

  // probe
  coords.forEach(({ x, y }, index) => {
    if (index === 0) return;
    board[boundaries.y1 - y][x - boundaries.x1] = index;
  });

  board.forEach((line) => console.log(line.join(" ")));
};

const generateCoords = (xVel, yVel) => {
  let currentX = 0;
  let currentY = 0;
  let currentXVel = xVel;
  let currentYVel = yVel;
  const coords = [];
  while (currentY > input.y1) {
    coords.push({ x: currentX, y: currentY });
    currentX += currentXVel;
    currentY += currentYVel;
    if (currentXVel < 0) currentXVel++;
    else if (currentXVel > 0) currentXVel--;
    currentYVel--;
  }
  coords.push({ x: currentX, y: currentY });
  return coords;
};

const isInTargetArea = (coords) =>
  coords.reduce(
    (acc, { x, y }) =>
      acc || (x >= input.x1 && x <= input.x2 && y >= input.y1 && y <= input.x2),
    false
  );

// determine max velocities such that coords land in target area

const answerCoords = generateCoords(0, 158);
console.log(answerCoords.reduce((acc, { y }) => (acc > y ? acc : y), 0));
