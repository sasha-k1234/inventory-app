const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const product_instance_controller = require("../controllers/productinstanceController");
const product_controller = require("../controllers/product_Controller");
// PRODUCT ROUTES //
router.get("/", product_controller.index);

router.get("/product/create", product_controller.product_create_get);

router.post("/product/crete", product_controller.product_create_post);

router.get("/product/:id/delete", product_controller.product_delete_get);

router.post("/product/:id/delete", product_controller.product_delete_post);

router.get("/product/:id/update", product_controller.product_update_get);

router.post("/product/:id/update", product_controller.product_update_post);

router.get("/product/:id", product_controller.product_detail);

router.get("/products", product_controller.products_list);

// PRODUCT_INSTANCE ROUTES //
router.get(
  "/productinstance/create",
  product_instance_controller.productinstance_create_get
);

router.post(
  "/productinstance/create",
  product_instance_controller.productinstance_create_post
);

router.get(
  "/productinstance/:id/delete",
  product_instance_controller.productinstance_delete_get
);

router.post(
  "/productinstance/:id/delete",
  product_instance_controller.productinstance_delete_post
);

router.get(
  "/productinstance/:id/update",
  product_instance_controller.productinstance_update_get
);

router.post(
  "/productinstance/:id/update",
  product_instance_controller.productinstance_update_post
);

router.get(
  "/productinstance/:id",
  product_instance_controller.productinstance_detail
);

router.get(
  "/productinstances",
  product_instance_controller.productinstance_list
);

// CATEGORY ROUTES //

router.get("/category/create", category_controller.category_create_get);

router.post("/category/create", category_controller.category_create_post);

router.get("/category/:id/delete", category_controller.category_delete_get);

router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/category/:id/update", category_controller.category_update_get);

router.post("/category/:id/update", category_controller.category_update_post);

router.get("/category/:id", category_controller.category_detail);

router.get("/categories", category_controller.category_list);

module.exports = router;
