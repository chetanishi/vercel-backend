const Cart = require("../models/cartModel");

// ADD TO CART
const addToCart = async (req, res) => {
    try {

        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {

            cart = new Cart({
                userId,
                items: [],
            });

        }

        const existingProduct = cart.items.find(
            (item) => item.productId === productId
        );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.items.push({
                productId,
                quantity: 1,
            });

        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};


// REMOVE FROM CART
const removeFromCart = async (req, res) => {

    try {

        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });

        }

        const product = cart.items.find(
            (item) => item.productId === productId
        );

        if (product) {

            product.quantity -= 1;

            if (product.quantity <= 0) {

                cart.items = cart.items.filter(
                    (item) => item.productId !== productId
                );

            }

        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed",
            cart,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};


// GET CART
const getCart = async (req, res) => {

    try {

        const { userId } = req.params;

        const cart = await Cart.findOne({ userId });

        res.status(200).json({
            success: true,
            cart,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
};