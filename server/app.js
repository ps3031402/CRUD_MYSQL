const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mysql = require('mysql2');

require('./db/conn');
const userRouter = require('./Routes/userRouters');
const bookRouter = require('./Routes/bookRouters');
const cartRouter = require('./Routes/cartRouters');


const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(bookRouter);
app.use(cartRouter);


app.get('/', (req, res) => {
    res.send("server starterd");
});


app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));