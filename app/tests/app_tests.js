import * as api from "../routes/apis/quizApi.js";
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.140.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../app.js";

Deno.test(
  "A get request to /api/questions/random responds with an object",
  async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random").expect({});
  }
);
