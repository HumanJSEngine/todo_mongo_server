const { response } = require("express");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/key.js");
const app = express();

const port = 5000;
//요청이 들어오면 json 사용 및 url 인코딩 진행해줌
var cors = require("cors");
let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "./build/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", require("./router/Post.js"));
app.use("/api/user", require("./router/User.js"));

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

app.get("/", (req, res) => {
  // 파일을 보여줌
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
//  주소가 없는 경우에 강제 URL 이동
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.get((req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

//할일 등록 Post를 분리

// app.post("/api/post/submit", (request, response) => {
//   let temp = request.body;
//   const todoPost = new Todo(temp);
//   todoPost
//     .save()
//     .then(() => {
//       response.status(200).json({ success: true });
//     })
//     .catch((error) => {
//       console.log(err);
//       response.status(400).json({ success: false });
//     });
// });

// app.post("/api/post/list", (request, response) => {
//   console.log("전체목록 호출");
//   Todo.find({})
//     .exec()
//     .then((doc) => {
//       console.log(doc);
//       response.status(200).json({ success: true, initTodo: doc });
//     })
//     .catch((error) => {
//       console.log(error);
//       response.status(400).json({ success: false });
//     });
// });

// // 할일의 completed를 업데이트
// app.post("/api/post/updatetoggle", (request, response) => {
//   let temp = {
//     completed: request.body.completed,
//   };
//   console.log(request.body);
//   Todo.updateOne({ id: request.body.id }, { $set: temp })
//     .exec()
//     .then(() => {
//       console.log("completed 업데이트 완료");
//       response.status(200).json({ success: true });
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   //mongoose 문서 참조
// });

// //타이틀 업데이트

// app.post("/api/post/updatetitle", (request, response) => {
//   let temp = {
//     title: request.body.title,
//   };
//   Todo.updateOne({ id: request.body.id }, { $set: temp })
//     .exec()
//     .then(() => {
//       console.log("title 업데이트 완료");
//       response.status(200).json({ success: true });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// //할일 삭제
// app.post("/api/post/delete", (request, response) => {
//   console.log(request.body);

//   Todo.deleteOne({ id: request.body.id })
//     .exec()
//     .then(() => {
//       response.status(200).json({ success: true });
//     })
//     .catch((error) => {
//       console.log(error);
//       response.status(400).json({ success: false });
//     });
// });

// //할일 모두삭제
// app.post("/api/post/deleteAll", (request, response) => {
//   Todo.deleteMany().exec();
// });
