import * as quizService from "../../services/quizService.js";

// Respond with a random question or an empty object
const apiRandQuestion = async ({ response }) => {
  const apiData = { questionId: 0, questionText: "", answerOptions: [] };
  var optionData = { optionId: 0, optionText: "" };
  const questions = await quizService.getAllQuestions();
  if (questions && questions.length > 0) {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    const answerOptions = await quizService.questionQuizOptions(
      randomQuestion.id
    );

    apiData.questionId = randomQuestion.id;
    apiData.questionText = randomQuestion.question_text;
    for (let i = 0; i < answerOptions.length; i++) {
      optionData = { optionId: 0, optionText: "" };
      optionData.optionId = answerOptions[i].id;
      optionData.optionText = answerOptions[i].option_text;
      apiData.answerOptions.push(optionData);
    }

    // Return data in the response body
    response.body = apiData;
    response.status = 200;
  } else {
    // Return an empty object of no questions found
    response.body = {};
  }
};

// Check if correct and return true or false
const apiCheckIfCorrect = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const oId = document.optionId;

  // Fetch question option and check if true or false
  const answerOption = (await quizService.questionQuizOption(oId))[0];
  if (answerOption && answerOption.is_correct == true) {
    response.body = { correct: true };
  } else {
    response.body = { correct: false };
  }
};

export { apiRandQuestion, apiCheckIfCorrect };
