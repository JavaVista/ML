function createRow(container, studentName, studentId, samples) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);

    const rowLabel = document.createElement('div');
    const rowId = document.createElement('div');
    rowId.innerHTML = studentId;
    rowId.classList.add('row-id');
    rowLabel.innerHTML = studentName;
    rowLabel.classList.add('row-label');
    row.appendChild(rowLabel);
    rowLabel.appendChild(rowId);

    for (let sample of samples) {
        const { id, label , student_id } = sample;

        const sampleContainer = document.createElement('div');
        sampleContainer.id = 'sample-' + id;
        sampleContainer.classList.add('sample-container');

        const sampleLabel = document.createElement('div');
        sampleLabel.innerHTML = label;
        sampleContainer.appendChild(sampleLabel);

        const img = document.createElement('img');
        img.src = constants.IMG_DIR + id + '.png';
        img.classList.add('thumb');

        if(utils.flaggedUsers.includes(student_id)) {
            img.classList.add('flagged');
        }

        sampleContainer.appendChild(img);
        row.appendChild(sampleContainer);
    }
}
