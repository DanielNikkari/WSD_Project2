import { executeQuery } from "../database/database.js";

// Add a new answer option
const addAnswerOption = async (qId, text, correctness) => {
  await executeQuery(
    "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($question_id, $option_text, $is_correct);",
    { question_id: qId, option_text: text, is_correct: correctness }
  );
};

// Get all answer options for a given question
const getAnswerOptions = async (qId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $question_id;",
    { question_id: qId }
  );
  return res.rows;
};

// Delete answer option and dependencies with id
const deleteAnswerOption = async (oId) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_answer_option_id = $question_answer_option_id;",
    { question_answer_option_id: oId }
  );
  await executeQuery("DELETE FROM question_answer_options WHERE id = $id;", {
    id: oId,
  });
};

// Get question
const getQuestion = async (qId) => {
  const res = await executeQuery("SELECT * FROM questions WHERE id = $id;", {
    id: qId,
  });
  return res.rows;
};

export { addAnswerOption, getAnswerOptions, deleteAnswerOption, getQuestion };
