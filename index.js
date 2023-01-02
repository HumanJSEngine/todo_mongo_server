const { response } = require("express");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { Todo } = require("./model/TodoModel");

const config = require("./config/key.js");

const app = express();

const port = 5000;
//요청이 들어오면 json 사용 및 url 인코딩 진행해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/build/")));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
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

app.post("/api/post/submit", (request, response) => {
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

//목록 읽어오기
app.post("/api/post/list", (request, response) => {
  console.log("전체목록 호출");
  Todo.find({})
    .exec()
    .then((doc) => {
      console.log(doc);
      response.status(200).json({success:true, initTodo:doc});
    })
    .catch((error) => {
      console.log(error);
      response.status(400).json({success:true});
    });
});
