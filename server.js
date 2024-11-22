const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const exerciseRoutes = require("./routers/exerciseRouter");
const errorHandler = require('./middleware/errorHandler');

app.use("/exercise/", exerciseRoutes);
app.use(errorHandler);

app.listen(4000, () => console.log("Server running at port 4000")); 

