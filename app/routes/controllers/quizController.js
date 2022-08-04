import * as quizService from "../../services/quizService.js";

// Show quiz topics
const showTopics = async ({ render }) => {
  questions = [];
  render("quizTopics.eta", { topics: await quizService.quizTopics() });
};

// Global variable for preventing getting same question two or more times in a row
var questions = [];
// Make sure that the questions array gets refreshed when topic is changed
var latestTopicId = 0;

// Select a random question for a topic
const selectRandomQuestion = async ({ params, response, render }) => {
  if (latestTopicId !== params.tId) {
    latestTopicId = params.tId;
    questions = [];
  }
  if (questions.length === 0) {
    console.log("NEW FETCH...");
    questions = await quizService.quizQuestions(params.tId);
  }
  if (questions && questions.length > 0) {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    var index = questions.indexOf(randomQuestion);
    if (index > -1) {
      questions.splice(index, 1);
    }
    //console.log(questions.length);
    if (randomQuestion) {
      response.redirect(`/quiz/${params.tId}/questions/${randomQuestion.id}`);
    } else {
      response.status = 404;
    }
  } else {
    render("quizTopics.eta", {
      topics: await quizService.quizTopics(),
      data: {
        errors: [
          "Unfortunately there are no questions available for this topic.",
        ],
      },
    });
    return;
  }
};

// Show the question and answer options
const showRandomQuestion = async ({ params, render }) => {
  const data = { question: {}, answerOptions: [], tId: params.tId };
  data.question = (await quizService.getQuestion(params.qId))[0];
  data.answerOptions = await quizService.questionQuizOptions(params.qId);
  render("quizQuestion.eta", { data: data });
};

const checkIfCorrect = async ({ params, response }) => {
  const data = { answerOption: {}, tId: params.tId };
  data.answerOption = (await quizService.questionQuizOption(params.oId))[0];
  if (data.answerOption && data.answerOption.is_correct == true) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
  } else {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
  }
};

// Render if correct
const correct = async ({ params, render }) => {
  render("quizAnswerCheck.eta", {
    answer: { correctness: true, fix: "" },
    tId: params.tId,
  });
};

// Render if incorrect
const incorrect = async ({ params, render }) => {
  const correctOption = (await quizService.correctOption(params.qId))[0];
  render("quizAnswerCheck.eta", {
    answer: { correctness: false, fix: correctOption.option_text },
    tId: params.tId,
  });
};

export {
  showTopics,
  selectRandomQuestion,
  showRandomQuestion,
  checkIfCorrect,
  correct,
  incorrect,
};
