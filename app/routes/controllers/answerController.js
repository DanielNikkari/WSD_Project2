import * as answerService from "../../services/answerService.js";

// Function to extract data from request
const getData = async (request) => {
  const data = {
    text: "",
    correctness: false,
    errors: [],
  };
  if (request) {
    const body = request.body({});
    const values = await body.value;
    data.text = values.get("option_text");
    // Check if the request contains value with name is_correct
    if (values.get("is_correct")) {
      data.correctness = true;
    }
  }

  return data;
};

// Check data for errors
const validate = (data) => {
  const errors = [];

  if (data.text.length < 1) {
    errors.push("Text has to have at least one character.");
  }

  return errors;
};

// Add an answer option
const addAnswerOption = async ({ params, request, response, render }) => {
  const data = await getData(request);
  data.errors = validate(data);
  if (data.errors.length > 0) {
    render("answerOptionView.eta", {
      data: data,
      question: {
        text: (await answerService.getQuestion(params.qId))[0].question_text,
        id: params.qId,
      },
      answerOptions: await answerService.getAnswerOptions(params.qId),
      topic: { id: params.id },
    });
  } else {
    await answerService.addAnswerOption(
      params.qId,
      data.text,
      data.correctness
    );
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
  }
};

// List answer options for a question
const listAnswerOptions = async ({ params, render }) => {
  render("answerOptionView.eta", {
    question: {
      text: (await answerService.getQuestion(params.qId))[0].question_text,
      id: params.qId,
    },
    answerOptions: await answerService.getAnswerOptions(params.qId),
    topic: { id: params.id },
  });
};

export { addAnswerOption, listAnswerOptions };
