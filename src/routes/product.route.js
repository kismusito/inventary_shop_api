const express = require("express");
const router = express.Router();
const {
    readProduct,
    readProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");
const auth = require("../middlewares/authMiddleware");

router
    .get("/readProduct/:id", readProduct)
    .get("/readProducts", readProducts)
    .post("/createProduct", auth, createProduct)
    .put("/updateProduct", auth, updateProduct)
    .delete("/deleteProduct", auth, deleteProduct);

module.exports = router;
