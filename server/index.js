const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "user",
  password: "user123",
  database: "CrudSimpleDB",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sql = "SELECT * FROM movie";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const review = req.body.review;
  const sqlInsert = "INSERT INTO movie (name,review) VALUES (?,?)";
  db.query(sqlInsert, [name, review], (err, result) => {
    console.log(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const review = req.body.review;
  const id = req.params.id;

  const sql = "UPDATE movie SET review = ? WHERE id = ?";
  db.query(sql, [review, id], (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM movie WHERE id=?";
  db.query(sql, id, (err, result) => {
    console.log(result);
  });
});

app.listen(3002, () => {
  console.log("running server");
});
