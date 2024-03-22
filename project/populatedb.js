#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);
require("dotenv").config();
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Product = require("./models/product");
const ProductInstance = require("./models/productInstance");
const Category = require("./models/category");

const products = [];
const categories = [];
const productInstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createProducts();
  await createProductInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function productCreate(index, title, price, description, category) {
  const productDetail = {
    title: title,
    price: price,
    description: description,
  };

  if (category !== false) {
    productDetail.category = category;
  }

  const product = await new Product(productDetail);
  await product.save();
  products[index] = product;
  console.log(`added product ${product}`);
}

async function productInstanceCreate(index, product, status, in_stock) {
  const productInstanceDetail = {
    product: product,
  };
  if (status !== false) {
    productInstanceDetail.status = status;
  }
  if (in_stock !== false) {
    productInstanceDetail.in_stock = in_stock;
  }
  const productInstance = new ProductInstance(productInstanceDetail);
  await productInstance.save();
  productInstances[index] = productInstance;
  console.log(`added productInstance`);
}

async function createCategories() {
  console.log("adding categories");
  await Promise.all([
    categoryCreate(0, "Shoes"),
    categoryCreate(1, "Jackets"),
    categoryCreate(2, "Pants"),
  ]);
}

async function createProducts() {
  console.log("adding products!");
  await Promise.all([
    productCreate(0, "Running shoes", 100, "Great for jogging", [
      categories[0],
    ]),
    productCreate(1, "Basketball shoes", 230, "Great basketball shoes", [
      categories[0],
    ]),
    productCreate(2, "Tennis shoes", 154, "Great for tennis", [categories[0]]),
    productCreate(
      3,
      "Winter puffer jacket",
      250,
      "Great puffer for low temperatures",
      [categories[1]]
    ),
    productCreate(4, "Windbreaker", 120, "Great windreaker for sports", [
      categories[1],
    ]),
    productCreate(5, "blue jeans", 90, "classic blue jeans", [categories[2]]),
    productCreate(
      6,
      "black trousers",
      180,
      "classic trousers of good quality",
      [categories[2]]
    ),
    productCreate(7, "sweatpants", 30, "great for sports", [categories[2]]),
  ]);
}

async function createProductInstances() {
  await Promise.all([
    productInstanceCreate(0, products[0], "Available", false),
    productInstanceCreate(1, products[1], "Repairing", false),
    productInstanceCreate(2, products[2], "Out Of Stock", false),
    productInstanceCreate(3, products[3], "Available", false),
    productInstanceCreate(4, products[3], "Available", false),
    productInstanceCreate(4, products[3], "Available", false),
    productInstanceCreate(5, products[0], "Available", false),
    productInstanceCreate(6, products[6], "Repairing", false),
    productInstanceCreate(7, products[0], false, false),
    productInstanceCreate(8, products[2], false, false),
  ]);
}
