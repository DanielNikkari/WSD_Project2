import * as topicService from "../../services/topicService.js";

const addTopic = async ({ request, response }) => {
  // get input from the user
  const body = request.body({ type: "form" });
  const params = await body.value;

  console.log(params);
  response.redirect("/topics");
};

const listTopics = async ({ render }) => {
  const topics = await topicService.getTopics();
  render("topicsView.eta", { topics: topics });
};

export { addTopic, listTopics };
