import { executeQuery } from "../database/database.js";

// Add a new user to the database
const addUser = async (email, password, admin) => {
  await executeQuery(
    "INSERT INTO users (email, password, admin) VALUES ($email, $password, $admin);",
    { email: email, password: password, admin: admin }
  );
};

// Find an user with email
const findUser = async (email) => {
  const res = await executeQuery("SELECT * FROM users WHERE email = $email;", {
    email: email,
  });
  return res.rows;
};

export { addUser, findUser };
