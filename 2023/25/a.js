const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const DEBUG = true;

const nodes = {};
let allNodes = new Set();

lines.forEach(line => {
    const [center, legs] = line.split(': ');
    nodes[center] = legs.split(' ');
    allNodes = new Set([...allNodes, center, ...(legs.split(' '))]);
});

// console.log(nodes);

const getAllConnectedNodes = (graph, root) => {
    const expandedGraph = {};
    Array.from(allNodes).forEach(node => {
        const children = graph[node] ?? [];
        const parents = Object.keys(graph).filter(n => graph[n].includes(node));
        expandedGraph[node] = Array.from(new Set([...children, ...parents]));
    });
    // console.log(expandedGraph);
    // console.log();
    
    let result = new Set([root]);
    const checked = [];

    const spider = start => {
        if (checked.includes(start)) return;
        checked.push(start);
        // console.log(start);
        result = new Set([...result, ...expandedGraph[start]]);
        expandedGraph[start].forEach(spider);
    }

    spider(root);

    return result;
}

const allConnectedNodes = getAllConnectedNodes(nodes, 'jkf');

const canReach = (graph, begin, end) => {
    const checked = [];
    let result = false;

    const spider = start => {
        if (result) return;
        if (checked.includes(start)) return;
        checked.push(start);
        const legs = graph[start] ?? [];
        const parents = Object.keys(graph).filter(center => graph[center].includes(start));
        const all = [...legs, ...parents];
        if (all.includes(end)) {
            result = true;
            return;
        }
        all.filter(l => !checked.includes(l)).forEach(spider);
    }

    spider(begin);

    return result;
}

let found = false;
for (let center in nodes) {
    if (found) break;
    const legs = nodes[center];
    const node1 = center;
    if (DEBUG) console.log(node1);
    for (let leg of legs) {
        const node2 = leg;
        if (found) break;
        const graph1 = JSON.parse(JSON.stringify(nodes));
        graph1[center] = graph1[center].reduce((acc, cur) => cur === leg ? acc : acc.concat(cur), [])
        if (graph1[center].length === 0) delete graph1[center];

        for (let center1 in graph1) {
            if (found) break;
            if (DEBUG) console.log(` ${center1}`);
            for (let leg1 of graph1[center1]) {
                if (found) break;
                const graph2 = JSON.parse(JSON.stringify(graph1));
                graph2[center1] = graph2[center1].reduce((acc, cur) => cur === leg1 ? acc : acc.concat(cur), [])
                if (graph2[center1].length === 0) delete graph2[center1];

                for (let center2 in graph2) {
                    if (found) break;
                    if (DEBUG) console.log(`  ${center2}`);
                    for (let leg2 of graph2[center2]) {
                        if (found) break;
                        const graph3 = JSON.parse(JSON.stringify(graph2));
                        graph3[center2] = graph3[center2].reduce((acc, cur) => cur === leg2 ? acc : acc.concat(cur), [])
                        if (graph3[center2].length === 0) delete graph3[center2];

                        if (!canReach(graph3, node1, node2)) {
                            const spider1 = getAllConnectedNodes(graph3, node1);
                            // const spider2 = getAllConnectedNodes(graph3, node2);
                            // if (spider1.size + spider2.size === allConnectedNodes.size) {
                            if (spider1.size < allConnectedNodes.size) {
                                console.log(`${center}/${leg}, ${center1}/${leg1}, ${center2}/${leg2}`);
                                // console.log(spider1.size * spider2.size);
                                console.log(spider1.size * (allConnectedNodes.size - spider1.size));
                                found = true;
                            }
                        }
                    }
                }
            }
        }
    }
}