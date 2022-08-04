import * as topicService from "../../services/topicService.js";

// Function to extract data from request
const getData = async (request) => {
  const data = {
    name: "",
    errors: [],
  };
  if (request) {
    // get input from the user
    const body = request.body({ type: "form" });
    const params = await body.value;
    // Get the name parameter
    data.name = params.get("name");
  }

  return data;
};

// Check data for errors
const validate = (data) => {
  const errors = [];

  if (data.name.length < 1) {
    errors.push("Name has to have at least one character.");
  }

  return errors;
};

// Controller for adding a topic
const addTopic = async ({ request, response, render, state }) => {
  const user = await state.session.get("user");
  const data = await getData(request);
  data.errors = validate(data);
  if (!user.admin) {
    data.errors.push("You must be an admin to add a topic!");
  }
  if (data.errors.length > 0) {
    render("topicsView.eta", {
      data: data,
      topics: await topicService.getTopics(),
    });
  } else {
    await topicService.addTopic(
      (
        await state.session.get("user")
      ).id,
      data.name
    );
    response.redirect("/topics");
  }
};

// Controller for deleting a topic with id
const deleteTopic = async ({ params, response, state }) => {
  const user = await state.session.get("user");
  if (!user.admin) {
    response.body = "You must be an admin to delete a topic!";
    response.redirect("/topics");
    return;
  }
  await topicService.deleteTopic(params.id);
  response.redirect("/topics");
};

// Controller for listing topics
const listTopics = async ({ render, state }) => {
  const topics = await topicService.getTopics();
  //console.log(await state.session.get("user"));
  render("topicsView.eta", {
    topics: topics,
    data: { name: "" },
    user: await state.session.get("user"),
  });
};

export { addTopic, listTopics, deleteTopic };
