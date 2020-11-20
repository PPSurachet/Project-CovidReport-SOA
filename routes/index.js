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

  const arraylastWeekConfirmed =
    [
      lastWeekConfirmed.rows[0].day1,
      lastWeekConfirmed.rows[0].day2,
      lastWeekConfirmed.rows[0].day3,
      lastWeekConfirmed.rows[0].day4,
      lastWeekConfirmed.rows[0].day5,
      lastWeekConfirmed.rows[0].day6,
      lastWeekConfirmed.rows[0].day7
    ];
  const arraylastWeekRecovered =
    [
      lastWeekRecovered.rows[0].day1,
      lastWeekRecovered.rows[0].day2,
      lastWeekRecovered.rows[0].day3,
      lastWeekRecovered.rows[0].day4,
      lastWeekRecovered.rows[0].day5,
      lastWeekRecovered.rows[0].day6,
      lastWeekRecovered.rows[0].day7,
    ];
  const arraylastWeekDeaths =
    [
      lastWeekDeaths.rows[0].day1,
      lastWeekDeaths.rows[0].day2,
      lastWeekDeaths.rows[0].day3,
      lastWeekDeaths.rows[0].day4,
      lastWeekDeaths.rows[0].day5,
      lastWeekDeaths.rows[0].day6,
      lastWeekDeaths.rows[0].day7,
    ];
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

router.get('/country/:Country', async function (req, res, next) {
  const Country = req.params.Country;
  const result = await db.getStatusByCountry(Country);
  console.log(result.rows[0]);
  res.render('country', { dataCountry: result.rows[0] });
});

router.get('/map', async function (req, res, next) {
  const result = await db.getLatLongCountry();
  res.render('map', { Maps: result.rows });
});

module.exports = router;
