const { samples, featureNames } = features;

const groups = utils.groupBy(samples, 'student_id');
for (let student_id in groups) {
    const samples = groups[student_id];
    const studentId = samples[0].student_id;
    const studentName = samples[0].student_name;
    createRow(container, studentName, studentId, samples);
}

const options = {
    width: 400,
    height: 400,
    hAxis: {
        title: featureNames[0],
    },
    vAxis: {
        title: featureNames[1],
    },
    legend: {
        position: 'none',
    },
    explorer: {
        maxZoomIn: 0.01,
        actions: ['dragToZoom', 'rightClickToReset'],
    },
};

google.charts.load('current', { packages: ['corechart'] });

google.charts.setOnLoadCallback(() => {
    const data = new google.visualization.DataTable();
    data.addColumn('number', featureNames[0]);
    data.addColumn('number', featureNames[1]);
    data.addColumn({ type: 'string', role: 'style' });
    data.addRows(
        samples.map(sample => [...sample.point, utils.styles[sample.label]])
    );

    const chartContainer = document.getElementById('chart-container');

    const chart = new google.visualization.ScatterChart(chartContainer);
    chart.draw(data, options);
});
