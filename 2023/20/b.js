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

    const node = { name, type, destinations, count: { high: 0, low: 0 } };

    if (node.type === '&') {
        node.sourcePulses = {};
        node.interval = [];
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

for (let i = 0; i < 100000; i++) {
    const queuedPulses = [{ nodeName: 'broadcaster', sourceName: 'button', power: false }];

    while (queuedPulses.length > 0) {
        const pulse = queuedPulses.shift();
        // console.log(pulse);

        if (pulse.nodeName === 'rx' && !pulse.power) console.log(i + 1);

        if (!nodes[pulse.nodeName]) continue;
        
        const node = nodes[pulse.nodeName];
        let newPower = pulse.power;

        if (pulse.power) node.count.high++;
        else node.count.low++;

        if (node.type === '%') {
            if (pulse.power) continue;
            node.state = !node.state;
            newPower = node.state;
        } else if (node.type === '&') {
            node.sourcePulses[pulse.sourceName] = pulse.power;
            const isAllHigh = Object.values(node.sourcePulses).indexOf(false) === -1
            newPower = !isAllHigh;
            if (['vz', 'bq', 'qh', 'lt'].includes(pulse.nodeName) && newPower) {
                node.interval.push(i);
            }
        }
        node.destinations.forEach(destination => {
            queuedPulses.push({ nodeName: destination, power: newPower, sourceName: pulse.nodeName })
        });
    }
}

console.log(nodes);
