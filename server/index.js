import express from "express";
import cors from "cors";
import "dotenv/config";
import conectToMongo from "./db.js";
import authRoute from "./routes/auth.js";
import noteRoute from "./routes/note.js";
const app = express();
const PORT = 5000;

conectToMongo();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/note", noteRoute);

app.listen(PORT, () => {
  console.log(`iNotebook app listening on http://localhost:${PORT}`);
});
