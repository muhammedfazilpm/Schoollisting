const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const dbConfig = require("./config/dbConfig");
require("dotenv").config();

const schoolRoutes = require("./Router/Schoolroutes");

app.use("/api/school/", schoolRoutes);

app.use("/icons", express.static("./File"));

app.listen(port, () => {
  console.log("server started..");
});
