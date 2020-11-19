const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Soa',
    password: 'Doublepor',
    port: 5432,
})

async function getAllCountry() {
    const sql = `SELECT "Province/State" as State , "Country/Region" as Country ,  "3/22/20" as Confirmed from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getLastUpdateRecovered() {
    const sql = `SELECT "3/22/20" as Recovered from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getLastUpdateDeaths() {
    const sql = `SELECT "3/22/20" as Deaths from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getTotalConfirmed() {
    const sql = `SELECT sum("3/22/20") as Confirmed from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getTotalDeaths() {
    const sql = `SELECT sum("3/22/20") as Deaths from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getTotalRecovered() {
    const sql = `SELECT sum("3/22/20") as Recovered from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getLastWeekConfirmed() {
    const sql = `select
    sum("3/16/20") as Day1,
    sum("3/17/20") as Day2,
    sum("3/18/20") as Day3,
    sum("3/19/20") as Day4,
    sum("3/20/20") as Day5,
    sum("3/21/20") as Day6,
    sum("3/22/20") as Day7
    from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getLastWeekRecovered() {
    const sql = `select
    sum("3/16/20") as Day1,
    sum("3/17/20") as Day2,
    sum("3/18/20") as Day3,
    sum("3/19/20") as Day4,
    sum("3/20/20") as Day5,
    sum("3/21/20") as Day6,
    sum("3/22/20") as Day7
    from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getLastWeekDeaths() {
    const sql = `select
    sum("3/16/20") as Day1,
    sum("3/17/20") as Day2,
    sum("3/18/20") as Day3,
    sum("3/19/20") as Day4,
    sum("3/20/20") as Day5,
    sum("3/21/20") as Day6,
    sum("3/22/20") as Day7
    from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getStatusByCountry(Country) {
    const sql = `select
    covid19_confirmed_csv."Country/Region" as Country ,
    covid19_confirmed_csv."3/22/20" as Confirmed,
    covid19_death_csv."3/22/20"as Deaths,
    covid19_recovered_csv."3/22/20" as Recovered 
    from covid19_confirmed_csv, covid19_death_csv, covid19_recovered_csv
    where covid19_confirmed_csv."Country/Region" = covid19_death_csv."Country/Region" 
    and covid19_confirmed_csv."Country/Region" = covid19_recovered_csv."Country/Region" 
    and covid19_confirmed_csv."Country/Region" = '${Country}'
    `;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    getAllCountry,
    getLastUpdateRecovered,
    getLastUpdateDeaths,
    getTotalConfirmed,
    getTotalDeaths,
    getTotalRecovered,
    getLastWeekConfirmed,
    getLastWeekRecovered,
    getLastWeekDeaths,
    getStatusByCountry,
}