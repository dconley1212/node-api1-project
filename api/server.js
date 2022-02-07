// BUILD YOUR SERVER HERE
const express = require("express");
const usersModel = require("./users/model");

const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio, id } = req.body;
    if (name === undefined || bio === undefined) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const newUser = await usersModel.insert({ id, name, bio });
      res.status(201).json(newUser);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    res.json();
  } catch (err) {}
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
