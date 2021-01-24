const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
// set up express

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("../btz-front/build"))
app.use(helmet());


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);


// set up routes

app.use("/api/users", require("./routes/userRouter"));
app.use("/api/products", require("./routes/productRouter"));
