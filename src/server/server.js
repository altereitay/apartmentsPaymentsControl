const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const {connectToMongo} = require('../server/utils/mongodb')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(express.json());
connectToMongo();

app.get('/', (req, res)=>{
    res.send('HARA');
})

app.use('/user', require('../server/routes/user'));

app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
})