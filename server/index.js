import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dall_eRoutes from './routes/dalle_eRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dall_eRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Dall-e!');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(3000, () => console.log('Server is running on port http://localhost:3000'))
    } catch (err) {
        console.error(err);
    }
}

startServer();