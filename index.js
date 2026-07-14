const express = require("express");

const cors = require("cors");

const path = require("path");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const cartRoute = require("./routes/cartRoute");

// CONFIGURE DOTENV

dotenv.config();



// CONNECT DATABASE

connectDB();



// CREATE APP

const app = express();



// MIDDLEWARE

const allowedOrigins = [
  "http://localhost:5173",
  "https://vercel-frontend-lovat-ten.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/uploads",express.static(path.join(__dirname, "uploads")));
 

// ROUTES


app.use("/api/cart", cartRoute);

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