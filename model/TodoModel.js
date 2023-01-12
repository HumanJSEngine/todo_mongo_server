const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    completed: Boolean,
    // object를 통해서 다른 Model 접근 스키마를 하나 더 설정
    uid:String,
    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
    },
  },
  { collection: "todos" }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };