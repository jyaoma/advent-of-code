const inputTemplatePersonal = "SCVHKHVSHPVCNBKBPVHV";

const inputPairsPersonal = [
  { from: "SB", to: "B" },
  { from: "HH", to: "P" },
  { from: "VF", to: "N" },
  { from: "BS", to: "S" },
  { from: "NC", to: "C" },
  { from: "BF", to: "H" },
  { from: "BN", to: "H" },
  { from: "SP", to: "H" },
  { from: "BK", to: "H" },
  { from: "FF", to: "N" },
  { from: "VN", to: "B" },
  { from: "FN", to: "C" },
  { from: "FS", to: "S" },
  { from: "PP", to: "F" },
  { from: "ON", to: "H" },
  { from: "FV", to: "F" },
  { from: "KO", to: "F" },
  { from: "PK", to: "H" },
  { from: "VB", to: "S" },
  { from: "HS", to: "B" },
  { from: "NV", to: "O" },
  { from: "PN", to: "S" },
  { from: "VH", to: "B" },
  { from: "OS", to: "P" },
  { from: "BP", to: "H" },
  { from: "OV", to: "B" },
  { from: "HK", to: "S" },
  { from: "NN", to: "K" },
  { from: "SV", to: "C" },
  { from: "PB", to: "F" },
  { from: "SK", to: "F" },
  { from: "FB", to: "S" },
  { from: "NB", to: "K" },
  { from: "HF", to: "P" },
  { from: "FK", to: "K" },
  { from: "KV", to: "P" },
  { from: "PV", to: "F" },
  { from: "BC", to: "S" },
  { from: "FO", to: "N" },
  { from: "HC", to: "F" },
  { from: "CP", to: "B" },
  { from: "KK", to: "F" },
  { from: "PC", to: "S" },
  { from: "HN", to: "O" },
  { from: "SH", to: "H" },
  { from: "CK", to: "P" },
  { from: "CO", to: "F" },
  { from: "HP", to: "K" },
  { from: "PS", to: "C" },
  { from: "KP", to: "F" },
  { from: "OF", to: "K" },
  { from: "KS", to: "F" },
  { from: "NO", to: "V" },
  { from: "CB", to: "K" },
  { from: "NF", to: "N" },
  { from: "SF", to: "F" },
  { from: "SC", to: "P" },
  { from: "FC", to: "V" },
  { from: "BV", to: "B" },
  { from: "SS", to: "O" },
  { from: "KC", to: "K" },
  { from: "FH", to: "C" },
  { from: "OP", to: "C" },
  { from: "CF", to: "K" },
  { from: "VO", to: "V" },
  { from: "VK", to: "H" },
  { from: "KH", to: "O" },
  { from: "NP", to: "V" },
  { from: "NH", to: "O" },
  { from: "NS", to: "V" },
  { from: "BH", to: "C" },
  { from: "CH", to: "S" },
  { from: "CC", to: "F" },
  { from: "CS", to: "P" },
  { from: "SN", to: "F" },
  { from: "BO", to: "S" },
  { from: "NK", to: "S" },
  { from: "OO", to: "P" },
  { from: "VV", to: "F" },
  { from: "FP", to: "V" },
  { from: "OK", to: "C" },
  { from: "SO", to: "H" },
  { from: "KN", to: "P" },
  { from: "HO", to: "O" },
  { from: "PO", to: "H" },
  { from: "VS", to: "N" },
  { from: "PF", to: "N" },
  { from: "CV", to: "F" },
  { from: "BB", to: "H" },
  { from: "VC", to: "H" },
  { from: "HV", to: "B" },
  { from: "CN", to: "S" },
  { from: "OH", to: "K" },
  { from: "KF", to: "K" },
  { from: "HB", to: "S" },
  { from: "OC", to: "H" },
  { from: "KB", to: "P" },
  { from: "OB", to: "C" },
  { from: "VP", to: "C" },
  { from: "PH", to: "K" },
];

const inputTemplateExample = "NNCB";

const inputPairsExample = [
  { from: "CH", to: "B" },
  { from: "HH", to: "N" },
  { from: "CB", to: "H" },
  { from: "NH", to: "C" },
  { from: "HB", to: "C" },
  { from: "HC", to: "B" },
  { from: "HN", to: "C" },
  { from: "NN", to: "C" },
  { from: "BH", to: "H" },
  { from: "NC", to: "B" },
  { from: "NB", to: "B" },
  { from: "BN", to: "B" },
  { from: "BB", to: "N" },
  { from: "BC", to: "B" },
  { from: "CC", to: "N" },
  { from: "CN", to: "C" },
];

// const inputTemplate = inputTemplateExample;
const inputTemplate = inputTemplatePersonal;
// const inputPairs = inputPairsExample;
const inputPairs = inputPairsPersonal;

const parsedInputPairs = {};
inputPairs.forEach(
  ({ from, to }) =>
    (parsedInputPairs[from] = [`${from[0]}${to}`, `${to}${from[1]}`])
);

let result = {};
for (let i = 0; i < inputTemplate.length - 1; i++) {
  const key = inputTemplate.slice(i, i+2);
  if (!result[key]) result[key] = 0;
  result[key]++;
}

for (let step = 0; step < 40; step++) {
  console.log(step);
  const newResult = {};
  Object.keys(result).forEach(key => {
    let count = result[key];
    const [nextA, nextB] = parsedInputPairs[key];
    if (!newResult[nextA]) newResult[nextA] = 0;
    newResult[nextA] += count;
    if (!newResult[nextB]) newResult[nextB] = 0;
    newResult[nextB] += count;
  })
  result = newResult;
};

const count = {};
Object.keys(result).forEach(key => {
  let pairCount = result[key];
  const firstChar = key[0];
  if (!count[firstChar]) count[firstChar] = 0;
  count[firstChar] += pairCount;
});
const lastChar = inputTemplate[inputTemplate.length - 1];
if (!count[lastChar]) count[lastChar] = 0;
count[lastChar]++;

const sorted = Object.values(count).sort((a, b) => a - b);
const answer = sorted[sorted.length - 1] - sorted[0];
console.log(answer);
