const express = require("express");

const router = express.Router();

const {
    addToCart,
    removeFromCart,
    getCart,
} = require("../controllers/cartController");

// ADD PRODUCT TO CART
router.post("/add", addToCart);

// REMOVE PRODUCT FROM CART
router.post("/remove", removeFromCart);

// GET USER CART
router.get("/:userId", getCart);

module.exports = router;