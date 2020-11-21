const initPieChart = (Confirmed, Recovered, Deaths) => {
  var pieOptions = {
    responsive: true,
    segmentShowStroke: true,
    segmentStrokeColor: '#fff',
    segmentStrokeWidth: 1,
    animationSteps: 100,
    animationEasing: 'easeOutBounce',
    animateRotate: true,
    animateScale: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 15,
        defaultFontColor: '#343a40',
        defaultFontSize: 30,
      }
    }
  }

  var ctx = document.getElementById("pieChart");
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [parseInt(Confirmed), parseInt(Deaths), parseInt(Recovered)],
        backgroundColor: [
          '#2CA8FF',
          '#ff0000',
          '#18ce0f',
        ],
      }],
      labels: [
        'Confirmed',
        'Deaths',
        'Recovered',
      ]
    },
    options: pieOptions
  });
}


const initBarChart = (Confirmed, Recovered, Deaths) => {

  const spiltNumberConfirmed = Confirmed.split(',');
  const spiltNumberRecovered = Recovered.split(',');
  const spiltNumberDeaths = Deaths.split(',');
  const allConfirmed = [];
  const allRecovered = [];
  const allDeaths = [];

  for (const key in spiltNumberConfirmed) {
    allConfirmed.push(parseInt(spiltNumberConfirmed[key]));
    allRecovered.push(parseInt(spiltNumberRecovered[key]));
    allDeaths.push(parseInt(spiltNumberDeaths[key]));
  }

  var areaChartData = {
    labels: [
      "3/16/20",
      "3/17/20",
      "3/18/20",
      "3/19/20",
      "3/20/20",
      "3/21/20",
      "3/22/20",
    ],
    datasets: [
      {
        label: 'Deaths',
        backgroundColor: '#ff0000',
        data: allDeaths
      },
      {
        label: 'Recovered',
        backgroundColor: '#18ce0f',
        data: allRecovered
      },
      {
        label: 'Confirmed',
        backgroundColor: '#2CA8FF',
        data: allConfirmed
      },
    ]
  }
  var barChartOptions = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,
    //String - Colour of the grid lines
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    //Number - Width of the grid lines
    scaleGridLineWidth: 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - If there is a stroke on each bar
    barShowStroke: true,
    //Number - Pixel width of the bar stroke
    barStrokeWidth: 2,
    //Number - Spacing between each of the X value sets
    barValueSpacing: 5,
    //Number - Spacing between data sets within X values
    barDatasetSpacing: 1,
    //String - A legend template
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 15,
        defaultFontColor: '#343a40',
        defaultFontSize: 11,
      }
    }
  }

  var ctxBar = document.getElementById("barChart");
  new Chart(ctxBar, {
    type: 'bar',
    data: areaChartData,
    options: barChartOptions
  });
}