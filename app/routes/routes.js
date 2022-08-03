import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/qestionsController.js";
import * as answerController from "./controllers/answerController.js";

const router = new Router();

// main route
router.get("/", mainController.showMain);

// topics routes
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

// Questions routes
router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.post(
  "/topics/:tId/questions/:qId/delete",
  questionController.deleteQuestion
);

// Answer routes
router.get("/topics/:id/questions/:qId", answerController.listAnswerOptions);
router.post(
  "/topics/:id/questions/:qId/options",
  answerController.addAnswerOption
);
router.post(
  "/topics/:tId/questions/:qId/options/:oId/delete",
  answerController.deleteAnswerOption
);

export { router };
