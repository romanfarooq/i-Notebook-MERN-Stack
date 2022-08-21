const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL;

console.log(mongoUrl);

const conectToMongo = () => {
  mongoose.connect(mongoUrl, () => {
    console.log("conected to mongo succesfully");
  });
};

module.exports = conectToMongo;