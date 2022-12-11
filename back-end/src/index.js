import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();
app.use(bodyParser.json({license: '50mb'}));
app.use(cors());
const port = process.env.PORT || 30002;

app.get('/', (req, res) => {
    console.log("hehe")
})


app.listen(port, (req, res, next) => {
    console.log("server successfully")
})

