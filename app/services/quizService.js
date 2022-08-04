import { executeQuery } from "../database/database.js";

// Get quiz topics
const quizTopics = async () => {
  const res = await executeQuery("SELECT * FROM topics;");
  return res.rows;
};

// Get questions for chosen topic
const quizQuestions = async (tId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $1;",
    tId
  );
  return res.rows;
};

// Get specific question with id
const getQuestion = async (qId) => {
  const res = await executeQuery("SELECT * FROM questions WHERE id = $1;", qId);
  return res.rows;
};

// Get answer options for a question
const questionQuizOptions = async (qId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1;",
    qId
  );
  return res.rows;
};

// Get answer option
const questionQuizOption = async (oId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE id = $1;",
    oId
  );
  return res.rows;
};

const correctOption = async (qId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = TRUE;",
    qId
  );
  return res.rows;
};

export {
  quizTopics,
  quizQuestions,
  getQuestion,
  questionQuizOptions,
  questionQuizOption,
  correctOption,
};
