const express = require('express');
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const bookRoutes = require('./routes/bookRoutes')
const app = express();
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/api/v1',bookRoutes)

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})