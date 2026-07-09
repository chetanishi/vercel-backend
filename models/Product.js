const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: ["men", "women", "kid"]
        },

        image: {
            type: String,
            required: true
        },

        new_price: {
            type: Number,
            required: true
        },

        old_price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;