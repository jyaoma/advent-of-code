const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const [seedsLine, _, ...maps] = lines;

const [__, seedsStr] = seedsLine.split(': ');
const seeds = seedsStr.split(' ').map(seedStr => parseInt(seedStr));

const debug = true;

let mappedSeeds = [];
let start;
for (let i = 0; i < seeds.length; i++) {
    mappedSeeds.push({
        start: seeds[i],
        range: 1,
        mapped: false
    });
}

const allRanges = mappedSeeds.reduce((acc, cur) => acc + cur.range, 0);

console.log(mappedSeeds);

maps
    .map(rawLine => rawLine.trim())
    .filter(line => line !== '')
    .forEach(line => {
        if (line.match(/^([a-z]*)-to-([a-z]*) map:$/)) {
            console.log(mappedSeeds);
            console.log(line);
            mappedSeeds = mappedSeeds.map(seed => ({...seed, mapped: false }));
        } else {
            const [destination, source, range] = line.split(' ').map(numStr => parseInt(numStr));
            for (let i = 0; i < mappedSeeds.length; i++) {
                const seed = mappedSeeds[i];
                if (seed.mapped) continue;
                if (seed.start >= source && seed.start < (source + range)) {
                    if ((seed.start + seed.range) <= (source + range)) {
                        if (debug) console.log("inside", i);
                        mappedSeeds[i] = {
                            start: destination + (seed.start - source),
                            range: seed.range,
                            mapped: true
                        }
                    } else {
                        if (debug) console.log("after", i);
                        mappedSeeds.push({
                            start: source + range,
                            range: (seed.start + seed.range) - (source + range),
                            mapped: false
                        });
                        mappedSeeds[i] = {
                            start: destination + (seed.start - source),
                            range: source + range - seed.start,
                            mapped: true
                        };
                        if (debug) console.log(mappedSeeds);
                    }
                } else if (seed.start < source && (seed.start + seed.range) > source && (seed.start + seed.range) <= (source + range)) {
                    if (debug) console.log("before", i);
                    mappedSeeds.push({
                        start: seed.start,
                        range: source - seed.start,
                        mapped: false
                    });
                    mappedSeeds[i] = {
                        start: destination,
                        range: seed.start + seed.range - source,
                        mapped: true
                    };
                    if (debug) console.log(mappedSeeds);
                } else {
                    if (debug) console.log("nothing", i);
                    mappedSeeds[i] = seed;
                }
            }
            if (debug) {
                console.log("next line")
            }
        }
    });
    
    
console.log(mappedSeeds);
const computedRanges = mappedSeeds.reduce((acc, cur) => acc + cur.range, 0);
const computedSeedValues = mappedSeeds.map(seed => seed.start).sort((a, b) => a - b);
console.log(computedSeedValues);
console.log({ allRanges, computedRanges, match: allRanges === computedRanges });
console.log(computedSeedValues[0]);