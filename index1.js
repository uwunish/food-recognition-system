// const express = require("express");
// const multer = require("multer");
// /*
// express to run our app
// */

// const app = express();
// // const bodyParser = require("body-parser");
// const cors = require("cors");

// const Food = require("./foodDatabase");
// /*
// Initiate the app
// */

// // var allowCrossDomain = function (req, res, next) {
// //     res.header("Access-Control-Allow-Origin", "*");
// //     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
// //     res.header("Access-Control-Allow-Headers", "Content-Type");
// //     next();
// // };

// // app.configure(function () {
// //     app.use(allowCrossDomain);
// //     //some other code
// // });

// // app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors());

// // const food = new Food();

// // Food.find({ name: "Bhaat" })
// //     .then(function (foods) {
// //         console.log(foods);
// //     })
// //     .catch(function (err) {
// //         console.log(err);
// //     });

// app.listen(5000, () => {
//     console.log("Server started on port 5000");
// });

// app.get("/", (req, res) => {
//     res.send("Hello World");
//     console.log("Hello World");
// });

// app.post("/", (req, res) => {
//     console.log("'/' is called");
//     const file = req.body.file;
//     console.log(file);
//     const foodItem = "Bhaat";
//     // res.redirect("/calculate");
//     res.send({ data: file });

//     // body.file = "hello";
//     // res.json(body);
// });

// // app.post("./calculate", (req, res) => {
// //     console.log("/calculate is called in server side");
// //     res.sendFile(__dirname + "../frontend/src/components/App.jsx");
// // });

// // app.post("/calculate", (req, res) => {
// //     console.log("'/calculate' is called");
// //     const imageSource = req.body.imageSource;
// // });
