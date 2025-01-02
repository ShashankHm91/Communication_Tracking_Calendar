const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const database = require("./config/database");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4500;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ success: true, message: "Your server is up and running ..." });
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});
