$(function () {

    Dashboard();
    getAllCountry();
})

function Dashboard() {
    var today = new Date().toISOString().slice(0, 10);
    var allDate = [];
    var i = 0;
    for (let index = 4; index >= 1; index--) {
        function getDay() {
            var today = new Date();
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - index);
            return lastWeek;
        }

        var lastDay = getDay();
        var lastWeekMonth = lastDay.getMonth() + 1;
        var lastWeekDay = lastDay.getDate();
        var lastWeekYear = lastDay.getFullYear();
        var Display = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;
        allDate[i] = Display
        i++;
    }

    function getLastWeek() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
        return lastWeek;
    }

    var lastWeek = getLastWeek();
    var lastWeekMonth = lastWeek.getMonth() + 1;
    var lastWeekDay = lastWeek.getDate();
    var lastWeekYear = lastWeek.getFullYear();

    var lastWeekDisplay = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;


    var url = `https://api.covid19api.com/world?from=${lastWeekDisplay}T00:00:00Z&to=${today}T00:00:00Z`;
    console.log(url);
    $.getJSON(url, function (data) {

        var allConfirmed = [data[0].TotalConfirmed, data[1].TotalConfirmed, data[2].TotalConfirmed, data[3].TotalConfirmed];
        var allRecovered = [data[0].TotalRecovered, data[1].TotalRecovered, data[2].TotalRecovered, data[3].TotalRecovered];
        var allDeaths = [data[0].TotalDeaths, data[1].TotalDeaths, data[2].TotalDeaths, data[3].TotalDeaths];
        console.log(allConfirmed);
        demo.initDashboardPageCharts(allDate, allConfirmed, allDeaths, allRecovered);

        $("#TRecovery").append(data[3].TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#TConfirms").append(data[3].TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#TDeaths").append(data[3].TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    });
    $("#LastDate,#LastDate1,#LastDate2").append(today);
}




function getAllCountry() {
    var url = `https://api.covid19api.com/summary`;
    $.getJSON(url, function (data) {
        for (const key in data.Countries) {
            const Country = data.Countries[key];
            var Result =
                /*html*/
                `<tr>
                    <td style="font-weight: bold;"><a href="Country.html?country=${Country.Country}">${Country.Country}</a></td>
                    <td>${Country.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td>${Country.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td>${Country.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>`
            $("#showData").append(Result);
        }
    });

    $("#CountryTable").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#showData tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}
