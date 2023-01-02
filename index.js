const { response } = require("express");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { Todo } = require("./model/TodoModel");

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "../client/build/")));

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://admin:q1q2q3q4@cluster0.edebv8n.mongodb.net/todoData?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("DB 연결 성공");
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log(`DB 연결 실패 ${err}`);
    });
});

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//주소가 없는 경우에 강제 URL 이동

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/test", (request, response) => {
  console.log(request.body);
  response.status(200).json({
    success: true,
    text: request.body.message,
    name: request.body.name,
  });
});

//등록

app.post("/api/post/submit", (request, response) => {
  // console.log(request.body)
  let temp = request.body;
  const todoPost = new Todo(temp);
  todoPost
    .save()
    .then(() => {
      response.status(200).json({ success: true });
    })
    .catch((error) => {
      console.log(err);
      response.status(400).json({ success: false });
    });
});
