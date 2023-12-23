const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const nodes = {};

lines.forEach(line => {
    const [moduleId, destinationsStr] = line.split(' -> ');

    let name = moduleId;
    let type = null;
    if ('%&'.includes(name[0])) {
        type = moduleId[0];
        name = name.slice(1);
    }

    const destinations = destinationsStr.split(', ');

    const node = { name, type, destinations };

    if (node.type === '&') {
        node.sourcePulses = {};
    } else if (node.type === '%') {
        node.state = false;
    }

    nodes[name] = node;
});

Object.keys(nodes).forEach(nodeName => {
    nodes[nodeName].destinations.forEach(destination => {
        // console.log(destination);
        if (nodes[destination] && nodes[destination].type === '&')
            nodes[destination].sourcePulses[nodeName] = false;
    });
});

/*
% Flip flop
Initially off
Low pulse flips on and off
on => high
off => low

& Conjunction
Remembers last pulse from all sources
Initially low pulse for all
If all high, send low pulse
Otherwise, send high
*/
let high = 0;
let low = 0;

for (let i = 0; i < 1000; i++) {
    const queuedPulses = [{ nodeName: 'broadcaster', sourceName: 'button', power: false }];

    while (queuedPulses.length > 0) {
        const pulse = queuedPulses.shift();
        // console.log(pulse);
        if (pulse.power) high++;
        else low++;

        if (!nodes[pulse.nodeName]) continue;
        
        const node = nodes[pulse.nodeName];
        let newPower = pulse.power;

        if (node.type === '%') {
            if (pulse.power) continue;
            node.state = !node.state;
            newPower = node.state;
        } else if (node.type === '&') {
            node.sourcePulses[pulse.sourceName] = pulse.power;
            const isAllHigh = Object.values(node.sourcePulses).indexOf(false) === -1
            newPower = !isAllHigh;
        }
        node.destinations.forEach(destination => {
            queuedPulses.push({ nodeName: destination, power: newPower, sourceName: pulse.nodeName })
        });

        nodes[node.nodeName] = node;
    }
}

console.log({ high, low })
console.log(high * low);