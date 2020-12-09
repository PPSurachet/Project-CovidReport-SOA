const getMap = (data) => {
    const dataMaps = JSON.parse(data)

    const url = "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json";

    var map = L.map('mapid').setView([28.0339, 1.6596], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.control.tagFilterButton({
        data: ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'],
        filterOnEveryClick: true,
    }).addTo(map);

    $.getJSON(url, function (result) {
        for (const key in dataMaps) {
            for (const index in result) {
                if (dataMaps[key].country == result[index].country) {
                    if (dataMaps[key].state != null) {
                        L.marker([dataMaps[key].lat, dataMaps[key].long], { tags: [`${result[index].continent}`] }).addTo(map)
                            .bindPopup(`<a class="font-weight-bold h5" href="country/${dataMaps[key].state}/${dataMaps[key].country}">${dataMaps[key].state}</a>`)
                            .openPopup();
                    } else {
                        L.marker([dataMaps[key].lat, dataMaps[key].long], { tags: [`${result[index].continent}`] }).addTo(map)
                            .bindPopup(`<a class="font-weight-bold h5" href="country/null/${dataMaps[key].country}">${dataMaps[key].country}</a>`)
                            .openPopup();
                    }
                }
            }
        }
    })

    // for (const key in dataMaps) {
    //     if (dataMaps[key].state != null) {
    //         L.marker([parseFloat(dataMaps[key].lat), parseFloat(dataMaps[key].long)]).addTo(map)
    //             .bindPopup(`<a class="font-weight-bold h5" href="country/${dataMaps[key].state}/${dataMaps[key].country}">${dataMaps[key].state}</a>`)
    //             .openPopup();
    //     } else {
    //         L.marker([parseFloat(dataMaps[key].lat), parseFloat(dataMaps[key].long)]).addTo(map)
    //             .bindPopup(`<a class="font-weight-bold h5" href="country/null/${dataMaps[key].country}">${dataMaps[key].country}</a>`)
    //             .openPopup();
    //     }
    // }
}