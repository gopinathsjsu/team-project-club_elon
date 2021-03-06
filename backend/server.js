const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiErrorHandler = require("./errors/api-error-handler");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const hotelsRouter = require("./routes/hotels");
const usersRouter = require("./routes/users");
const bookingRouter = require("./routes/booking");
const amenitiesRouter = require("./routes/amenities");
const adminRouter = require("./routes/admin");
const roomRouter = require("./routes/room");

app.use("/hotels", hotelsRouter);
app.use("/users", usersRouter);
app.use("/booking", bookingRouter);
app.use("/amenities", amenitiesRouter);
app.use("/admin", adminRouter);
app.use("/room", roomRouter);

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
