import pg from "pg";
const { Pool } = pg;

const client = new Pool({
    user:'postgres',
    database: 'house_db',
    port: 5432,
    password: "01023dk",
    host: 'localhost'
});

client.connect()

export default client;