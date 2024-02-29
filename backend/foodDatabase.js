const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/localNepaliFoodDB");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    calorie: {
        type: Number,
        required: true,
    },
    nutritionalInformation: {
        carbohydrate: {
            type: Number,
            required: true,
        },
        protein: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        },
    },
    /* You may need additional fields based on your requirements
    For example, you might want to store the bounding box information detected in the image */
});

// create the model using schema
const Food = mongoose.model("Food", foodSchema);
/* here, mongoose.model has two parameter.
first is of string type which specifies what type of collection(table/relation) is made, based on foodSchema.Also, the Mongoose recommend to specify the singular name of your collection, but it later changes to plural form automatically in the database
Second is the name of schema, the model is based on
*/

const daal = new Food({
    name: "Daal",
    calorie: 90.45,
    nutritionalInformation: {
        carbohydrate: 10.18,
        protein: 4.68,
        fat: 3.24,
    },
});

const bhaat = new Food({
    name: "Bhaat",
    calorie: 130,
    nutritionalInformation: {
        carbohydrate: 28.2,
        protein: 2.69,
        fat: 0.28,
    },
});

const selRoti = new Food({
    name: "Sel roti",
    calorie: 369,
    nutritionalInformation: {
        carbohydrate: 36,
        protein: 1.8,
        fat: 25.2,
    },
});

const samosa = new Food({
    name: "Samosa",
    calorie: 308,
    nutritionalInformation: {
        carbohydrate: 32,
        protein: 5,
        fat: 18,
    },
});

const thukpa = new Food({
    name: "Thukpa",
    calorie: 81.9,
    nutritionalInformation: {
        carbohydrate: 15.9,
        protein: 4.7,
        fat: 0.4,
    },
});

const chowmein = new Food({
    name: "Chowmein",
    calorie: 475,
    nutritionalInformation: {
        carbohydrate: 73,
        protein: 8,
        fat: 15,
    },
});

const momo = new Food({
    name: "Momo",
    calorie: 198,
    nutritionalInformation: {
        carbohydrate: 20.6,
        protein: 8.7,
        fat: 9,
    },
});

const gundruk = new Food({
    name: "Gundruk",
    calorie: 321,
    nutritionalInformation: {
        carbohydrate: 38.3,
        protein: 38.7,
        fat: 2.1,
    },
});

const dhindo = new Food({
    name: "Dhindo",
    calorie: 110,
    nutritionalInformation: {
        carbohydrate: 22.5,
        protein: 2.5,
        fat: 1.5,
    },
});

const yomari = new Food({
    name: "Yomari",
    calorie: 225,
    nutritionalInformation: {
        carbohydrate: 55,
        protein: 7.5,
        fat: 2.5,
    },
});

const kheer = new Food({
    name: "Kheer",
    calorie: 197.33,
    nutritionalInformation: {
        carbohydrate: 26.98,
        protein: 4.3,
        fat: 6.28,
    },
});

const kwati = new Food({
    name: "Kwati",
    calorie: 90,
    nutritionalInformation: {
        carbohydrate: 18,
        protein: 6,
        fat: 1.5,
    },
});

const chatpatey = new Food({
    name: "Chatpatey",
    calorie: 350,
    nutritionalInformation: {
        carbohydrate: 80,
        protein: 5,
        fat: 2,
    },
});

// Food.insertMany([
//     daal,
//     bhaat,
//     selRoti,
//     samosa,
//     thukpa,
//     chowmein,
//     momo,
//     gundruk,
//     dhindo,
//     yomari,
//     kheer,
//     kwati,
//     chatpatey,
// ])
//     .then(() => {
//         console.log("Successfully saved food to localNepaliFood DB");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

console.log("foodDatabase.js is called");

// Food.find({ name: "Daal" })
//     .then(function (foods) {
//         console.log(foods);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

module.exports = Food;
