const express = require("express");
const crypto = require("crypto");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoutes");
const cors= require("cors")
dotenv.config();
const app = express();
app.use(express.json());
dbConnect();

app.use(cors({
  origin : "*"
}))
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.get("/", (req, res)=>{
  res.json({message: "Server is live"})
})
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
