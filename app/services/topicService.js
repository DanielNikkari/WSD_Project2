import { executeQuery } from "../database/database.js";

// Add a topic to the existing topics
const addTopic = async (user_id, name) => {
  await executeQuery(
    "INSERT INTO topics (user_id, name) VALUES ($1, $2);",
    user_id,
    name
  );
};

// Get all topics from the topics table
const getTopics = async () => {
  const res = await executeQuery("SELECT * FROM topics ORDER BY name ASC;");
  return res.rows;
};

export { addTopic, getTopics };
