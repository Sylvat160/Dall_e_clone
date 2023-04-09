import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get(async (req, res) => {
    res.send('Hello from Dall-e Nueve!');
});

router.route('/generate').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })
        const image = response.data.data[0].b64_json;
        res.status(200).json({ photo : image });
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.response.data.error.message);
    }
}); 

export default router;