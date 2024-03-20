const Product = require('../models/product');
const ProductInstance = require('../models/productInstance');
const Category = require('../models/category');
const {body,validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async(req,res,next)=>{
    res.send("ni home page");
});

exports.products_list = asyncHandler(async(req,res,next)=>{
    res.send('ni product list')
});

exports.product_detail = asyncHandler(async(req,res,next)=>{
    res.send('ni product detail');
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Product create GET");
  });
  
  // Handle product create on POST.
  exports.product_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Product create POST");
  });
  
  // Display product delete form on GET.
  exports.product_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Product delete GET");
  });
  
  // Handle product delete on POST.
  exports.product_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Product delete POST");
  });
  
  // Display product update form on GET.
  exports.product_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Product update GET");
  });
  
  // Handle product update on POST.
  exports.product_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Product update POST");
  });