import * as quizService from "../../services/quizService.js";

// Show quiz topics
const showTopics = async ({ render, state }) => {
  const user = await state.session.get("user");
  questions = [];
  render("quizTopics.eta", {
    topics: await quizService.quizTopics(),
    user: user,
  });
};

// Global variable for preventing getting same question two or more times in a row
var questions = [];
// Make sure that the questions array gets refreshed when topic is changed
var latestTopicId = 0;

// Select a random question for a topic
const selectRandomQuestion = async ({ params, response, render, state }) => {
  const user = await state.session.get("user");
  // Check if the topic has changed and empty the questions array
  if (latestTopicId !== params.tId) {
    latestTopicId = params.tId;
    questions = [];
  }
  // If the questions array is empy fetch a new one from the database
  if (questions.length === 0) {
    console.log("NEW FETCH...");
    questions = await quizService.quizQuestions(params.tId);
  }
  // Fetch a random question and remove it from the array
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
      return;
    }
  } else {
    render("quizTopics.eta", {
      topics: await quizService.quizTopics(),
      data: {
        errors: [
          "Unfortunately there are no questions available for this topic.",
        ],
      },
      user: user,
    });
    return;
  }
};

// Show the question and answer options
const showRandomQuestion = async ({ params, render, state }) => {
  const user = await state.session.get("user");
  const data = { question: {}, answerOptions: [], tId: params.tId };
  data.question = (await quizService.getQuestion(params.qId))[0];
  data.answerOptions = await quizService.questionQuizOptions(params.qId);
  render("quizQuestion.eta", { data: data, user: user });
};

const checkIfCorrect = async ({ params, response, state }) => {
  //console.log((await state.session.get("user")).id);
  await quizService.saveAnswer(
    (
      await state.session.get("user")
    ).id,
    params.qId,
    params.oId
  );
  const data = { answerOption: {}, tId: params.tId };
  data.answerOption = (await quizService.questionQuizOption(params.oId))[0];
  if (data.answerOption && data.answerOption.is_correct == true) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
  } else {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
  }
};

// Render if correct
const correct = async ({ params, render, state }) => {
  const user = await state.session.get("user");
  render("quizAnswerCheck.eta", {
    answer: { correctness: true, fix: "" },
    tId: params.tId,
    user: user,
  });
};

// Render if incorrect
const incorrect = async ({ params, render, state }) => {
  const user = await state.session.get("user");
  const correctOption = (await quizService.correctOption(params.qId))[0];
  if (correctOption) {
    render("quizAnswerCheck.eta", {
      answer: { correctness: false, fix: correctOption.option_text },
      tId: params.tId,
      user: user,
    });
  } else {
    render("quizAnswerCheck.eta", {
      answer: { correctness: false, fix: "" },
      tId: params.tId,
      user: user,
    });
  }
};

export {
  showTopics,
  selectRandomQuestion,
  showRandomQuestion,
  checkIfCorrect,
  correct,
  incorrect,
};
