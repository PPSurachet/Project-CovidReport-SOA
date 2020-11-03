$(function() {
    var url = "https://pomber.github.io/covid19/timeseries.json";
    jQuery("#vmap").vectorMap({
        map: "world_en",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderOpacity: 2,
        borderWidth: 1,
        color: "#154A7D",
        enableZoom: true,
        hoverColor: "#EECFA1",
        normalizeFunction: "linear",
        selectedColor: "#FF4040",
        showTooltip: true,
        onRegionClick: function (element, code, region) {
        $.getJSON(url, function (result) {

            var selectedCountry = result[region];

            var Day = [];
            var Confirmed = [];
            var Recovery = [];
            var Deaths = [];

            if (selectedCountry != null) {
                var total = selectedCountry.length;
                for($i=0,$l=4;$i<4;$i++){
                    Day[$i] = selectedCountry[total-$l].date;
                    Confirmed[$i] = selectedCountry[total-$l].confirmed;
                    Deaths[$i] = selectedCountry[total-$l].deaths;
                    Recovery[$i] = selectedCountry[total-$l].recovered;
                    $l--;
                }
            }else{
                $('#NameCountry').html(region);
                $('#lineChart').empty();
                $('#LastUpdate').empty(Day[3]);
                $('#TConfirmed').empty(Confirmed[3]);
                $('#TRecovery').empty(Recovery[3]);
                $('#TDeaths').empty(Deaths[3]);
            }
            
            chartColor = "#FFFFFF";

            ctx = document.getElementById('lineChart').getContext("2d");

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

            myChart = new Chart(ctx,{
                type: 'line',
                responsive: true,
                data: {
                    labels: Day,
                    datasets: [{
                        label: "Confirmed",
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
                    },{
                        label: "Recovery",
                        borderColor: "#18ce0f",
                        pointBorderColor: "#FFF",
                        pointBackgroundColor: "#18ce0f",
                        pointBorderWidth: 2,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        fill: true,
                        backgroundColor: gradientFillRecovery,
                        borderWidth: 2,
                        data: Recovery
                    },{
                        label: "Deaths",
                        borderColor: "#DC143C",
                        pointBorderColor: "#FFF",
                        pointBackgroundColor: "#DC143C",
                        pointBorderWidth: 2,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        fill: true,
                        backgroundColor: gradientFillDeaths,
                        borderWidth: 2,
                        data: Deaths
                    }]
                },
            });
            
            $('#NameCountry').html(region);
            $('#LastUpdate').html(Day[3]);
            $('#TConfirmed').html(Confirmed[3]);
            $('#TRecovery').html(Recovery[3]);
            $('#TDeaths').html(Deaths[3]);

            $('#exampleModalLon').on('hidden.bs.modal', function () {
                location.reload();
            })

        });
        },
    })
})