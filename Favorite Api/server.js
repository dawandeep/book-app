const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors');
const app = express();
const routes = require('./routes/FavBookRoute')
// const DB_URI = 'mongodb+srv://mflix:st8rlP53WjObuQTG@cluster0.v3uapxa.mongodb.net/test';
const DB_URI = process.env.MONGODB_SERVER;
mongoose.connect(DB_URI);
mongoose.connection.once('open', (err) => {
    if (!err) {
        console.log('Connected to MongoDB');
    }
});
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json());
app.use('/api/v1',routes)
const port = process.env.PORT || 8001
app.listen(port, () => {
    console.log(`Server is running at port ${port} `);
});