const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;
const model = require('../model/user');
const User = model.User;

exports.createUser = async (req, res) => {
  const user =new User(req.body);
  try{
    const u=await user.save();
    console.log(u);
    res.status(201).json(u);
  }catch(err){
    res.status(400).json(err);
  }
};

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUser = (req, res) => {
  const id = +req.params.id;
  const user = users.find((p) => p.id === id);
  res.json(user);
};

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const user = users.find((p) => p.id === id);
  users.splice(userIndex, 1, { ...user, ...req.body });
  res.status(201).json();
};

exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  users.splice(userIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};

exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1);
  res.status(201).json(user);
};
