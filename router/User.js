const { request, response } = require("express");
let express = require("express");
let router = express.Router();

const { User } = require("../model/UserModel.js");

router.post("/register", (request, response) => {
  console.log(request.body);
  const userData = new User(request.body);
  userData
    .save()
    .then(() => {
      response.status(200).json({ success: true });
    })
    .catch(() => {
      response.status(400).json({ success: false });
    });
});

//이름 중복 검사
router.post("/nameCheck", (request, response) => {
  console.log(request.body.displayName);
  User.findOne({ displayName: request.body.displayName })
    .exec()
    .then((doc) => {
      console.log(doc);
      //사용자가 기본값으로 등록가능
      let check = true;
      if (doc) {
        //만약 사용자 정보가 있다면 등록 불가능으로 리턴
        check = false;
      }
      response.status(200).json({ success: true, check });
    })
    .catch((err) => {
      console.log(err);
      response.status(400).json({ success: false });
    });
});

module.exports = router;
