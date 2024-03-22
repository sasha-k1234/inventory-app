const Category = require('../models/category');
const Product = require('../models/product');
const {body,validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');

// Display list of all Category.
exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({name:1}).exec();

    res.render("categories_list",{
      title:"Categories List",
      all_categories:allCategories,
    });
  });
  
  // Display detail page for a specific Category.
  exports.category_detail = asyncHandler(async (req, res, next) => {
   const [category,productsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category:req.params.id },"title description").exec(),
   ]);
 
   if (category === null) {
    const err = new Error('category not found!');
    err.status = 404;
    return next(err);
   }

   res.render("category_detail",{
    title:"Category Detail",
    category:category,
    category_products:productsInCategory,
   });

  });
  
  // Display Category create form on GET.
  exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create GET");
  });
  
  // Handle Category create on POST.
  exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create POST");
  });
  
  // Display Category delete form on GET.
  exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete GET");
  });
  
  // Handle Category delete on POST.
  exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete POST");
  });
  
  // Display Category update form on GET.
  exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update GET");
  });
  
  // Handle Category update on POST.
  exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update POST");
  });