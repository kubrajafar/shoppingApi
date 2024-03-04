
const products = require("./data.js");


const express = require("express");
let bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(express.static("public"));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());



let initalPath = path.join(__dirname, "public");
app.use(express.static(initalPath));



app.get("/itemsData", (req, res) => {
  res.send(products);
});
app.get("/itemsData/:id", (req, res) => {
  const id = products.find((data) => data.id == req.params.id);
  res.json(id);
});

app.delete("/itemsData/:id", (req, res) => {
  const delIndex = products.findIndex(
    (data) => data.id === parseInt(req.params.id)
  );
  products.splice(delIndex, 1);
  res.send(products);
});

app.post("/itemsData", (req, res) => {
  products.push({ ...req.body, id: products.length + 1 });
  res.send({ ...req.body, id: products.length + 1 });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("listening on 3000");
});
