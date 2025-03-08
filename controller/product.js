const fs = require("fs");
const model = require('../model/product');
const Product = model.Product;
const mongoose = require('mongoose');

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try{
    const p=await product.save();
    res.status(201).json(p);
  }catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getAllProducts = async (req, res) => {
  const products =await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = await Product.findById(id);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try{
    const product = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json(product);
  }catch(err){
    res.status(400).json(err);
  }
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try{
    const product = await Product.findOneAndReplace({_id:id},req.body,{new:true})
    res.status(201).json(product);
  }catch(err){
    res.status(400).json(err);
  }
};

exports.deleteProduct =async (req, res) => {
  const id = req.params.id;
  try{
    const product = await Product.findOneAndDelete({_id:id},req.body,{new:true})
    res.status(201).json(product);
  }catch(err){
    res.status(400).json(err);
  }
};
