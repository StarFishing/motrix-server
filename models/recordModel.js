var mongoose = require("mongoose")
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/record", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
var recordSchema = new mongoose.Schema({
  content: String,
  time: Number,
})
var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function() {
  // we're connected!
  console.log("连接成功")
})
// 最后一个参数避免数据库连接冲突，保证名称唯一
var model = mongoose.model("record", recordSchema, "record")
module.exports = model
