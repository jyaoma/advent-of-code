const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const workflows = {};
const accepted = [];

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
            const test = (part) => eval(`(${JSON.stringify(part)}).${rawTest}`);
            return { test, result };
        });
        workflows[name] = { steps, final };
    } else {
        const transformed = line
            .replace(/=/g, ':')
            .replace('x', '"x"')
            .replace('m', '"m"')
            .replace('a', '"a"')
            .replace('s', '"s"');
        const part = JSON.parse(transformed);
        let result = 'in';
        while (!'AR'.includes(result)) {
            const workflow = workflows[result];
            let found = false;
            for (let i = 0; i < workflow.steps.length; i++) {
                const step = workflow.steps[i];
                if (step.test(part)) {
                    result = step.result;
                    found = true;
                    break;
                }
            }
            if (!found) {
                result = workflow.final;
            }
        }
        if (result === 'A') {
            accepted.push(part);
        }
    }
});

// console.log(accepted);

let sum = 0;

accepted.forEach(({ x, m, a, s }) => {
    sum += x + m + a + s;
});

console.log(sum);
