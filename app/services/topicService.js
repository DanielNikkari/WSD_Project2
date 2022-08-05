import { executeQuery } from "../database/database.js";

// Add a topic to the existing topics
const addTopic = async (user_id, name) => {
  await executeQuery(
    "INSERT INTO topics (user_id, name) VALUES ($1, $2);",
    user_id,
    name
  );
};

// Delete topic with its questions and answer options from the database using ids
const deleteTopic = async (id) => {
  const res = await executeQuery(
    "SELECT id FROM questions WHERE topic_id = $1;",
    id
  );
  res.rows.forEach(async (row) => {
    //console.log(row.id);
    await executeQuery(
      "DELETE FROM question_answers WHERE question_id = $1;",
      row.id
    );
    await executeQuery(
      "DELETE FROM question_answer_options WHERE question_id = $1;",
      row.id
    );
  });
  await executeQuery("DELETE FROM questions WHERE topic_id = $1;", id);
  await executeQuery("DELETE FROM topics WHERE id = $1;", id);
};

// Get all topics from the topics table
const getTopics = async () => {
  const res = await executeQuery("SELECT * FROM topics ORDER BY name ASC;");
  return res.rows;
};

export { addTopic, deleteTopic, getTopics };
