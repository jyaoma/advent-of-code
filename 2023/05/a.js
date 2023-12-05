const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const [seedsLine, _, ...maps] = lines;

const [__, seedsStr] = seedsLine.split(': ');
const seeds = seedsStr.split(' ').map(seedStr => parseInt(seedStr));

let mappedSeeds = seeds.map(seed => ({ value: seed, mapped: false }));

// console.log(mappedSeeds)

maps
    .map(rawLine => rawLine.trim())
    .filter(line => line !== '')
    .forEach(line => {
        if (line.match(/^([a-z]*)-to-([a-z]*) map:$/)) {
            console.log(line);
            console.log(mappedSeeds);
            mappedSeeds = mappedSeeds.map(seed => ({...seed, mapped: false }));
        } else {
            const [destination, source, range] = line.split(' ').map(numStr => parseInt(numStr));
            mappedSeeds = mappedSeeds.map(seed => {
                if (seed.mapped) return seed;
                if (seed.value >= source && seed.value < (source + range)) {
                    return {
                        value: destination + (seed.value - source),
                        mapped: true
                    }
                }
                return seed;
            });
        }
    });

console.log(mappedSeeds.map(seed => seed.value).sort((a, b) => a - b));