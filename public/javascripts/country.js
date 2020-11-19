$(function() {

    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('country'));
    var country = urlParams.get('country');
    $("#countryheader").html(country);
    var country = urlParams.get('country');
    $("#countryend").html(country);

    var url = "https://pomber.github.io/covid19/timeseries.json";
    $.getJSON(url, function(result) {
        var selectedCountry = result[country];
        console.log(selectedCountry);

        for (var i = 0; i < selectedCountry.length; i++) {
            var row = `<tr>
            <th scope="row">${selectedCountry[i].date}</th>
            <td>${selectedCountry[i].confirmed}</td>
            <td>${selectedCountry[i].deaths}</td>
            <td>${selectedCountry[i].recovered}</td>
            </tr>`
            $("#data").append(row);
        }

        var confirmed = selectedCountry[selectedCountry.length-1].confirmed
        $("#confirmed").append(confirmed);
        var deaths = selectedCountry[selectedCountry.length-1].deaths
        $("#deaths").append(deaths);
        var recovered = selectedCountry[selectedCountry.length-1].recovered
        $("#recovered").append(recovered);
        var date = selectedCountry[selectedCountry.length-1].date
        $("#today").append(date);
        
        $(document).ready(function() {
            initPieChart();
            initBarChart();
          });
          
          
          function initPieChart() {
            //-------------
            //- PIE CHART -
            //-------------
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
                  defaultFontSize: 11,
                }
              }
            }
          
            var ctx = document.getElementById("pieChart");
            new Chart(ctx, {
              type: 'doughnut',
              data: {
                datasets: [{
                  data: [confirmed, deaths, recovered],
                  backgroundColor: [
                    '#f56954',
                    '#00a65a',
                    '#f39c12',
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
          
          function initBarChart () {
            //-------------
            //- BAR CHART -
            //-------------
            var areaChartData = {
              labels  : [
                selectedCountry[selectedCountry.length-8].date, 
                selectedCountry[selectedCountry.length-7].date, 
                selectedCountry[selectedCountry.length-6].date, 
                selectedCountry[selectedCountry.length-5].date, 
                selectedCountry[selectedCountry.length-4].date, 
                selectedCountry[selectedCountry.length-3].date, 
                selectedCountry[selectedCountry.length-2].date,
                selectedCountry[selectedCountry.length-1].date],
              datasets: [
                {
                  label               : 'Confirmed',
                  backgroundColor     : '#f56954',
                  data                : [
                    selectedCountry[selectedCountry.length-8].confirmed, 
                    selectedCountry[selectedCountry.length-7].confirmed, 
                    selectedCountry[selectedCountry.length-6].confirmed, 
                    selectedCountry[selectedCountry.length-5].confirmed, 
                    selectedCountry[selectedCountry.length-4].confirmed, 
                    selectedCountry[selectedCountry.length-3].confirmed, 
                    selectedCountry[selectedCountry.length-2].confirmed,
                    selectedCountry[selectedCountry.length-1].confirmed
                ]
                },
                {
                  label               : 'Deaths',
                  backgroundColor     : '#00a65a',
                  data                : [
                    selectedCountry[selectedCountry.length-8].deaths, 
                    selectedCountry[selectedCountry.length-7].deaths, 
                    selectedCountry[selectedCountry.length-6].deaths, 
                    selectedCountry[selectedCountry.length-5].deaths, 
                    selectedCountry[selectedCountry.length-4].deaths, 
                    selectedCountry[selectedCountry.length-3].deaths, 
                    selectedCountry[selectedCountry.length-2].deaths,
                    selectedCountry[selectedCountry.length-1].deaths
                    ]
                },
                {
                  label               : 'Recovered',
                  backgroundColor     : '#00c0ef',
                  data                : [
                    selectedCountry[selectedCountry.length-8].recovered, 
                    selectedCountry[selectedCountry.length-7].recovered, 
                    selectedCountry[selectedCountry.length-6].recovered, 
                    selectedCountry[selectedCountry.length-5].recovered, 
                    selectedCountry[selectedCountry.length-4].recovered, 
                    selectedCountry[selectedCountry.length-3].recovered, 
                    selectedCountry[selectedCountry.length-2].recovered,
                    selectedCountry[selectedCountry.length-1].recovered
                    ]
                }
              ]
            }
            var barChartOptions = {
              //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
              scaleBeginAtZero        : true,
              //Boolean - Whether grid lines are shown across the chart
              scaleShowGridLines      : true,
              //String - Colour of the grid lines
              scaleGridLineColor      : 'rgba(0,0,0,.05)',
              //Number - Width of the grid lines
              scaleGridLineWidth      : 1,
              //Boolean - Whether to show horizontal lines (except X axis)
              scaleShowHorizontalLines: true,
              //Boolean - Whether to show vertical lines (except Y axis)
              scaleShowVerticalLines  : true,
              //Boolean - If there is a stroke on each bar
              barShowStroke           : true,
              //Number - Pixel width of the bar stroke
              barStrokeWidth          : 2,
              //Number - Spacing between each of the X value sets
              barValueSpacing         : 5,
              //Number - Spacing between data sets within X values
              barDatasetSpacing       : 1,
              //String - A legend template
              responsive              : true,
              maintainAspectRatio     : true,
              legend: {
                display: true,
                position: 'right',
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
    });
});

  
