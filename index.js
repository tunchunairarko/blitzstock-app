const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
// set up express

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static("client/build"))

const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));



app.all('/api', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
app.get("/\/((?!api).)*/", function (req, res) {
  res.sendFile('index.html', { root });
})

app.use(helmet());

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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up routes
app.use("/api/products", require("./routes/productRouter"));
app.use("/api/users", require("./routes/userRouter"));


