const express = require("express");
const router = express.Router();
const {
    getRol,
    getRols,
    createRol,
    updateRol,
    deleteRol,
} = require("../controllers/rol.controller");
const auth = require("../middlewares/authMiddleware");

router
    .get("/getRol/:id",auth, getRol)
    .get("/getRols",auth, getRols)
    .post("/createRol", auth, createRol)
    .put("/updateRol", auth, updateRol)
    .delete("/deleteRol", auth, deleteRol);

module.exports = router;
