const express = require("express");

const cors = require("cors");

const path = require("path");

const dotenv = require("dotenv");

const connectDB = require("./config/db");



// CONFIGURE DOTENV

dotenv.config();



// CONNECT DATABASE

connectDB();



// CREATE APP

const app = express();



// MIDDLEWARE

app.use(
  cors({
    origin: "https://vercel-frontend-lovat-ten.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads")));

app.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "POST route working"
  });
});

app.get("/debug", (req, res) => {
  res.json({
    mongoUriExists: !!process.env.MONGO_URI,
    jwtSecretExists: !!process.env.JWT_SECRET,
  });
});

app.post("/check", (req, res) => {
  res.json({
    success: true,
    message: "POST working"
  });
});


// ROUTES

app.use("/", require("./routes/authRoutes"));

app.use("/api/products", require("./routes/productRoutes"));

app.get("/", (req,resp)=> {
    resp.send("Server is running");
})


// PORT

const PORT = process.env.PORT || 3200;



// SERVER START

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});