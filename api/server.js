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
    const users = await usersModel.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await usersModel.remove(id);
    if (!userDeleted) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(userDeleted);
    }
  } catch (err) {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    const updatedUser = await usersModel.update(id, { name, bio });
    if (!updatedUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else if (name === undefined || bio === undefined) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
