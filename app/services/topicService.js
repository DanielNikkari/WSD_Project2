import { executeQuery } from "../database/database.js";

// Add a topic to the existing topics
const addTopic = async (user_id, name) => {
  await executeQuery(
    "INSERT INTO topics (user_id, name) VALUES ($user_id, $name);",
    { user_id: user_id, name: name }
  );
};

// Delete topic with its questions and answer options from the database using ids
const deleteTopic = async (id) => {
  var res = await executeQuery(
    "SELECT id FROM questions WHERE topic_id = $topic_id;",
    { topic_id: id }
  );
  //console.log(res);
  for (let i = 0; i < res.rows.length; i++) {
    //console.log(res.rows[i].id);
    await executeQuery(
      "DELETE FROM question_answers WHERE question_id = $question_id;",
      { question_id: res.rows[i].id }
    );
    await executeQuery(
      "DELETE FROM question_answer_options WHERE question_id = $question_id;",
      { question_id: res.rows[i].id }
    );
  }
  await executeQuery("DELETE FROM questions WHERE topic_id = $topic_id;", {
    topic_id: id,
  });
  await executeQuery("DELETE FROM topics WHERE id = $id;", { id: id });
};

// Get all topics from the topics table
const getTopics = async () => {
  const res = await executeQuery("SELECT * FROM topics ORDER BY name ASC;");
  return res.rows;
};

// Get a topic by its id
const getTopic = async (tId) => {
  const res = await executeQuery("SELECT * FROM topics WHERE id = $id;", {
    id: tId,
  });
  return res.rows[0];
};

export { addTopic, deleteTopic, getTopics, getTopic };
