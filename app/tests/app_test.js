import * as topicService from "../services/topicService.js";
import * as questionService from "../services/questionService.js";
import * as answerService from "../services/answerService.js";
import * as quizService from "../services/quizService.js";
import { executeQuery } from "../database/database.js";
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.140.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../app.js";

// Test #1
Deno.test({
  name: "Test that getTopics returns array bigger than zero",
  async fn() {
    await topicService.addTopic(1, "test_topic"); // Make sure that the topic database has at least one topic
    const topics = await topicService.getTopics();
    assertNotEquals(topics.length, 0);
    await topicService.deleteTopic(topics[topics.length - 1].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #2
Deno.test({
  name: "Test that getQuestions returns array bigger than zero",
  async fn() {
    await topicService.addTopic(1, "test_question"); // Make sure that the topic database has at least one topic
    const topics = await topicService.getTopics();
    await questionService.addQuestion(
      1,
      topics[topics.length - 1].id,
      "test_question"
    );
    const questions = await questionService.getQuestions(
      topics[topics.length - 1].id
    );
    assertNotEquals(questions.length, 0);
    await topicService.deleteTopic(topics[topics.length - 1].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #3
Deno.test({
  name: "Test that getAnswerOptions returns array bigger than zero",
  async fn() {
    await topicService.addTopic(1, "test_option"); // Make sure that the topic database has at least one topic
    const topics = await topicService.getTopics();
    await questionService.addQuestion(
      1,
      topics[topics.length - 1].id,
      "test_question"
    );
    const questions = await questionService.getQuestions(
      topics[topics.length - 1].id
    );
    await answerService.addAnswerOption(questions[0].id, "test_option", false);
    const options = await answerService.getAnswerOptions(questions[0].id);
    assertNotEquals(options.length, 0);
    await topicService.deleteTopic(topics[topics.length - 1].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #4
Deno.test({
  name: "Test GET request to /api/questions/random responds with an JSON file",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .get("/api/questions/random")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #5
Deno.test({
  name: "Test POST request to /api/questions/answer responds with an JSON file",
  async fn() {
    const testClient = await superoak(app);
    await testClient
      .post("/api/questions/answer")
      .send({ questionId: 1, optionId: 1 })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #6
Deno.test({
  name: "Test that getTopics returns array bigger than zero",
  async fn() {
    await topicService.addTopic(1, "test_topic"); // Make sure that the topic database has at least one topic
    const topics = await quizService.quizTopics();
    assertNotEquals(topics.length, 0);
    await topicService.deleteTopic(topics[topics.length - 1].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #7
Deno.test({
  name: "Test that quizQuestions returns array bigger than zero",
  async fn() {
    await topicService.addTopic(1, "test_question"); // Make sure that the topic database has at least one topic
    const topics = await topicService.getTopics();
    await questionService.addQuestion(
      1,
      topics[topics.length - 1].id,
      "test_question"
    );
    const questions = await quizService.quizQuestions(
      topics[topics.length - 1].id
    );
    assertNotEquals(questions.length, 0);
    await topicService.deleteTopic(topics[topics.length - 1].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #8
Deno.test({
  name: "Test that getQuestion returns array of length of 1",
  async fn() {
    await topicService.addTopic(1, "test_question"); // Make sure that the topic database has at least one topic
    const topics = await topicService.getTopics();
    await questionService.addQuestion(
      1,
      topics[topics.length - 1].id,
      "test_question"
    );
    const questions = await quizService.quizQuestions(
      topics[topics.length - 1].id
    );
    const question = await quizService.getQuestion(questions[0].id);
    assertEquals(question.length, 1);
    await topicService.deleteTopic(topics[topics.length - 1].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #9
Deno.test({
  name: "Test that questionQuizOptions returns array bigger than zero",
  async fn() {
    await topicService.addTopic(1, "test_option"); // Make sure that the topic database has at least one topic
    const topics = await topicService.getTopics();
    await questionService.addQuestion(
      1,
      topics[topics.length - 1].id,
      "test_question"
    );
    const questions = await questionService.getQuestions(
      topics[topics.length - 1].id
    );
    await answerService.addAnswerOption(questions[0].id, "test_option", false);
    const options = await quizService.questionQuizOption(questions[0].id);
    assertNotEquals(options.length, 0);
    await topicService.deleteTopic(topics[topics.length - 1].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// Test #10
Deno.test({
  name: "Test saving answers",
  async fn() {
    await topicService.addTopic(1, "test_option"); // Make sure that the topic database has at least one topic
    const topics = await topicService.getTopics();
    await questionService.addQuestion(
      1,
      topics[topics.length - 1].id,
      "test_question"
    );
    const questions = await questionService.getQuestions(
      topics[topics.length - 1].id
    );
    await answerService.addAnswerOption(questions[0].id, "test_option", false);
    const options = await quizService.questionQuizOption(questions[0].id);
    await quizService.saveAnswer(1, questions[0].id, options[0].id);
    const answer = await executeQuery("SELECT * FROM question_answers;");
    assertEquals(answer.rows[answer.rows.length - 1].user_id, 1);
    assertEquals(
      answer.rows[answer.rows.length - 1].question_id,
      questions[0].id
    );
    assertEquals(
      answer.rows[answer.rows.length - 1].question_answer_option_id,
      options[0].id
    );
    await topicService.deleteTopic(topics[topics.length - 1].id);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
