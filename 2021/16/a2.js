const rawInputPersonal =
  "805311100469800804A3E488ACC0B10055D8009548874F65665AD42F60073E7338E7E5C538D820114AEA1A19927797976F8F43CD7354D66747B3005B401397C6CBA2FCEEE7AACDECC017938B3F802E000854488F70FC401F8BD09E199005B3600BCBFEEE12FFBB84FC8466B515E92B79B1003C797AEBAF53917E99FF2E953D0D284359CA0CB80193D12B3005B4017968D77EB224B46BBF591E7BEBD2FA00100622B4ED64773D0CF7816600B68020000874718E715C0010D8AF1E61CC946FB99FC2C20098275EBC0109FA14CAEDC20EB8033389531AAB14C72162492DE33AE0118012C05EEB801C0054F880102007A01192C040E100ED20035DA8018402BE20099A0020CB801AE0049801E800DD10021E4002DC7D30046C0160004323E42C8EA200DC5A87D06250C50015097FB2CFC93A101006F532EB600849634912799EF7BF609270D0802B59876F004246941091A5040402C9BD4DF654967BFDE4A6432769CED4EC3C4F04C000A895B8E98013246A6016CB3CCC94C9144A03CFAB9002033E7B24A24016DD802933AFAE48EAA3335A632013BC401D8850863A8803D1C61447A00042E3647B83F313674009E6533E158C3351F94C9902803D35C869865D564690103004E74CB001F39BEFFAAD37DFF558C012D005A5A9E851D25F76DD88A5F4BC600ACB6E1322B004E5FE1F2FF0E3005EC017969EB7AE4D1A53D07B918C0B1802F088B2C810326215CCBB6BC140C0149EE87780233E0D298C33B008C52763C9C94BF8DC886504E1ECD4E75C7E4EA00284180371362C44320043E2EC258F24008747785D10C001039F80644F201217401500043A2244B8D200085C3F8690BA78F08018394079A7A996D200806647A49E249C675C0802609D66B004658BA7F1562500366279CCBEB2600ACCA6D802C00085C658BD1DC401A8EB136100";

const rawInputExample1 = "D2FE28"; // 6
const rawInputExample2 = "38006F45291200"; // >1
const rawInputExample3 = "EE00D40C823060"; // >7
const rawInputExample4 = "8A004A801A8002F478"; // 16
const rawInputExample5 = "620080001611562C8802118E34"; //12
const rawInputExample6 = "C0015000016115A2E0802F182340"; //23
const rawInputExample7 = "A0016C880162017C3686B18A3D4780"; //31

// const rawInput = rawInputExample5;
const rawInput = rawInputPersonal;

console.log(rawInput);

const hexToBinMap = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const input = rawInput
  .split("")
  .map((char) => hexToBinMap[char])
  .join("");

// console.log(input);

const bin2Dec = (bin) => parseInt(bin, 2);

const packet = {};

let currentPacket = packet;
let pointer = 0;

while (pointer < input.length) {
  // console.log(input.slice(pointer));
  // console.log();
  // console.log("currentPacket", currentPacket);

  if (!input.slice(pointer).includes("1")) break;

  currentPacket.version = bin2Dec(input.slice(pointer, pointer + 3));
  pointer += 3;
  currentPacket.type = bin2Dec(input.slice(pointer, pointer + 3));
  pointer += 3;

  // literal
  let makeChildNode = false;
  if (currentPacket.type === 4) {
    let firstBit = "1";
    let digits = "";
    do {
      firstBit = input[pointer++];
      digits += input.slice(pointer, pointer + 4);
      pointer += 4;
    } while (firstBit === "1");
    currentPacket.literalValue = bin2Dec(digits);
  } else {
    currentPacket.indicator = input[pointer++];
    if (currentPacket.indicator === "0") {
      // 15 bits
      const length = bin2Dec(input.slice(pointer, pointer + 15));
      pointer += 15;
      currentPacket.packetsLength = length;
      currentPacket.packetsEnd = pointer + length;
      makeChildNode = true;
    } else if (currentPacket.indicator === "1") {
      // 11 bits
      const length = bin2Dec(input.slice(pointer, pointer + 11));
      pointer += 11;
      currentPacket.numberOfPackets = length;
      makeChildNode = true;
    }
  }

  // console.log(currentPacket);

  if (makeChildNode) {
    // console.log("down");
    currentPacket.packets = [
      {
        parent: currentPacket,
      },
    ];
    currentPacket = currentPacket.packets[0];
  } else if (
    (currentPacket.parent?.packetsEnd &&
      pointer >= currentPacket.parent?.packetsEnd) ||
    (currentPacket.parent?.numberOfPackets &&
      currentPacket.parent?.packets.length >=
        currentPacket.parent?.numberOfPackets)
  ) {
    let goUp = true;
    while (goUp) {
      // console.log("up");
      currentPacket = currentPacket.parent;
      goUp =
        (currentPacket.parent?.packetsEnd &&
          pointer >= currentPacket.parent?.packetsEnd) ||
        (currentPacket.parent?.numberOfPackets &&
          currentPacket.parent?.packets.length >=
            currentPacket.parent?.numberOfPackets);
    }

    if (
      (currentPacket.parent?.packetsEnd &&
        pointer < currentPacket.parent?.packetsEnd) ||
      (currentPacket.parent?.numberOfPackets &&
        currentPacket.parent?.packets.length <
          currentPacket.parent?.numberOfPackets)
    ) {
      // console.log("up and down");
      currentPacket.parent.packets.push({
        parent: currentPacket.parent,
      });

      currentPacket =
        currentPacket.parent.packets[currentPacket.parent.packets.length - 1];
    }
  } else if (currentPacket.parent) {
    // console.log("continue");
    currentPacket.parent.packets.push({
      parent: currentPacket.parent,
    });
    currentPacket =
      currentPacket.parent.packets[currentPacket.parent.packets.length - 1];
  }
}

const recurseRemoveParent = (packet) => {
  delete packet.parent;
  if (packet.packets) {
    packet.packets.forEach(recurseRemoveParent);
  }
};

recurseRemoveParent(packet);
console.log(JSON.stringify(packet));

let sum = 0;
const recurseAddVersion = (packet) => {
  // console.log(packet.version);
  sum += packet.version;
  if (packet.packets) {
    packet.packets.forEach(recurseAddVersion);
  }
};

console.log(packet);

recurseAddVersion(packet);

console.log(sum);

const dec2Bin = (dec, len) => {
  let string = Number(dec).toString(2);
  while (string.length < len) {
    string = "0".concat(string);
  }
  return string;
};

const literal2Bin = (literal) => {
  const bin = Number(literal).toString(2);
  let padded = bin;
  while (padded.length % 4 !== 0) {
    padded = "0".concat(padded);
  }
  return padded
    .split("")
    .map((char, index) =>
      index % 4 === 0
        ? padded.length - index <= 4
          ? "0".concat(char)
          : "1".concat(char)
        : char
    )
    .join("");
};

// console.log(reversed);

const binToHexMap = {
  "0000": 0,
  "0001": 1,
  "0010": 2,
  "0011": 3,
  "0100": 4,
  "0101": 5,
  "0110": 6,
  "0111": 7,
  1000: 8,
  1001: 9,
  1010: "A",
  1011: "B",
  1100: "C",
  1101: "D",
  1110: "E",
  1111: "F",
};

const bin2Hex = (bin) => {
  let result = "";
  let memory = "";
  bin.split("").forEach((char) => {
    memory = memory.concat(char);
    if (memory.length === 4) {
      result = result.concat(binToHexMap[memory]);
      memory = "";
    }
  });

  if (memory.length > 0) {
    while (memory.length < 4) {
      memory = memory.concat("0");
    }
    result = result.concat(binToHexMap[memory]);
  }
  return result;
};

const debugReverse = false;
let reversed = "";
const reverse = (packet) => {
  reversed = reversed.concat(dec2Bin(packet.version, 3));
  reversed = reversed.concat(dec2Bin(packet.type, 3));
  debugReverse && console.log(packet);
  if (packet.literalValue) {
    reversed = reversed.concat(literal2Bin(packet.literalValue));
    if (debugReverse) {
      // console.log("literal value:", packet.literalValue);
      console.log(reversed);
    }
  } else if (packet.packets.length) {
    if (packet.packetsLength) {
      reversed = reversed.concat("0");
      reversed = reversed.concat(dec2Bin(packet.packetsLength, 15));
      // debugReverse && console.log("packets length:", packet.packetsLength);
    } else if (packet.numberOfPackets) {
      reversed = reversed.concat("1");
      reversed = reversed.concat(dec2Bin(packet.numberOfPackets, 11));
      // debugReverse && console.log("number of packets:", packet.numberOfPackets);
    }
    debugReverse && console.log(reversed);
    packet.packets.forEach(reverse);
    debugReverse && console.log("up");
  }
  // debugReverse && console.log(bin2Hex(reversed))
};

reverse(packet);

debugReverse && console.log(bin2Hex(reversed));
