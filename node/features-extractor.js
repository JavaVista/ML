const constants = require('../common/constants.js');
const features = require('../common/features.js');
const utils = require('../common/utils.js');

const fs = require('fs');

console.log('Extracting features...');

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

const max = samples.length; // Get the total number of samples
let count = 1; // Initialize the count for tracking progress

for (const sample of samples) {
    const paths = JSON.parse(
        fs.readFileSync(constants.JSON_DIR + sample.id + '.json')
    );
    sample.point = [
        features.getPathCount(paths),
        features.getPointCount(paths),
    ];

    utils.printProgress(count, max); // Call the printProgress method
    count++; // Increment the count for each processed sample
}

const featureNames = ['Path Count', 'Point Count'];

fs.writeFileSync(
    constants.FEATURES,
    JSON.stringify({
        featureNames,
        samples: samples.map(sample => {
            return {
                point: sample.point,
                label: sample.label,
            };
        }),
    })
);

fs.writeFileSync(
    constants.FEATURES_JS,
    `const features = 
    ${JSON.stringify({ featureNames, samples })};`
);
