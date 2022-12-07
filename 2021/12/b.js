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
  if (!tunnels[from].includes(to) && to !== "start") tunnels[from].push(to);
  if (!tunnels[to]) tunnels[to] = [];
  if (!tunnels[to].includes(from) && from !== "start") tunnels[to].push(from);
});

console.log(tunnels);

const paths = [];

const isDoubledStack = (stack) => {
  const memory = {};
  stack.forEach((item) => {
    if (item[0] === item[0].toLowerCase()) {
      if (!memory[item]) {
        memory[item] = 0;
      }
      memory[item]++;
    }
  });

  return Object.values(memory).filter((count) => count > 1).length > 0;
};

const explore = (caveName, stack) => {
  const newStack = stack.concat(caveName);
  const hasDoubled = isDoubledStack(newStack);

  if (caveName === "end") {
    paths.push(newStack.join(","));
  } else {
    const options = tunnels[caveName]
      .filter((cave) => {
        return (
          cave[0] === cave[0].toUpperCase() ||
          !hasDoubled ||
          !stack.includes(cave)
        );
      })
      .sort();

    options.forEach((cave) => {
      explore(cave, newStack);
    });
  }
};

explore("start", []);

console.log(paths);
console.log(paths.length);
