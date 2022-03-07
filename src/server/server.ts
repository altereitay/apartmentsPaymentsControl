import express, {Application} from 'express';
const app:Application = express();
const port: number = process.env.PORT? parseInt(process.env.PORT) : 5000;
import {connectToMongo} from "./utils/mongodb";
import user from './routes/user'


app.use(express.json());
connectToMongo();

app.use('/user', user);

app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
})
