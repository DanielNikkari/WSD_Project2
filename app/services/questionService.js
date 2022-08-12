import { executeQuery } from "../database/database.js";

// Add a new question to the topic
const addQuestion = async (ueserId, topicId, text) => {
  await executeQuery(
    "INSERT INTO questions (user_id, topic_id, question_text) VALUES ($user_id, $topic_id, $question_text);",
    { user_id: ueserId, topic_id: topicId, question_text: text }
  );
};

// Get all questions for a topic with topic id
const getQuestions = async (topicId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $topic_id;",
    { topic_id: topicId }
  );
  return res.rows;
};

// Delete a question and dependencies from database with id
const deleteQuestion = async (qId) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_id = $question_id;",
    { question_id: qId }
  );
  await executeQuery(
    "DELETE FROM question_answer_options WHERE question_id = $question_id;",
    { question_id: qId }
  );
  await executeQuery("DELETE FROM questions WHERE id = $id;", { id: qId });
};

export { getQuestions, addQuestion, deleteQuestion };
