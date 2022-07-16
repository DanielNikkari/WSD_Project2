import { executeQuery } from "../database/database.js";

// Get quiz statistics for main view
const getStatistics = async () => {
  const topicCount = await executeQuery("SELECT COUNT(*) FROM topics;");
  const questionCount = await executeQuery("SELECT COUNT(*) FROM questions;");
  const answerCount = await executeQuery(
    "SELECT COUNT(*) FROM question_answers;"
  );
  // Return array of count values transformed to numbers
  return [
    Number(topicCount.rows[0].count),
    Number(questionCount.rows[0].count),
    Number(answerCount.rows[0].count),
  ];
};

export { getStatistics };
