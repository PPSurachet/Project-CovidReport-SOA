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

  const arraylastWeekConfirmed = Object.values(lastWeekConfirmed.rows[0]);
  const arraylastWeekRecovered = Object.values(lastWeekRecovered.rows[0]);
  const arraylastWeekDeaths = Object.values(lastWeekDeaths.rows[0]);

  res.render('index', {
    Totals: Totals,
    lastWeekConfirmed: arraylastWeekConfirmed,
    lastWeekRecovered: arraylastWeekRecovered,
    lastWeekDeaths: arraylastWeekDeaths,
  });
});

router.get('/table', async function (req, res, next) {
  const Country = await db.getAllCountry();
  const Recovered = await db.getLastUpdateRecovered();
  const Deaths = await db.getLastUpdateDeaths();
  var output = [];
  for (let index = 0; index < Country.rows.length; index++) {
    if (Country.rows[index].confirmed != null) {
      output[index] = {
        State: Country.rows[index].state,
        Country: Country.rows[index].country,
        Confirmed: Country.rows[index].confirmed,
        Recovered: Recovered.rows[index].recovered,
        Deaths: Deaths.rows[index].deaths
      }
    }
  }
  res.render('tables', { Countrys: output });
});

router.get('/country/:State/:Country', async function (req, res, next) {
  const State = req.params.State
  const Country = req.params.Country;
  let result;
  let Confirmed, Recovered, Deaths;
  if (State == "null") {
    result = await db.getStatusByCountry(Country);
    Confirmed = await db.getLastWeekConfirmedByCountry(Country);
    Recovered = await db.getLastWeekRecoveredByCountry(Country);
    Deaths = await db.getLastWeekDeathsByCountry(Country);
  } else {
    result = await db.getStatusByState(State);
    Confirmed = await db.getLastWeekConfirmedByState(State);
    Recovered = await db.getLastWeekRecoveredByState(State);
    Deaths = await db.getLastWeekDeathsByState(State);
  }
  res.render('country', {
    dataCountry: result.rows[0],
    lastWeekConfirmed: Object.values(Confirmed.rows[0]),
    lastWeekRecovered: Object.values(Recovered.rows[0]),
    lastWeekDeaths: Object.values(Deaths.rows[0]),
  });
});

router.get('/map', async function (req, res, next) {
  const result = await db.getLatLongCountry();
  res.render('map', { Maps: result.rows });
});

module.exports = router;
