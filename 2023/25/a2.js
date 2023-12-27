const fs = require('fs');

const isExample = true;

const file = fs.readFileSync(`${__dirname}/${isExample ? 'example' : 'input'}.txt`, { encoding: 'utf-8'});
const startingNode = isExample ? 'jqt' : 'jkf';

const lines = file.split('\r\n');

const DEBUG = !isExample;

const nodes = {};

lines.forEach(line => {
    const [center, legs] = line.split(': ');
    nodes[center] = legs.split(' ');
});

// console.log(nodes);

const getAllConnectedNodes = (graph, root) => {
    let result = new Set([root]);
    const checked = [];

    const spider = start => {
        if (checked.includes(start)) return;
        checked.push(start);
        const legs = graph[start] ?? [];
        const parents = Object.keys(graph).filter(center => graph[center].includes(start));
        const all = [...legs, ...parents];
        result = new Set([...result, ...all]);
        all.forEach(spider);
    }

    spider(root);

    return result;
}

const allNodesSize = getAllConnectedNodes(nodes, startingNode).size;
console.log(allNodesSize);

const hasPaths = (graph, begin, end, limit = 3) => {
    const checked = [];
    const paths = [];
    let result = false;

    const spider = (path, start) => {
        if (path.includes(end)) return;
        if (paths.length > limit) result = true;
        if (result) return;
        if (checked.includes(start)) return;
        checked.push(start);
        const legs = graph[start] ?? [];
        const parents = Object.keys(graph).filter(center => graph[center].includes(start));
        const all = [...legs, ...parents];
        if (all.includes(end)) {
            paths.push([...path, end]);
        }
        all.filter(l => !checked.includes(l)).forEach(l => {
            spider([...path, l], l)
        });
    }

    spider([], begin);

    console.log(paths);
    return result;
}

console.log(hasPaths(nodes, 'hfx', 'pzl', 999));
console.log(hasPaths(nodes, 'bvb', 'cmg', 999));
console.log(hasPaths(nodes, 'nvd', 'jqt', 999));
// console.log(hasPaths(nodes, 'jqt', 'xhk', 999));