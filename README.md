# CS-C3170 - WSB Project 2: Qu?zzer

## Qu?zzer

**Qu?zzer** is an application for making fun quizzes on various topics. It was made as part of the course _CS-C3170 - Web Software Development_. In the application the user can create a topic for which she/he may add question and the answer options for these questions. Moreover, the users can go and test their knowledge by answering the created quizzes. In addition to creating topics, question and answer options, users may delete them. However, only an admin can delete a topic.

If you would rather use an API you can make a GET request to <code>https://wsd-proj2-quizzer.herokuapp.com/api/questions/random</code> and you will get a random question. To answer the question you can make a POST request with the data: <code>curl -X POST -d '{"questionId":(question number),"optionId":(option number)}' https://wsd-proj2-quizzer.herokuapp.com/api/questions/answer</code>. The API will respond to this by showing if the answer was correct or incorrect.

So go ahead, open the link and test your knowledge! :)

### [Open application]https://wsd-proj2-quizzer.herokuapp.com

## Running the application locally

To run the application locally **Docker** is needed and should be running.

If you run docker and deno on MacBook M1 then you can leave the **Dockerfile** as it is, however, if you use another system then you have to replace
<code>FROM lukechannings/deno:v1.17.2</code>
with
<code>FROM denoland/deno:alpine-1.17.2</code>.

When the Dockerfile is all set, you should be able to compose the application locally on **Docker** by navigating to the folder that has the **docker-compose.yml** and run the command
<code>docker-compose up</code>

Now the **Docker** should compose the application. After the application is running you can navigate to the **port 7777** on your favorite browser by typing the address http://localhost:7777/

If everything went correctly you should see the application front page with the text _Welcome to Qu?zzer_ among some statistics and register/login buttons.

## Running tests

To run the tests **Docker** is needed and should be running.

To run the tests navigate to the folder _tests_ and run the command
<code>docker-compose run --rm app test --allow-all</code>

This should run the tests automatically on Docker.

## License

The application uses **MIT License** and the specifics are found in the _LICENSE_ file. Read more about MIT License here https://en.wikipedia.org/wiki/MIT_License

## Application structure

The application uses **three-tier architecture**: client, server, database. The application has **four layers**: views, controllers, services, database. The application has been built using **Deno** and **Oak**.

### To-Do

- [x] Main page and navigation to topics and questions
- [x] Adding and listing topics
- [x] Removing topics and topic input validation
- [x] Adding and listing questions for topics
- [x] Viewing the question and adding answer options
- [x] Removing answer options and questions
- [x] Registration functionality
- [x] Login functionality
- [x] Asking questions
- [x] API
- [x] Access control
- [x] Styles
- [x] Specifics
- [x] Documentation
- [x] At least 10 meaningful tests
- [x] Running, deployment and documentation
- [x] Usability
