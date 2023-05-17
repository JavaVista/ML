const { samples, featureName } = features;

const groups = utils.groupBy(samples, 'student_id');
for (let student_id in groups) {
    const samples = groups[student_id];
    const studentId = samples[0].student_id;
    const studentName = samples[0].student_name;
    createRow(container, studentName, studentId, samples);
}
