const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");



// CONFIGURE DOTENV

dotenv.config();



// CONNECT DATABASE

connectDB();



// CREATE APP

const app = express();



// MIDDLEWARE

app.use(cors());

app.use(express.json());



// ROUTES

app.use("/", require("./routes/authRoutes"));

app.get("/", (req,resp)=> {
    resp.send("Server is running");
})


// PORT

const PORT = process.env.PORT || 3200;



// SERVER START

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});