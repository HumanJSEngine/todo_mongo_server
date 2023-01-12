const { request } = require("express");
let express = require("express");
let router = express.Router();
const { Todo } = require("../model/TodoModel.js");
const { User } = require("../model/UserModel.js");

// 할일 등록
router.post("/submit", (req, res) => {
  // console.log(req.body);
  // let temp = req.body;
  let temp = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
    uid:req.body.uid,
    
  };

  // User Model 에서 req.body.uid 로 받은 값을
  // 이용해서 자료를 추출한다.
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      // User 모델의 ObjectId 를 저장
      temp.author = userInfo._id;
      // 실제 Post Model 업데이트
      const todoPost = new Todo(temp);
      todoPost
        .save()
        .then(() => {
          // 데이터 저장이 성공한 경우
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          // 데이터 저장이 실패한 경우
          console.log(err);
          res.status(400).json({ success: false });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/list", (request, response) => {
  console.log(request.body);
  let sort = {};
  if (request.body.sort === "최신글") {
    sort = { id: -1 };
  } else {
    sort = { id: 1 };
  }

  Todo.find({ title: new RegExp(request.body.search), uid:request.body.uid })
    .populate("author")
    .sort(sort)
    .skip(request.body.skip)
    .limit(5)
    .exec()
    .then((doc) => {
      console.log(doc);
      response.status(200).json({ success: true, initTodo: doc });
    })
    .catch((error) => {
      console.log(error);
      response.status(400).json({ success: false });
    });
});

// 할일의 completed를 업데이트
router.post("/updatetoggle", (request, response) => {
  let temp = {
    completed: request.body.completed,
  };
  Todo.updateOne({ id: request.body.id }, { $set: temp })
    .exec()
    .then(() => {
      console.log("completed 업데이트 완료");
      response.status(200).json({ success: true });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/updatetitle", (request, response) => {
  let temp = {
    title: request.body.title,
  };
  Todo.updateOne({ id: request.body.id }, { $set: temp })
    .exec()
    .then(() => {
      console.log("title 업데이트 완료");
      response.status(200).json({ success: true });
    })
    .catch((error) => {
      console.log(error);
    });
});

//할일 삭제
router.post("/delete", (request, response) => {
  console.log(request.body);

  Todo.deleteOne({ id: request.body.id })
    .exec()
    .then(() => {
      response.status(200).json({ success: true });
    })
    .catch((error) => {
      console.log(error);
      response.status(400).json({ success: false });
    });
});

//할일 모두삭제
router.post("/deleteAll", (request, response) => {
  Todo.deleteMany().exec();
});

router.post("/userout", (req, res) => {
  console.log("사용자 삭제 ", req.body);
  let temp = {
    uid: req.body.uid,
  };
  // mongoose 문서참조
  User.deleteOne({ uid: req.body.uid })
    .exec()
    .then(() => {
      console.log("사용자 삭제 성공!!!");
      Todo.deleteMany({ uid: req.body.uid })
        .then(() => {
          console.log("기록물 삭제 성공!!!");
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          // 데이터 저장이 실패한 경우
          console.log(err);
          res.status(400).json({ success: false });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
