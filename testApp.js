const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./server/routes/routes");

const app = express();

mongoose.connect(process.env.TEST_MONGODB_URI);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(router);

module.exports = app;