const productMethod = {};
const acc = require('../middlewares/accessControl');

function getProduct(_id) {}

productMethod.readProducts = async (req, res) => {};

productMethod.readProduct = async (req, res) => {};

productMethod.createProduct = async (req, res) => {
    console.log(acc)
    console.log(req.user)
    console.log(rols.ADMIN)
};

productMethod.updateProduct = async (req, res) => {};

productMethod.deleteProduct = async (req, res) => {};

module.exports = productMethod;
