const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const ranking   = ['A','K','Q','T','9','8','7','6','5','4','3','2','J'];
const baseValue = [ 13, 12, 11, 10, 9 , 8 , 7 , 6 , 5 , 4 , 3 , 2 , 1 ];
const digitMultiplier = [50625, 3375, 225, 15, 1];
// max 658125

const FIVE_KIND = 6000000;
const FOUR_KIND = 5000000;
const FULL_HOUSE = 4000000;
const THREE_KIND = 3000000;
const TWO_PAIR = 2000000;
const ONE_PAIR = 1000000;

const hands = [];

lines.forEach(line => {
    const [hand, bid] = line.split(' ');
    
    let value = 0;
    const cards = { J: 0 };
    hand.split('').forEach((card, i) => {
        value += baseValue[ranking.indexOf(card)] * digitMultiplier[i];
        if (!cards[card]) cards[card] = 0;
        cards[card]++;
    });

    const counts = Object.keys(cards).filter(card => card !== 'J').map(card => cards[card])

    // console.log({ hand, cards });
    if (counts.includes(5 - cards.J) || cards.J === 5) value += FIVE_KIND;
    else if (counts.includes(4 - cards.J) || cards.J === 4) value += FOUR_KIND;
    else if ((counts.includes(3) && counts.includes(2)) || (counts.sort((a, b) => b - a)[1] === 2 && cards.J === 1)) value += FULL_HOUSE;
    else if (counts.includes(3 - cards.J) || cards.J === 3) value += THREE_KIND;
    else if (counts.sort((a, b) => b - a)[1] === 2) value += TWO_PAIR;
    else if (counts.includes(2 - cards.J) || cards.J === 2) value += ONE_PAIR;

    hands.push({ hand, bid, value, cards });
});
// 251337575

const sortedHands = hands.sort((a, b) => b.value - a.value);

console.log(JSON.stringify(sortedHands.map(hands => `${hands.hand} ${JSON.stringify(hands.cards)}`)));
// console.log(sortedHands);

let sum = 0;

sortedHands.forEach((hand, i) => {
    sum += hand.bid * (sortedHands.length - i)
});

console.log(sum);