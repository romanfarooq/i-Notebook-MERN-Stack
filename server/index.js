import express from "express";
import "dotenv/config";
import conectToMongo from "./db.js";
import authRoute from "./routes/auth.js";
import noteRoute from "./routes/note.js";
const app = express();
const PORT = 5000;

conectToMongo();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/note", noteRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
