require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());


const { sequelize } = require("./models");

app.use(express.json());

const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});
