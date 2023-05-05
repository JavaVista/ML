let index = 0;
const labels = [
    'car',
    'fish',
    'house',
    'tree',
    'bicycle',
    'guitar',
    'pencil',
    'clock',
];

const data = {
    student: null,
    // concurrency is handle by the session date the milliseconds in the getTime() object should be unique.
    session: new Date().getTime(),
    drawings: {},
};

const sketchPadContainer = document.getElementById('sketch-pad-container');
const sketchPad = new SketchPad(sketchPadContainer);

function start() {
    if (student.value === '') {
        alert('Please, enter your name first!');
        return;
    }
    data.student = student.value;
    student.style.display = 'none';
    sketchPadContainer.style.visibility = 'visible';
    const label = labels[index];
    instructions.innerText = `Draw a ${label}`;
    const advanceBtn = document.getElementById('advance-btn');
    advanceBtn.innerHTML = 'Next';
    advanceBtn.onclick = next;
}

function next() {
    if (sketchPad.paths.length === 0) {
        alert('Please, draw something first!');
        return;
    }
    const label = labels[index];
    data.drawings[label] = sketchPad.paths;
    sketchPad.reset();
    index++;
    if (index < labels.length) {
        const nextLabel = labels[index];
        instructions.innerText = `Draw a ${nextLabel}`;
    } else {
        sketchPadContainer.style.visibility = 'hidden';
        instructions.innerText = 'Thanks for playing!';
        const advanceBtn = document.getElementById('advance-btn');
        advanceBtn.innerHTML = 'Save';
        advanceBtn.onclick = save;
    }
}

function save() {
    const advanceBtn = document.getElementById('advance-btn');
    advanceBtn.style.display = 'none';
    instructions.innerHTML =
        'Take this downloaded file and place it alongside the others in the dataset.';

    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(data))
    );

    const fileName = `${data.student}-${data.session}.json`;
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
