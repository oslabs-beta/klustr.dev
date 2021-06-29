const { Pool } = require('pg');
const myURI = 'postgres://uoxhbipl:h1t_kf6PCEbJ5Zdv2thayRY6y008Jf7R@kashin.db.elephantsql.com/uoxhbipl';
// old URI
// const myURI = 'postgres://swsfcdzs:SZpTZJf7bY3Y3DMpe6xAq2NWbNwPmZ_w@batyr.db.elephantsql.com/swsfcdzs';
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};