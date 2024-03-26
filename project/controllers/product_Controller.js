const Product = require("../models/product");
const ProductInstance = require("../models/productInstance");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numProductInstances, numAvailible, numCategories] =
    await Promise.all([
      ProductInstance.countDocuments({}).exec(),
      ProductInstance.countDocuments({ status: "Available" }).exec(),
      Category.countDocuments({}).exec(),
    ]);

  res.render("index", {
    title: "Store Home Page",
    product_instance_count: numProductInstances,
    availible_count:numAvailible,
    category_count: numCategories,
  });
});

exports.products_list = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({},"title description price")
      .sort({title:1})
      .exec();

      res.render("product_list",{title:"Product List",product_list:allProducts});
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  const [product,productInstances] = await Promise.all([
    Product.findById(req.params.id).populate('category').exec(),
    ProductInstance.find({product:req.params.id}).exec(),
  ]);

  if (product === null) {
    const err = new Error('Product not found!');
    err.status = 404;
    next(err);
  }

  res.render("product_detail",{
    title:product.title,
    product:product,
    product_instances:productInstances,
    
  });
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({name:1}).exec();

  res.render("product_form",{title:'Create Product',categories:allCategories});
});

// Handle product create on POST.
exports.product_create_post = [
  (req,res,next) => {
    if (!Array.isArray(req.body.category)) {
      typeof req.body.category === 'undefined'?[]:[req.body.category];
    }
    next();
  },

  body("title","title cannot be empty!")
      .trim()
      .isLength({min:3})
      .escape(),
  body("description","description cannot be empty")
      .trim()
      .isLength({min:4})
      .escape(),
  body("price")
      .trim()
      .isLength({min:1})
      .escape(),
  body("category.*").escape(),

  asyncHandler(async(req,res,next)=>{
    const errors = validationResult(req);

    const product = new Product({
      title:req.body.title,
      description:req.body.description,
      price:req.body.price,
      category:req.body.category,
    });
    
    

      if (!errors.isEmpty()) {
        const allCategories = await Category.find().sort({name:1}).exec();
        for(const category of allCategories) {
          if (product.category.includes(category._id)) {
            category.checked = 'true';
          }
        }
        console.log(allCategories);
        res.render("product_form",{
            title:"Create Product",
            categories:allCategories,
            product:product,
            errors:errors.array(),
        });
      } else {
        await product.save();
        res.redirect(product.url);
      }
  }),
];

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
