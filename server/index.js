import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hello from Dall-e!');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(3000, () => console.log('Server is running on port http://localhost:3000'))
    } catch (err) {
        console.log(err);
    }
}

startServer();