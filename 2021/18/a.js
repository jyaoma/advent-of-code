const inputPersonal = [
  "[1,[[3,6],[0,[6,3]]]]",
  "[[[5,2],[[5,0],6]],[6,[5,1]]]",
  "[[5,[[2,3],[7,1]]],[4,[9,[8,3]]]]",
  "[[8,[[3,4],[8,7]]],[[[4,0],[3,5]],[[0,1],6]]]",
  "[[1,[6,[9,0]]],[[7,[5,7]],[[8,9],3]]]",
  "[[[[6,7],[4,9]],7],9]",
  "[[7,3],[[8,9],[7,[4,2]]]]",
  "[[[4,[2,9]],[0,3]],[[4,[0,8]],[[4,4],3]]]",
  "[[[[6,9],9],8],[[[4,0],[1,6]],[4,[3,6]]]]",
  "[[4,[4,[3,3]]],[[2,1],[[6,1],[9,4]]]]",
  "[[5,[6,7]],[[[5,8],[4,3]],[4,[0,8]]]]",
  "[[6,[[9,6],5]],[0,[6,6]]]",
  "[[[[1,5],9],[[5,3],5]],[[[2,0],3],9]]",
  "[4,3]",
  "[[1,8],[[[1,0],[3,8]],3]]",
  "[[[[2,0],[6,5]],4],[[[9,8],[0,1]],3]]",
  "[[8,[7,8]],[[6,[3,2]],[[8,1],[7,5]]]]",
  "[[[[1,4],2],[[4,8],[3,2]]],[[[2,2],6],6]]",
  "[[[4,[0,5]],[[8,8],[7,2]]],[[4,[4,1]],2]]",
  "[[1,[4,[4,0]]],[2,[[2,3],1]]]",
  "[[[[2,1],0],[[3,4],1]],[[2,4],3]]",
  "[[9,[8,7]],[7,[0,[8,0]]]]",
  "[[[9,9],7],[[0,[2,1]],[[7,1],4]]]",
  "[[6,[[3,2],[0,0]]],[[[4,1],9],[7,3]]]",
  "[[[5,[5,6]],[[7,7],[7,8]]],4]",
  "[[8,[[4,1],4]],[[[6,4],[0,3]],[5,[6,4]]]]",
  "[[[9,0],[2,8]],[[6,5],5]]",
  "[[[3,[1,6]],[[5,3],6]],[[[7,4],[4,9]],[[2,3],[6,5]]]]",
  "[[8,[6,7]],6]",
  "[[[[6,0],[1,3]],[0,0]],[[[4,7],[7,8]],[[7,2],2]]]",
  "[[6,[[9,6],[1,1]]],7]",
  "[[[2,3],[6,0]],[3,[[9,3],9]]]",
  "[[[3,0],0],[[[6,0],3],[[1,5],4]]]",
  "[[8,[[0,3],8]],[[[0,8],[4,3]],[8,[3,4]]]]",
  "[[[4,4],0],[[1,[8,0]],[[9,6],3]]]",
  "[8,[[6,[6,7]],[8,7]]]",
  "[[8,[0,[1,4]]],3]",
  "[[[[9,5],0],[[5,3],[1,9]]],[[[7,3],5],[[4,3],9]]]",
  "[[[[9,0],[4,2]],[0,[3,2]]],1]",
  "[[[6,[4,2]],[[5,5],9]],[[[6,1],9],[[3,8],[8,1]]]]",
  "[[[3,[5,0]],[[5,2],[2,2]]],[[0,2],[7,4]]]",
  "[[3,[[5,7],[2,8]]],4]",
  "[[[4,8],5],0]",
  "[[[6,9],[[7,0],7]],[8,7]]",
  "[[7,[[1,3],[0,2]]],[[[4,8],0],[[7,0],6]]]",
  "[[[1,7],[6,6]],[[6,[4,0]],[0,4]]]",
  "[[[[2,2],[3,9]],9],3]",
  "[0,[[4,9],[[5,5],[5,9]]]]",
  "[[[[4,4],2],[6,4]],[[[4,1],[2,0]],[[9,4],0]]]",
  "[[[0,[3,4]],[2,3]],[[7,[2,3]],[3,3]]]",
  "[[[[0,3],9],7],[7,[4,[9,6]]]]",
  "[[9,[[0,8],4]],[5,[2,[4,9]]]]",
  "[[6,2],[[1,7],0]]",
  "[[[[1,6],[8,3]],1],[[[6,7],2],[[4,4],8]]]",
  "[[[[7,1],[0,3]],0],[5,[4,[8,4]]]]",
  "[[[[4,2],[6,2]],[[5,7],8]],[[7,9],4]]",
  "[[[0,[0,4]],5],2]",
  "[[2,[[0,6],6]],[[[3,4],3],[4,5]]]",
  "[[[[6,4],9],[[7,1],0]],[[[8,2],[3,2]],[[1,9],7]]]",
  "[7,[[7,8],[[5,5],0]]]",
  "[[[1,2],[8,5]],[[5,4],[8,0]]]",
  "[[4,[1,3]],[[[4,5],[1,2]],[5,1]]]",
  "[[[[0,7],[4,5]],[9,[2,2]]],[4,[[1,8],[7,5]]]]",
  "[[4,[[0,4],[8,8]]],[[[9,2],[7,1]],[8,[9,5]]]]",
  "[1,3]",
  "[[[[8,9],5],0],[1,6]]",
  "[[[[6,6],[3,5]],[[2,8],[3,3]]],[[[5,3],[5,9]],[0,[1,4]]]]",
  "[[7,[7,[5,5]]],[4,[4,[9,9]]]]",
  "[[[7,[6,7]],[4,2]],[0,[[7,8],1]]]",
  "[[[[6,0],4],[3,[6,9]]],5]",
  "[[[[9,8],6],[[7,4],[3,4]]],[[[8,8],[2,1]],0]]",
  "[9,[[1,7],[7,1]]]",
  "[6,[[3,[3,6]],[2,9]]]",
  "[[[6,9],[[1,4],2]],[7,3]]",
  "[[1,[6,[8,5]]],[[[0,0],0],[7,2]]]",
  "[[[4,[2,7]],[[0,0],8]],[[4,[4,5]],[[4,8],[3,3]]]]",
  "[[[[7,4],[7,5]],[[5,8],3]],[[[6,9],[0,9]],[[7,2],[4,0]]]]",
  "[4,[4,[9,[5,7]]]]",
  "[[[[8,7],3],[6,[0,5]]],[[[7,8],[5,1]],[[0,4],2]]]",
  "[6,[0,[4,3]]]",
  "[[[[6,5],3],7],[[[0,1],5],[6,[2,6]]]]",
  "[[[9,1],[[8,8],[8,2]]],0]",
  "[[[[3,4],1],3],[8,[[1,5],[5,6]]]]",
  "[[[[6,8],2],4],[[5,8],[[1,5],[7,0]]]]",
  "[[3,8],[[[9,0],2],[7,[5,8]]]]",
  "[[[[7,5],6],[[4,4],[5,0]]],[4,[3,[3,0]]]]",
  "[[[7,9],[1,[8,8]]],[[[6,8],4],4]]",
  "[[4,[[6,7],[5,7]]],[6,7]]",
  "[[[[8,8],[0,4]],[[5,5],1]],6]",
  "[[[7,7],[[5,8],[3,4]]],[[0,[7,4]],5]]",
  "[8,[[1,2],[6,9]]]",
  "[[[[9,5],[0,6]],[2,[8,7]]],[[[9,2],4],6]]",
  "[[[1,[5,2]],5],[[1,0],3]]",
  "[[7,[7,[3,7]]],[[2,6],3]]",
  "[1,[[8,[7,1]],[3,8]]]",
  "[[[[3,2],[5,6]],2],[7,[0,0]]]",
  "[[[7,[4,6]],[9,[7,8]]],9]",
  "[[[[4,3],9],8],[[8,5],6]]",
  "[3,[[3,1],[[8,4],8]]]",
  "[[[9,[3,5]],[[0,9],[8,5]]],5]",
];

const inputExample1 = [
  "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
  "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
  "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
  "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]",
  "[7,[5,[[3,8],[1,4]]]]",
  "[[2,[2,2]],[8,[8,1]]]",
  "[2,9]",
  "[1,[[[9,3],9],[[9,0],[0,7]]]]",
  "[[[5,[7,4]],7],1]",
  "[[[[4,2],2],6],[8,7]]",
];

const inputExample1Add = [
  "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
  "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
];

const inputExample2Add = [
  "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]",
  "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
];

const inputExample2 = [
  "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]",
  "[[[5,[2,8]],4],[5,[[9,9],0]]]",
  "[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]",
  "[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]",
  "[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]",
  "[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]",
  "[[[[5,4],[7,7]],8],[[8,3],8]]",
  "[[9,3],[[9,9],[6,[4,9]]]]",
  "[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]",
  "[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]",
];

const inputSimpleAdd = ["[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]"];

const input = inputPersonal;

let actionQueue = [];

const shiftActionQueueIndex = (index, shift) => {
  actionQueue = actionQueue.map((action) => ({
    ...action,
    index: action.index >= index ? action.index + shift : action.index,
  }));
};

// assumption that there won't ever be 6 layers of nesting

const splice = (str, index, num, insert) => {
  // const beforeLength = str.length;
  const result = `${str.slice(0, index)}${insert}${str.slice(index + num)}`;
  // shiftActionQueueIndex(index + num, result.length - beforeLength);
  // const debugText = Array(result.length).fill(" ");
  // debugText[index + num] = "f";
  // debugText[index + num + result.length - beforeLength] = "t";
  // console.log();
  // console.log(str);
  // console.log(debugText.join(""));
  // console.log(result);
  // console.log();
  return result;
};

const findDeepNesting = (unreducedSum) => {
  const tempActionQueue = [];
  let nestDepth = 0;
  unreducedSum.split("").forEach((char, index) => {
    if (char === "[") {
      if (nestDepth >= 4) {
        tempActionQueue.push({ action: "explode", index });
      }
      nestDepth++;
    }
    if (char === "]") nestDepth--;
  });
  actionQueue = tempActionQueue.concat(actionQueue);
};

const getFirstDeepNesting = (unreducedSum) => {
  let nestDepth = 0;
  let result = undefined;
  unreducedSum.split("").forEach((char, index) => {
    if (char === "[") {
      if (nestDepth >= 4 && !result) {
        result = { action: "explode", index };
      }
      nestDepth++;
    }
    if (char === "]") nestDepth--;
  });
  return result;
};

const explodePair = (sNum, index) => {
  // let tempActionQueue = [];
  let leftNumberIndex = null;
  let leftNumberLength = 0;
  let pairLeftNumberIndex = null;
  let pairLeftNumberLength = 0;
  let pairRightNumberIndex = null;
  let pairRightNumberLength = 0;
  let rightNumberIndex = null;
  let rightNumberLength = 0;

  sNum.split("").forEach((char, i) => {
    if (!"[],".includes(char)) {
      if (i < index) {
        if (i === leftNumberIndex + leftNumberLength) {
          leftNumberLength++;
        } else {
          leftNumberIndex = i;
          leftNumberLength = 1;
        }
      }
      if (i === index + 1) {
        pairLeftNumberIndex = i;
        pairLeftNumberLength = 1;
      }
      if (i === pairLeftNumberIndex + pairLeftNumberLength) {
        pairLeftNumberLength++;
      }
      if (i === pairLeftNumberIndex + pairLeftNumberLength + 1) {
        pairRightNumberIndex = i;
        pairRightNumberLength = 1;
      }
      if (i === pairRightNumberIndex + pairRightNumberLength) {
        pairRightNumberLength++;
      }
      if (
        pairRightNumberIndex &&
        pairRightNumberLength &&
        i > pairRightNumberIndex + pairRightNumberLength + 1
      ) {
        if (!rightNumberIndex) {
          rightNumberIndex = i;
          rightNumberLength = 1;
        } else if (i === rightNumberIndex + rightNumberLength) {
          rightNumberLength++;
        }
      }
    }
  });

  const leftNumber = leftNumberIndex
    ? parseInt(
        sNum.slice(leftNumberIndex, leftNumberIndex + leftNumberLength),
        10
      )
    : undefined;
  const pairLeftNumber = parseInt(
    sNum.slice(pairLeftNumberIndex, pairLeftNumberIndex + pairLeftNumberLength),
    10
  );
  const pairRightNumber = parseInt(
    sNum.slice(
      pairRightNumberIndex,
      pairRightNumberIndex + pairRightNumberLength
    ),
    10
  );
  const rightNumber = rightNumberIndex
    ? parseInt(
        sNum.slice(rightNumberIndex, rightNumberIndex + rightNumberLength),
        10
      )
    : undefined;

  // console.log("leftNumber", leftNumber);
  // console.log("pairLeftNumber", pairLeftNumber);
  // console.log("pairRightNumber", pairRightNumber);
  // console.log("rightNumber", rightNumber);

  // modify the two numbers
  let result = sNum.slice();
  // console.log(">", result);
  let modifiedLeftNumber;
  let modifiedRightNumber;
  if (rightNumber !== null && rightNumber !== undefined) {
    modifiedRightNumber = rightNumber + pairRightNumber;
    // console.log("modifiedRightNumber", modifiedRightNumber);
    // console.log(rightNumberIndex);
    // console.log(rightNumberLength);
    result = splice(
      result,
      rightNumberIndex,
      rightNumberLength,
      modifiedRightNumber
    );
    // console.log(">", result);
  }
  if (leftNumber !== null && leftNumber !== undefined) {
    modifiedLeftNumber = leftNumber + pairLeftNumber;
    // console.log("modifiedLeftNumber", modifiedLeftNumber);
    result = splice(
      result,
      leftNumberIndex,
      leftNumberLength,
      modifiedLeftNumber
    );
    // console.log(">", result);
  }
  // console.log(index);
  // console.log(index - leftNumberLength + `${modifiedLeftNumber}`.length);
  // console.log(
  //   result.slice(
  //     index - leftNumberLength + `${modifiedLeftNumber}`.length,
  //     index -
  //       leftNumberLength +
  //       `${modifiedLeftNumber}`.length +
  //       3 +
  //       pairLeftNumberLength +
  //       pairRightNumberLength
  //   )
  // );
  result = splice(
    result,
    leftNumber !== null && leftNumber !== undefined
      ? index - leftNumberLength + `${modifiedLeftNumber}`.length
      : index,
    3 + pairLeftNumberLength + pairRightNumberLength,
    "0"
  );
  // console.log(">", result);

  // actionQueue = actionQueue.concat(tempActionQueue);

  return result;
};

const findDoubleDigits = (unreducedSum) => {
  const tempActionQueue = [];
  let isNum = false;
  unreducedSum.forEach((char, index) => {
    if ("0123456789".includes(char)) {
      if (isNum) {
        tempActionQueue.push({ action: "split", index: index - 1 });
      }
      isNum = true;
    } else {
      isNum = false;
    }
  });

  actionQueue = tempActionQueue.concat(actionQueue);
};

const getFirstSplit = (unreducedSum) => {
  let startIndex = -1;
  let str = "";
  let result = undefined;
  unreducedSum.split("").forEach((char, index) => {
    if ("0123456789".includes(char)) {
      if (str === "") startIndex = index;
      str = str.concat(char);
    } else {
      const num = parseInt(str, 10);
      if (num > 9 && !result) result = { action: "split", index: startIndex };
      str = "";
    }
  });
  return result;
};

const countDepth = (result, index) => {
  let count = 0;
  for (let i = index; i < result.length; i++) {
    if (result[i] === "]") count++;
    if (result[i] === "[") count--;
  }
  return count;
};

const splitNumber = (sNum, index) => {
  const previousNumber = parseInt(sNum.slice(index, index + 2));
  const newPair = `[${Math.floor(previousNumber / 2)},${Math.ceil(
    previousNumber / 2
  )}]`;
  const result = splice(sNum, index, 2, newPair);
  if (countDepth(result, index + 1) >= 5) {
    actionQueue = [{ action: "explode", index }].concat(actionQueue);
  }
  return result;
};

const debugDepth = (str) => {
  let depth = 0;
  const debug = str
    .split("")
    .map((char, index) => {
      if (char === "[") depth++;
      if (str[index - 1] === "]") depth--;
      return `${depth}`;
    })
    .join("");
  console.log(debug);
};

const printAction = ({ action, index }) => {
  const array = Array(index).fill(" ");
  array[index] = "^";
  console.log(array.join("").concat(` - ${action}`));
};

const getNextAction = (sum) => {
  const firstExplode = getFirstDeepNesting(sum);
  if (firstExplode) return firstExplode;
  const firstSplit = getFirstSplit(sum);
  if (firstSplit) return firstSplit;
  return undefined;
};

const reduced = input.reduce((acc, cur) => {
  let sum = `[${acc},${cur}]`;
  // debugDepth(sum);
  // console.log(sum);

  let nextAction = getNextAction(sum);
  while (nextAction) {
    // printAction(nextAction);
    // const spliced = actionQueue.splice(0, 1);
    // const { action, index } = spliced[0];
    const { action, index } = nextAction;
    if (action === "explode") {
      sum = explodePair(sum, index);
    } else if (action === "split") {
      sum = splitNumber(sum, index);
      // findDeepNesting(sum);
    }
    // debugDepth(sum);
    // console.log(sum);
    // if (actionQueue.length === 0) {
    //   findDeepNesting(sum);
    // }
    nextAction = getNextAction(sum);
  }
  return sum;
});

let modifiedReduced = reduced.slice();
let index = modifiedReduced.search(/\[\d\,\d\]/);
while (index >= 0) {
  const commaIndex = modifiedReduced.indexOf(",", index);
  const pairLeftNumber = parseInt(modifiedReduced.slice(index + 1, commaIndex));

  const closingSquareBracketIndex = modifiedReduced.indexOf("]", index);
  const pairRightNumber = parseInt(
    modifiedReduced.slice(commaIndex + 1, closingSquareBracketIndex)
  );

  const totalMagnitude = pairLeftNumber * 3 + pairRightNumber * 2;

  modifiedReduced = splice(
    modifiedReduced,
    index,
    closingSquareBracketIndex - index + 1,
    totalMagnitude
  );

  index = modifiedReduced.search(/\[\d+\,\d+\]/);
  // console.log(index);
}

console.log(modifiedReduced);
