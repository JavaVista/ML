const utils = {};

utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220];

utils.formatPercent = num => {
    return Math.round(num * 100) + '%';
};

utils.printProgress = (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(count / max);
    process.stdout.write(`${count}/${max} (${percent})`);
};

utils.groupBy = (array, key) => {
    const groups = {};
    for(let obj of array) {
        const value = obj[key];
        if(!groups[value]) {
            groups[value] = [];
        }
        groups[value].push(obj);
    }
    return groups;
}

if(typeof module !== 'undefined') {
    module.exports = utils;
}