const draw = require('../common/draw.js');

const constants = {};

constants.DATA_DIR = '../data/';
constants.RAW_DATA_DIR = constants.DATA_DIR + 'raw/';
constants.DATASET_DIR = constants.DATA_DIR + 'dataset/';
constants.JSON_DIR = constants.DATASET_DIR + 'json/';
constants.IMG_DIR = constants.DATASET_DIR + 'img/';
constants.SAMPLES = constants.DATASET_DIR + 'samples.json';

const fs = require('fs');
const path = require('path');

const fileNames = fs.readdirSync(constants.RAW_DATA_DIR);
const samples = [];
let id = 1;

fileNames.forEach(fileName => {
    const filePath = path.join(constants.RAW_DATA_DIR + fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    const { session, student, drawings } = JSON.parse(content);
    for (let label in drawings) {
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session,
        });
        const paths = drawings[label];
        fs.writeFileSync(
            constants.JSON_DIR + '/' + id + '.json',
            JSON.stringify(paths)
        );

        generateImageFile(constants.SAMPLES, JSON.stringify(samples));

        id++;
    }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFile(outputFile, paths) {
    draw.path(ctx, path);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputFile, buffer);
}
