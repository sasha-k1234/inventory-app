const Category = require("../models/category");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all Category.
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("categories_list", {
    title: "Categories List",
    all_categories: allCategories,
  });
});

// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, productsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category: req.params.id }, "title description").exec(),
  ]);

  if (category === null) {
    const err = new Error("category not found!");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Category Detail",
    category: category,
    category_products: productsInCategory,
  });
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
});

// Handle Category create on POST.
exports.category_create_post = [
  body("name", "Category name must contain at leat 4 charachters!")
    .trim()
    .isLength({ min: 4 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allProductsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category: req.params.id }, "title price").exec(),
  ]);

  if (category === null) {
    const err = new Error("category not found");
    err.status = 404;
    next(err);
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    products_in_category: allProductsInCategory,
  });
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allProductsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Product.find({ category: req.params.id }, "title price").exec(),
  ]);

  if (allProductsInCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      products_in_category: allProductsInCategory,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body.categoryId);
    res.redirect("/catalog/categories");
  }
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (category === null) {
    const err = new Error("category not found");
    err.status = 404;
    next(err);
  }

  res.render("category_form", {
    title: "Update Category",
    category: category,
  });
});

// Handle Category update on POST.
exports.category_update_post = [
  body("name", "name must be specified").trim().isLength({ min: 3 }).escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Category Update",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await Category.findByIdAndUpdate(req.params.id, category);
      res.redirect(category.url);
    }
  }),
];
