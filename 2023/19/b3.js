const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const workflows = {};

let isWorkflow = true;
lines.forEach(line => {
    if (isWorkflow) {
        if (line === '') {
            isWorkflow = false;
            return;
        }

        const [name, rawSteps] = line.split('{');
        const trimmedSteps = rawSteps.slice(0, rawSteps.length - 1);
        const rawStepList = trimmedSteps.split(',');
        const final = rawStepList.pop();
        const steps = rawStepList.map(rawStep => {
            const [rawTest, result] = rawStep.split(':');
            const category = rawTest[0];
            const gt = rawTest[1] === '>';
            const threshold = parseInt(rawTest.slice(2));

            return { category, gt, threshold, result };
        });
        workflows[name] = { steps, final };
    }
});

const accepted = [];
// const queuedRanges = [
//     {
//         x: [1, 4000],
//         m: [1, 4000],
//         a: [1, 4000],
//         s: [1, 4000]
//     }
// ];

const recurse = (range, name) => {
    if (name === 'R') {
        return 0;
    } else if (name === 'A') {
        const { x, m, a, s } = range;
        return (x[1] - x[0] + 1) * (m[1] - m[0] + 1) * (a[1] - a[0] + 1) * (s[1] - s[0] + 1)
    }
    const workflow = workflows[name];
    let retainingRange = JSON.parse(JSON.stringify(range));
    let sum = 0;
    workflow.steps.forEach(step => {
        const { category, gt, threshold, result } = step;
        const branchRange = JSON.parse(JSON.stringify(retainingRange));
        if (
            gt &&
            retainingRange[category][0] <= threshold &&
            retainingRange[category][1] > threshold
        ) {
            branchRange[category] = [threshold + 1, retainingRange[category][1]];
            retainingRange[category] = [retainingRange[category][0], threshold]
            sum += recurse(branchRange, result);
            // branchRange.w = result;
            // console.log(JSON.stringify(branchRange));
            // queuedRanges.push(branchRange);
        } else if (
            !gt &&
            retainingRange[category][0] < threshold &&
            retainingRange[category][1] >= threshold
        ) {
            branchRange[category] = [retainingRange[category][0], threshold - 1];
            retainingRange[category] = [threshold, retainingRange[category][1]];
            sum += recurse(branchRange, result);
            // branchRange.w = result;
            // console.log(JSON.stringify(branchRange));
            // queuedRanges.push(branchRange);
        }
    });
    // retainingRange.w = workflow.final;
    sum += recurse(retainingRange, workflow.final);
    return sum;
}

const answer = recurse({
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000]
    }, 'in');

console.log(answer);

// while (queuedRanges.length) {
//     const range = queuedRanges.shift();
//     // console.log(range);
//     if (range.w === 'R') continue;
//     if (range.w === 'A') {
//         accepted.push(range);
//         continue;
//     }
//     // console.log(range.w);
//     const workflow = workflows[range.w];
//     let retainingRange = JSON.parse(JSON.stringify(range));
//     workflow.steps.forEach(step => {
//         const { category, gt, threshold, result } = step;
//         const branchRange = JSON.parse(JSON.stringify(retainingRange));
//         if (
//             gt &&
//             retainingRange[category][0] <= threshold &&
//             retainingRange[category][1] > threshold
//         ) {
//             retainingRange[category] = [range[category][0], threshold]
//             branchRange[category] = [threshold + 1, range[category][1]];
//             branchRange.w = result;
//             // console.log(JSON.stringify(branchRange));
//             queuedRanges.push(branchRange);
//         } else if (
//             !gt &&
//             retainingRange[category][0] < threshold &&
//             retainingRange[category][1] >= threshold
//         ) {
//             branchRange[category] = [range[category][0], threshold - 1];
//             retainingRange[category] = [threshold, range[category][1]]
//             branchRange.w = result;
//             // console.log(JSON.stringify(branchRange));
//             queuedRanges.push(branchRange);
//         }
//     });
//     retainingRange.w = workflow.final;
//     // console.log(JSON.stringify(retainingRange));
//     // console.log();
//     queuedRanges.push(retainingRange);
// };

// console.log(accepted);

// let sum = 0;

// accepted.forEach(({ x, m, a, s }) => {
//     sum += (x[1] - x[0] + 1) * (m[1] - m[0] + 1) * (a[1] - a[0] + 1) * (s[1] - s[0] + 1);
// });

// console.log(sum);