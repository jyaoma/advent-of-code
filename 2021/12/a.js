const input = [
  "by-TW",
  "start-TW",
  "fw-end",
  "QZ-end",
  "JH-by",
  "ka-start",
  "ka-by",
  "end-JH",
  "QZ-cv",
  "vg-TI",
  "by-fw",
  "QZ-by",
  "JH-ka",
  "JH-vg",
  "vg-fw",
  "TW-cv",
  "QZ-vg",
  "ka-TW",
  "ka-QZ",
  "JH-fw",
  "vg-hu",
  "cv-start",
  "by-cv",
  "ka-cv",
];

const tunnels = {};

input.forEach((line) => {
  const [from, to] = line.split("-");

  if (!tunnels[from]) tunnels[from] = [];
  if (!tunnels[from].includes(to)) tunnels[from].push(to);
  if (!tunnels[to]) tunnels[to] = [];
  if (!tunnels[to].includes(from)) tunnels[to].push(from);
});

const paths = [];

const explore = (caveName, stack) => {
  const newStack = stack.concat(caveName);

  if (caveName === "end") {
    paths.push(newStack.join(","));
  } else {
    const options = tunnels[caveName].filter(
      (cave) => cave[0] === cave[0].toUpperCase() || !stack.includes(cave)
    );

    options.forEach((cave) => {
      explore(cave, newStack);
    });
  }
};

explore("start", []);

console.log(paths.length);
