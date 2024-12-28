const express = require("express");
const account = require("../controllers/account.controller");
const product = require("../controllers/product.controller");
const checkout = require("../controllers/checkout.controller");

const router = express.Router();

// Rutas de autenticación y usuarios
router.post("/register", account.registerUser);
router.post("/login", account.validateLogin);
router.get("/users", account.listUsers);
router.get("/users/:id", account.getUserProfile);
router.patch("/users/:id", account.updateUser);
router.delete("/users/:id", account.deleteUser);

// Rutas de productos
const productBasePath = "/products";
router.post(productBasePath, product.addProduct);
router.get(productBasePath, product.getProduct);
router.patch(`${productBasePath}/:id`, product.updateProduct);
router.delete(`${productBasePath}/:id`, product.deleteProduct);
router.get(`${productBasePath}/:id`, product.getProductById);

// Rutas de checkout
router.post("/checkout", checkout.createCheckout);

module.exports = router;
