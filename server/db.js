const mongoose = require("mongoose");
const mongUrl = "mongodb://localhost:27017/";

const conectToMongo = () => {
  mongoose.connect(mongUrl, () => {
    console.log("conected to mongo succesfully");
  });
};

module.exports = conectToMongo;