const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



// SIGNUP CONTROLLER

const signupUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }



        const hashedPassword = await bcrypt.hash(password, 10);



        // CREATE USER

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });



        res.status(201).json({
            success: true,
            message: "Signup Successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// LOGIN CONTROLLER

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;



        // CHECK USER EXISTS

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }



        // COMPARE PASSWORD

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }



        // CREATE TOKEN

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );



        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user
        });

    } 
   catch (error) {
    console.log("LOGIN ERROR =>", error);

    res.status(500).json({
        success: false,
        message: error.message
    });
}

};



module.exports = {
    signupUser,
    loginUser
};