// server.js
// where your node app starts

// init project
require("dotenv").config()
var express = require("express")
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  // eslint-disable-next-line no-undef
  res.sendFile(__dirname + "/views/index.html")
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" })
})



// listen for requests :)
// eslint-disable-next-line no-undef
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port)
})

app.get("/api/whoami", (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress

  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7)
  }
  
  res.json({
    ipaddress: ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  })
})
