const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiErrorHandler = require('./errors/api-error-handler');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/excercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.use(apiErrorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});