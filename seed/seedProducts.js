const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("../models/Product");

dotenv.config();

const products = [];

for (let id = 1; id <= 36; id++) {
    let name;
    let category;

    if (id >= 1 && id <= 12) {
        name =
            "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse";
        category = "women";
    } else if (id >= 13 && id <= 24) {
        name =
            "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket";
        category = "men";
    } else {
        name =
            "Boys Orange Colourblocked Hooded Sweatshirt";
        category = "kid";
    }

    products.push({
        id: id,
        name: name,
        category: category,
        image: `/uploads/products/product_${id}.png`,
        new_price: id === 1 ? 50 : id === 3 ? 60 : id === 4 ? 100 : 85,
        old_price: id === 1 ? 80.5 : id === 3 ? 100.5 : id === 4 ? 150 : 120.5
    });
}

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // await Product.deleteMany();

        // console.log("Old products deleted");

        await Product.insertMany(products);

        console.log("36 products seeded successfully");

        process.exit(0);

    } catch (error) {
        console.log(error.message);

        process.exit(1);
    }
};

seedProducts();