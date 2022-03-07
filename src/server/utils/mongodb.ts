import mongoose from "mongoose";
const URL: string = require('../config.json').mongoURL;

export const connectToMongo = async () => {
    try {
        await mongoose.connect(URL);
        console.log('connected to mongodb');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
