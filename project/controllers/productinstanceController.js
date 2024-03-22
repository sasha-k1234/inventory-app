const ProductInstance = require('../models/productInstance');
const Product = require('../models/product');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const {body,validationResult} = require('express-validator');

exports.productinstance_list = asyncHandler(async (req, res, next) => {
  const allProductInstances = await ProductInstance.find().populate("product").exec();

  res.render("productInstance_list",{title:"Product Instance List",instances_list:allProductInstances});
  });
  
  // Display detail page for a specific ProductInstance.
  exports.productinstance_detail = asyncHandler(async (req, res, next) => {
    const productInstance = await ProductInstance.findById(req.params.id).populate('product').exec();

    if (productInstance === null) {
      const err = new Error('Instance not found');
      err.stautus = 404;
      next(err);
    }

    res.render("productinstance_detail",{
      title:"Product",
      productInstance:productInstance
    });
  });
  
  // Display ProductInstance create form on GET.
  exports.productinstance_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ProductInstance create GET");
  });
  
  // Handle ProductInstance create on POST.
  exports.productinstance_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ProductInstance create POST");
  });
  
  // Display ProductInstance delete form on GET.
  exports.productinstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ProductInstance delete GET");
  });
  
  // Handle ProductInstance delete on POST.
  exports.productinstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ProductInstance delete POST");
  });
  
  // Display ProductInstance update form on GET.
  exports.productinstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ProductInstance update GET");
  });
  
  // Handle productinstance update on POST.
  exports.productinstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ProductInstance update POST");
  });