import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URL;

const conectToMongo = () => {
  mongoose.connect(mongoUrl, () => {
    console.log("conected to mongo succesfully");
  });
};

export default conectToMongo;