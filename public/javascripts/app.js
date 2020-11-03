$(function () {
    var url = "https://pomber.github.io/covid19/timeseries.json";
        
        $.getJSON(url,function (result) {

            var Deaths1 = 0,Deaths2 = 0,Deaths3 = 0,Deaths4 = 0,Deaths5 = 0,Deaths6 = 0,Deaths7 = 0;
            var Recovery1 = 0,Recovery2 = 0,Recovery3 = 0,Recovery4 = 0,Recovery5 = 0,Recovery6 = 0,Recovery7 = 0;
            var Confirmed1 = 0,Confirmed2 = 0,Confirmed3 = 0,Confirmed4 = 0,Confirmed5 = 0,Confirmed6 = 0,Confirmed7 = 0;

            for (var country in result) {

                var selectedCountry = result[country];
                var total = selectedCountry.length;
                
                Date1 = selectedCountry[total-1].date;
                Date2 = selectedCountry[total-2].date;
                Date3 = selectedCountry[total-3].date;
                Date4 = selectedCountry[total-4].date;
                Date5 = selectedCountry[total-5].date;
                Date6 = selectedCountry[total-6].date;
                Date7 = selectedCountry[total-7].date;

                Confirmed1 = Confirmed1 + selectedCountry[total-1].confirmed;
                Confirmed2 = Confirmed2 + selectedCountry[total-2].confirmed;
                Confirmed3 = Confirmed3 + selectedCountry[total-3].confirmed;
                Confirmed4 = Confirmed4 + selectedCountry[total-4].confirmed;
                Confirmed5 = Confirmed5 + selectedCountry[total-5].confirmed;
                Confirmed6 = Confirmed6 + selectedCountry[total-6].confirmed;
                Confirmed7 = Confirmed7 + selectedCountry[total-7].confirmed;

                Recovery1 = Recovery1 + selectedCountry[total-1].recovered;
                Recovery2 = Recovery2 + selectedCountry[total-2].recovered;
                Recovery3 = Recovery3 + selectedCountry[total-3].recovered;
                Recovery4 = Recovery4 + selectedCountry[total-4].recovered;
                Recovery5 = Recovery5 + selectedCountry[total-5].recovered;
                Recovery6 = Recovery6 + selectedCountry[total-6].recovered;
                Recovery7 = Recovery7 + selectedCountry[total-7].recovered;

                Deaths1 = Deaths1 + selectedCountry[total-1].deaths;
                Deaths2 = Deaths2 + selectedCountry[total-2].deaths;
                Deaths3 = Deaths3 + selectedCountry[total-3].deaths;
                Deaths4 = Deaths4 + selectedCountry[total-4].deaths;
                Deaths5 = Deaths5 + selectedCountry[total-5].deaths;
                Deaths6 = Deaths6 + selectedCountry[total-6].deaths;
                Deaths7 = Deaths7 + selectedCountry[total-7].deaths;

            }
            var Day = [Date7,Date6,Date5,Date4,Date3,Date2,Date1];
            var Confirmed = [Confirmed7,Confirmed6,Confirmed5,Confirmed4,Confirmed3,Confirmed2,Confirmed1];
            var Deaths = [Deaths7, Deaths6, Deaths5,Deaths4,Deaths3,Deaths2,Deaths1];
            var Recovery = [Recovery7,Recovery6,Recovery5,Recovery4,Recovery3,Recovery2,Recovery1];
            
            demo.initDashboardPageCharts(Day,Confirmed,Deaths,Recovery);
            
            $("#TRecovery").append(Recovery1);
            $("#TConfirms").append(Confirmed1);
            $("#TDeaths").append(Deaths1);
            $("#LastDate,#LastDate1,#LastDate2").append(Date1);
        });
    
});
