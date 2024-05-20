const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const { mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const startServer = async () => {
  await db();
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Backend server is running on port ${port}`));
};


server();
