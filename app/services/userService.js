import { executeQuery } from "../database/database.js";

// Add a new user to the database
const addUser = async (email, password, admin) => {
  await executeQuery(
    "INSERT INTO users (email, password, admin) VALUES ($1, $2, $3);",
    email,
    password,
    admin
  );
};

// Find an user with email
const findUser = async (email) => {
  const res = await executeQuery(
    "SELECT * FROM users WHERE email = $1;",
    email
  );
  return res.rows;
};

export { addUser, findUser };
