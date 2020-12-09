const { Pool } = require('pg')

const pool = new Pool({
    // user: User Database,
    // host: host Database,
    // database: Name Database,
    // password: Password Database,
    // port: 5432,
})

const getAllCountry = async () => {
    const sql = `SELECT "Province/State" as State , "Country/Region" as Country ,  "3/22/20" as Confirmed from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastUpdateRecovered = async () => {
    const sql = `SELECT "3/22/20" as Recovered from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastUpdateDeaths = async () => {
    const sql = `SELECT "3/22/20" as Deaths from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalConfirmed = async () => {
    const sql = `SELECT sum("3/22/20") as Confirmed from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalDeaths = async () => {
    const sql = `SELECT sum("3/22/20") as Deaths from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalRecovered = async () => {
    const sql = `SELECT sum("3/22/20") as Recovered from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekConfirmed = async () => {
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

const getLastWeekRecovered = async () => {
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

const getLastWeekDeaths = async () => {
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

const getStatusByCountry = async (Country) => {
    const sql = `select
    covid19_confirmed_csv."Country/Region" as Country ,
    covid19_confirmed_csv.lat,
    covid19_confirmed_csv.long ,
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

const getStatusByState = async (State) => {
    const sql = `select
    covid19_confirmed_csv."Province/State" as Country ,
    covid19_confirmed_csv.lat,
    covid19_confirmed_csv.long ,
    covid19_confirmed_csv."3/22/20" as Confirmed,
    covid19_death_csv."3/22/20"as Deaths,
    covid19_recovered_csv."3/22/20" as Recovered 
    from covid19_confirmed_csv, covid19_death_csv, covid19_recovered_csv
    where covid19_confirmed_csv."Province/State" = covid19_death_csv."Province/State" 
    and covid19_confirmed_csv."Province/State" = covid19_recovered_csv."Province/State" 
    and covid19_confirmed_csv."Province/State" = '${State}'
    `;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLatLongCountry = async () => {
    const sql = `select "Province/State" as State, "Country/Region" as Country, lat, long from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekConfirmedByCountry = async (Country) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_confirmed_csv
    where "Country/Region" = '${Country}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekRecoveredByCountry = async (Country) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_recovered_csv
    where "Country/Region" = '${Country}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekDeathsByCountry = async (Country) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_death_csv
    where "Country/Region" = '${Country}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekConfirmedByState = async (State) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_confirmed_csv
    where "Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekRecoveredByState = async (State) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_recovered_csv
    where "Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekDeathsByState = async (State) => {
    const sql = `select
    "3/16/20" as Day1,
    "3/17/20" as Day2,
    "3/18/20" as Day3,
    "3/19/20" as Day4,
    "3/20/20" as Day5,
    "3/21/20" as Day6,
    "3/22/20" as Day7
    from covid19_death_csv
    where "Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllConfirmedByCountry = async (Country) => {
    const sql = `SELECT * from covid19_confirmed_csv where "Country/Region" = '${Country}' `;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllRecoveredByCountry = async (Country) => {
    const sql = `SELECT * from covid19_recovered_csv where "Country/Region" = '${Country}' `;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllDeathsByCountry = async (Country) => {
    const sql = `SELECT * from covid19_death_csv where "Country/Region" = '${Country}' `;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllConfirmedByState = async (State) => {
    const sql = `SELECT * from covid19_confirmed_csv where "Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllRecoveredByState = async (State) => {
    const sql = `SELECT * from covid19_recovered_csv where "Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllDeathsByState = async (State) => {
    const sql = `SELECT * from covid19_death_csv where "Province/State" = '${State}'`;
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
    getStatusByState,
    getLatLongCountry,
    getLastWeekConfirmedByCountry,
    getLastWeekRecoveredByCountry,
    getLastWeekDeathsByCountry,
    getLastWeekConfirmedByState,
    getLastWeekRecoveredByState,
    getLastWeekDeathsByState,
    getAllConfirmedByCountry,
    getAllRecoveredByCountry,
    getAllDeathsByCountry,
    getAllConfirmedByState,
    getAllRecoveredByState,
    getAllDeathsByState,
}