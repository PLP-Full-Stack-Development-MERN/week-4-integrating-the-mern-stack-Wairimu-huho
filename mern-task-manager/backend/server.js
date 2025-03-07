require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//connecting the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));

//importing tasks api
const taskRoutes = require("./routes/tasks");

app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
