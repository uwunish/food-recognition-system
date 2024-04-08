const ort = require("onnxruntime-node");
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
/* 
express to run our app
*/

const app = express();
const upload = multer();
// const bodyParser = require("body-parser");
const cors = require("cors");

const Food = require("./foodDatabase");
/*
Initiate the app
*/

// var allowCrossDomain = function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
// };

// app.configure(function () {
//     app.use(allowCrossDomain);
//     //some other code
// });

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// const food = new Food();

// Food.find({ name: "Bhaat" })
//     .then(function (foods) {
//         console.log(foods);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

app.get("/", (req, res) => {
    res.send("Hello World");
    console.log("Hello World");
});

app.post("/", upload.single("image_file"), (req, res) => {
    console.log("'/' is called");
    const file = req.body.file;
    console.log(file);
    // const foodItem = "Bhaat";
    // res.redirect("/calculate");
    // const boxes = detect_objects_on_image(file);
    // res.json(boxes);
    res.send({ data: file });

    // body.file = "hello";
    // res.json(body);
});

// app.post("./calculate", (req, res) => {
//     console.log("/calculate is called in server side");
//     res.sendFile(__dirname + "../frontend/src/components/App.jsx");
// });

// app.post("/calculate", (req, res) => {
//     console.log("'/calculate' is called");
//     const imageSource = req.body.imageSource;
// });

function detect_objects_on_image(buf) {
    const [input, img_width, img_height] = prepare_input(buf);
    const output = run_model(input);
    return process_output(output, img_width, img_height);
}

function prepare_input(buf) {
    const img = sharp(buf);
    const md = img.metadata();
    const [img_width, img_height] = [md.width, md.height];
    const pixels = img
        .removeAlpha()
        .resize({ width: 640, height: 640, fit: "fill" })
        .raw()
        .toBuffer();
    const red = [],
        green = [],
        blue = [];
    for (let index = 0; index < pixels.length; index += 3) {
        red.push(pixels[index] / 255.0);
        green.push(pixels[index + 1] / 255.0);
        blue.push(pixels[index + 2] / 255.0);
    }

    const input = [...red, ...green, ...blue];
    return [input, img_width, img_height];
}

function run_model(input) {
    const model = ort.InferenceSession.create("yolov8n.onnx");
    input = new ort.Tensor(Float32Array.from(input), [1, 3, 640, 640]);
    const outputs = model.run({ images: input });
    return outputs["output0"].data;
}

function process_output(output, img_width, img_height) {
    let boxes = [];
    for (let index = 0; index < 1000; index++) {
        // let class_id = 0,
        //     prob = 0;
        // for (let col = 4; col < 10; col++) {
        //     if (output[1000 * col + index] > prob) {
        //         prob = output[1000 * col + index];
        //         class_id = col - 4;
        //     }
        // }

        const [class_id, prob] = [...Array(10).keys()]
            .map((col) => [col, output[1000 * (col + 4) + index]])
            .reduce(
                (accum, item) => (item[1] > accum[1] ? item : accum),
                [0, 0]
            );

        if (prob < 0.5) {
            continue;
        }

        const label = yolo_classes[class_id];
        const xc = output[1000 * 0 + index];
        const yc = output[1000 * 1 + index];
        const w = output[1000 * 2 + index];
        const h = output[1000 * 3 + index];
        const x1 = ((xc - w / 2) / 640) * img_width;
        const y1 = ((yc - h / 2) / 640) * img_height;
        const x2 = ((xc + w / 2) / 640) * img_width;
        const y2 = ((yc + h / 2) / 640) * img_height;
        boxes.push([x1, y1, x2, y2, label, prob]);
    }

    boxes = boxes.sort((box1, box2) => box2[5] - box1[5]);
    const result = [];
    while (boxes.length > 0) {
        result.push(boxes[0]);
        boxes = boxes.filter((box) => iou(boxes[0], box) < 0.7);
    }
    return result;
}

function iou(box1, box2) {
    return intersection(box1, box2) / union(box1, box2);
}

function union(box1, box2) {
    const [box1_x1, box1_y1, box1_x2, box1_y2] = box1;
    const [box2_x1, box2_y1, box2_x2, box2_y2] = box2;
    const box1_area = (box1_x2 - box1_x1) * (box1_y2 - box1_y1);
    const box2_area = (box2_x2 - box2_x1) * (box2_y2 - box2_y1);
    return box1_area + box2_area - intersection(box1, box2);
}

function intersection(box1, box2) {
    const [box1_x1, box1_y1, box1_x2, box1_y2] = box1;
    const [box2_x1, box2_y1, box2_x2, box2_y2] = box2;
    const x1 = Math.max(box1_x1, box2_x1);
    const y1 = Math.max(box1_y1, box2_y1);
    const x2 = Math.min(box1_x2, box2_x2);
    const y2 = Math.min(box1_y2, box2_y2);
    return (x2 - x1) * (y2 - y1);
}

const yolo_classes = [
    "chatpatey",
    "chowmein",
    "dal",
    "dhido",
    "gundruk",
    "kheer",
    "momo",
    "samosa",
    "selroti",
    "thukpa",
    "bhat",
];
