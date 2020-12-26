const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        enum: rols,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = model("Rol", productSchema);
