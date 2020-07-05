var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var ejs = require("ejs")
var indexRouter = require("./routes/index")
var cors = require("cors")

var bodyParser = require("body-parser")
var app = express()
app.use(
  cors({
    // origin: 'http://www.baidu.com',
    optionsSuccessStatus: 200,
    maxAge: 86400,
    // credentials: true,
    // origin: "http://172.18.6.114:8000" // web前端服务器地址
  })
)
app.use(bodyParser.json({ limit: "10000kb" }))
// view engine setup
// app.set("views", path.join(__dirname, "views"))
app.engine("html", ejs.__express)
app.set("view engine", "html")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/", indexRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
  res.send(err.toString())
})

module.exports = app
