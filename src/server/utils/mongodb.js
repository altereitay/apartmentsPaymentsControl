const mongoose = require('mongoose');
const URL = require('../config.json').mongoURL

async function connectToMongo(){
    try{
        await mongoose.connect(URL, {useNewUrlParser: true});
        console.log('connected to mongodb');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = {connectToMongo};