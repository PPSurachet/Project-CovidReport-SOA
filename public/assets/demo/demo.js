demo = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },

        initDocChart: function(){
        chartColor = "#FFFFFF";
        
        // General configuration for the charts with Line gradientStroke
        gradientChartOptionsConfiguration = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                bodySpacing: 4,
                mode:"nearest",
                intersect: 0,
                position:"nearest",
                xPadding:10,
                yPadding:10,
                caretPadding:10
            },
            responsive: true,
            scales: {
                yAxes: [{
                    display:0,
                    gridLines:0,
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawTicks: false,
                        display: false,
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    display:0,
                    gridLines:0,
                    ticks: {
                        display: false
                    },
                    gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                    }
                }]
            },
            layout:{
                padding:{left:0,right:0,top:15,bottom:15}
            }
        };},

        initDashboardPageCharts: function(Day,Confirmed,Deaths,Recovery){
            
        chartColor = "#FFFFFF";
        
        // General configuration for the charts with Line gradientStroke
        gradientChartOptionsConfiguration = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                bodySpacing: 4,
                mode:"nearest",
                intersect: 0,
                position:"nearest",
                xPadding:10,
                yPadding:10,
                caretPadding:10
            },
            responsive: 1,
            scales: {
                yAxes: [{
                    display:0,
                    gridLines:0,
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawTicks: false,
                        display: false,
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    display:0,
                    gridLines:0,
                    ticks: {
                        display: false
                    },
                    gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                    }
                }]
            },
            layout:{
                padding:{left:0,right:0,top:15,bottom:15}
            }
        };

            gradientChartOptionsConfigurationWithNumbersAndGrid = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                bodySpacing: 4,
                mode:"nearest",
                intersect: 0,
                position:"nearest",
                xPadding:10,
                yPadding:10,
                caretPadding:10
            },
            responsive: true,
            scales: {
                yAxes: [{
                    gridLines:0,
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    display:0,
                    gridLines:0,
                    ticks: {
                        display: false
                    },
                    gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                    }
                }]
            },
            layout:{
                padding:{left:0,right:0,top:15,bottom:15}
            }
        };
        
        var ctx = document.getElementById('bigDashboardChart').getContext("2d");

        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, chartColor);

        gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

        gradientFillRecovery = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFillRecovery.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFillRecovery.addColorStop(1, hexToRGB('#18ce0f',0.4));

        gradientFillDeaths = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFillDeaths.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFillDeaths.addColorStop(1, "rgba(255,0,0,0.3)");    

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Day,
                datasets: [{
                    label: "Confirms",
                    borderColor: "#2CA8FF",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#2CA8FF",
                    pointHoverBorderColor: chartColor,
                    pointBorderWidth: 1,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    data: Confirmed
                },{
                    label: "Recovery",
                    borderColor: "#18ce0f",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#18ce0f",
                    pointHoverBorderColor: chartColor,
                    pointBorderWidth: 1,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    fill: true,
                    backgroundColor: gradientFillRecovery,
                    borderWidth: 2,
                    data: Recovery
                },{
                    label: "Deaths",
                    borderColor: "#DC143C",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#DC143C",
                    pointHoverBorderColor: chartColor,
                    pointBorderWidth: 1,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    fill: true,
                    backgroundColor: gradientFillDeaths,
                    borderWidth: 2,
                    data: Deaths
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 0,
                        bottom: 0,
                    }
                },
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: '#fff',
                    titleFontColor: '#333',
                    bodyFontColor: '#666',
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest"
                },
                legend: {
                    position: "bottom",
                    fillStyle: "#FFF",
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(255,255,255,0.4)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            padding: 10
                        },
                        gridLines: {
                            drawTicks: true,
                            drawBorder: false,
                            display: true,
                            color: "rgba(255,255,255,0.1)",
                            zeroLineColor: "transparent"
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent",
                            display: false,

                        },
                        ticks: {
                            padding: 10,
                            fontColor: "rgba(255,255,255,0.4)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
        
        var cardStatsMiniLineColor = "#fff",
            cardStatsMiniDotColor = "#fff";

        ctx = document.getElementById('lineChartExample').getContext("2d");

        gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

        myChart = new Chart(ctx, {
            type: 'line',
            responsive: true,
            data: {
                labels: Day,
                datasets: [{
                    label: "Confirms",
                    borderColor: "#2CA8FF",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#2CA8FF",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    data: Confirmed
                }]
            },
            options: gradientChartOptionsConfiguration
        });


        ctx = document.getElementById('lineChartExampleRecovery').getContext("2d");

        gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#18ce0f');
        gradientStroke.addColorStop(1, chartColor);

        gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, hexToRGB('#18ce0f',0.4));

        myChart = new Chart(ctx, {
            type: 'line',
            responsive: true,
            data: {
                labels: Day,
                datasets: [{
                    label: "Recovery",
                    borderColor: "#18ce0f",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#18ce0f",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    data: Recovery
                }]
            },
            options: gradientChartOptionsConfiguration
        });

        ctx = document.getElementById('lineChartExampleDeaths').getContext("2d");

        gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, chartColor);

        gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(255,0,0,0.3)");    

        myChart = new Chart(ctx, {
            type: 'line',
            responsive: true,
            data: {
                labels: Day,
                datasets: [{
                    label: "Deaths",
                    borderColor: "#DC143C",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#DC143C",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    data: Deaths
                }]
            },
            options: gradientChartOptionsConfiguration
        });
        },


        showNotification: function(from, align){
            color = 'primary';

            $.notify({
                icon: "now-ui-icons ui-1_bell-53",
                message: "Welcome to <b>Now Ui Dashboard Pro</b> - a beautiful freebie for every web developer."

            },{
                type: color,
                timer: 8000,
                placement: {
                    from: from,
                    align: align
                }
            });
        }

    };
