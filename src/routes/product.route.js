const express = require("express");
const router = express.Router();
const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductPoster,
    updateProductGallery,
    deleteProductGalleryPhoto,
} = require("../controllers/product.controller");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router
    .get("/getProduct/:id", getProduct)
    .get("/getProducts", getProducts)
    .post(
        "/createProduct",
        auth,
        upload("products").fields([
            { name: "poster", maxCount: 1 },
            { name: "gallery", maxCount: 5 },
        ]),
        createProduct
    )
    .put("/updateProduct", auth, updateProduct)
    .delete("/deleteProduct", auth, deleteProduct)
    .put(
        "/updateProductPoster",
        auth,
        upload("products").single("poster"),
        updateProductPoster
    )
    .put(
        "/updateProductGallery",
        auth,
        upload("products").array("gallery", 5),
        updateProductGallery
    )
    .delete("/deleteProductGalleryPhoto", auth, deleteProductGalleryPhoto);

module.exports = router;
