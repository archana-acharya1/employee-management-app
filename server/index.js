require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");
const employeeRouter = require("./routes/employee");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/employees", employeeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
