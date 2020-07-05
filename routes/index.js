var express = require("express")
var router = express.Router()
var recordModel = require("../models/recordModel.js")
/* GET home page. */
router.get("/", function(req, res, next) {
  res.status(200).json({
    msg: "success",
  })
})

router.post("/report", function(req, res, next) {
  let content = req.body.content
  let time = new Date().getTime()
  var newRecordModel = new recordModel({
    content,
    time,
  })
  newRecordModel.save(function(err, data) {
    if (err) {
      res.status(500).json({ msg: "数据库错误" })
      return console.log(err)
    } else {
      res.status(200).json({ msg: "添加成功", code: 200 })
    }
  })
})

router.get("/actions", function(req, res, next) {
  recordModel.find({}, function(err, data) {
    if (err) return res.json({ status: 1, message: "请求失败" })
    else {
      res.status(200).json({ msg: "查询成功", code: 200, data })
    }
  })
})

module.exports = router
