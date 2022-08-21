const express = require("express");
require("dotenv").config();
const conectToMongo = require("./db");
const app = express();
const port = 5000;

conectToMongo();

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
