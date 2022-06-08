import {} from 'dotenv/config'
// Il vaut mieux utiliser un système de pool pour traiter plusieurs requête en même temps
// import { Pool } from 'pg';

// const pool = new Pool({ 
//     user: process.env.PG_USER || "starterpack_admin",
//     password: process.env.PG_PASSWORD || "admin",
//     database: process.env.PG_DB || "starterpack",
//     host: process.env.PG_HOST || "localhost"
//  });

// // Pas besoin de connect car c'est le Pool qui va se charger d'établir les connexions

// export default pool;

import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: 5432
})

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))

export default client;