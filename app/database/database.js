import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;
//const connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
let connectionPool;

try {
  if (Deno.env.get("DATABASE_URL")) {
    connectionPool = new Pool(
      Deno.env.get("DATABASE_URL"),
      CONCURRENT_CONNECTIONS
    );
  } else {
    connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
  }
} catch (e) {
  console.log(e);
}

// Update: ...args -> params
const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
