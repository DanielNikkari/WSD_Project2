import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/qestionsController.js";
import * as answerController from "./controllers/answerController.js";
import * as registerationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as api from "./apis/quizApi.js";

const router = new Router();

// main route
router.get("/", mainController.showMain);

// Registeration routes
router.get("/auth/register", registerationController.showRegisterationForm);
router.post("/auth/register", registerationController.registerUser);

// Login routes
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

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

// Quiz routes
router.get("/quiz", quizController.showTopics);
router.get("/quiz/:tId", quizController.selectRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showRandomQuestion);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correct);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrect);
router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  quizController.checkIfCorrect
);

// API routes
router.get("/api/questions/random", api.apiRandQuestion);
router.post("/api/questions/answer", api.apiCheckIfCorrect);

export { router };
