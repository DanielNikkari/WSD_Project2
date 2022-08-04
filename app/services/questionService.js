import { executeQuery } from "../database/database.js";

// Add a new question to the topic
const addQuestion = async (ueserId, topicId, text) => {
  await executeQuery(
    "INSERT INTO questions (user_id, topic_id, question_text) VALUES ($1, $2, $3);",
    ueserId,
    topicId,
    text
  );
};

// Get all questions for a topic with topic id
const getQuestions = async (topicId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1;",
    topicId
  );
  return res.rows;
};

// Delete a question from database with id
const deleteQuestion = async (qId) => {
  await executeQuery("DELETE FROM questions WHERE id = $1;", qId);
};

export { getQuestions, addQuestion, deleteQuestion };
