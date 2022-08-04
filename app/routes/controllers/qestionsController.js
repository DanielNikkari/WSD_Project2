import * as questionService from "../../services/questionService.js";

// Function to extract data from request
const getData = async (request) => {
  const data = {
    text: "",
    errors: [],
  };
  if (request) {
    const body = request.body({});
    const values = await body.value;
    data.text = values.get("question_text");
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

// Controller for adding a question
const addQuestion = async ({ params, request, response, render, state }) => {
  const data = await getData(request);
  data.errors = validate(data);
  //console.log(params.id);

  if (data.errors.length > 0) {
    render("questionsView.eta", {
      data: data,
      questions: await questionService.getQuestions(params.id),
      topic: { id: params.id },
      user: await state.session.get("user"),
    });
  } else {
    await questionService.addQuestion(
      (
        await state.session.get("user")
      ).id,
      params.id,
      data.text
    );
    response.redirect(`/topics/${params.id}`);
  }
};

// Controller for listing questions of a topic
const listQuestions = async ({ params, render, state }) => {
  render("questionsView.eta", {
    questions: await questionService.getQuestions(params.id),
    topic: { id: params.id },
    user: await state.session.get("user"),
  });
};

// Delete a question with id
const deleteQuestion = async ({ params, response }) => {
  await questionService.deleteQuestion(params.qId);
  response.redirect(`/topics/${params.tId}`);
};

export { listQuestions, addQuestion, deleteQuestion };
