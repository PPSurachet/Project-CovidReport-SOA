const express = require('express');
const router = express.Router();
const db = require('../database/PostgreSQL');

/* GET home page. */
router.get('/', async function (req, res, next) {

  const TotalConfirmed = await db.getTotalConfirmed();
  const TotalRecovered = await db.getTotalRecovered();
  const TotalDeaths = await db.getTotalDeaths();

  const lastWeekConfirmed = await db.getLastWeekConfirmed();
  const lastWeekRecovered = await db.getLastWeekRecovered();
  const lastWeekDeaths = await db.getLastWeekDeaths();

  const Totals = {
    TotalConfirmed: TotalConfirmed.rows[0].confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    TotalRecovered: TotalRecovered.rows[0].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    TotalDeaths: TotalDeaths.rows[0].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  }
  console.log(lastWeekConfirmed.rows[0]);
  res.render('index', {
    Totals: Totals,
    lastWeekConfirmed: lastWeekConfirmed.rows[0],
    lastWeekRecovered: lastWeekRecovered.rows[0],
    lastWeekDeaths: lastWeekDeaths.rows[0],
  });
});

router.get('/table', async function (req, res, next) {
  const Country = await db.getAllCountry();
  const Recovered = await db.getLastUpdateRecovered();
  const Deaths = await db.getLastUpdateDeaths();

  console.log(Country.rows.length);

  var objectCountry = [];

  for (const index in Country.rows) {
    if (Country.rows[index].confirmed != 0 || Recovered.rows[index].recovered != 0 && Deaths.rows[index].deaths != 0) {
      objectCountry[index] = {
        State: Country.rows[index].state,
        Country: Country.rows[index].country,
        Confirmed: Country.rows[index].confirmed,
        Recovered: Recovered.rows[index].recovered,
        Deaths: Deaths.rows[index].deaths
      }
    }
  }

  res.render('tables', { Countrys: objectCountry });
});

router.get('/country/:State/:Country', async function (req, res, next) {
  const State = req.params.State
  const Country = req.params.Country;

  if (State == "null") {
    var stateName = "";
    var result = await db.getStatusByCountry(Country);
    var ChartConfirmed = await db.getLastWeekConfirmedByCountry(Country);
    var ChartRecovered = await db.getLastWeekRecoveredByCountry(Country);
    var ChartDeaths = await db.getLastWeekDeathsByCountry(Country);
    var allConfirmed = await db.getAllConfirmedByCountry(Country);
    var allRecovered = await db.getAllRecoveredByCountry(Country);
    var allDeaths = await db.getAllDeathsByCountry(Country);
  } else {
    var stateName = State;
    var result = await db.getStatusByState(State);
    var ChartConfirmed = await db.getLastWeekConfirmedByState(State);
    var ChartRecovered = await db.getLastWeekRecoveredByState(State);
    var ChartDeaths = await db.getLastWeekDeathsByState(State);
    var allConfirmed = await db.getAllConfirmedByState(State);
    var allRecovered = await db.getAllRecoveredByState(State);
    var allDeaths = await db.getAllDeathsByState(State);
  }

  const getColumnDate = Object.keys(allConfirmed.rows[0]);
  const getValueConfirmed = Object.values(allConfirmed.rows[0]);
  const getValueRecovered = Object.values(allRecovered.rows[0]);
  const getValueDeaths = Object.values(allDeaths.rows[0]);

  let ObjectCountry = [];
  for (const key in getColumnDate) {
    if (getColumnDate.hasOwnProperty(key) && (getColumnDate[key].length <= 7 && getColumnDate[key].length > 4)) {
      ObjectCountry[key] = {
        State: stateName,
        Country: Country,
        Date: getColumnDate[key],
        Confirmed: getValueConfirmed[key],
        Recovered: getValueRecovered[key],
        Deaths: getValueDeaths[key],
      }
    }
  }

  res.render('country', {
    dataCountry: result.rows[0],
    lastWeekConfirmed: Object.values(ChartConfirmed.rows[0]),
    lastWeekRecovered: Object.values(ChartRecovered.rows[0]),
    lastWeekDeaths: Object.values(ChartDeaths.rows[0]),
    Tables: ObjectCountry,
  });
});

router.get('/map', async function (req, res, next) {
  const result = await db.getLatLongCountry();
  const Country = await db.getAllCountry();
  const Recovered = await db.getLastUpdateRecovered();
  const Deaths = await db.getLastUpdateDeaths();
  var i = 0;
  var reduceArrayMap = [];
  for (var index = 0; index < Country.rows.length; index++) {
    if (Country.rows[index].confirmed != 0 && Recovered.rows[index].recovered != 0 || Deaths.rows[index].deaths != 0) {
      reduceArrayMap[i] = {
        state: result.rows[index].state,
        country: result.rows[index].country,
        lat: result.rows[index].lat,
        long: result.rows[index].long,
      }
      i++;
    }
  }
  res.render('map', { Maps: reduceArrayMap });
});

module.exports = router;
