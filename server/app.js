import express from 'express';
import multer from 'multer';
import axios from 'axios';
import OpenAI from 'openai';

import * as dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors({
  origin: `http://localhost:${port}`,
  credentials: true
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  const imagePath = req.file?.path;
  // 이미지 분석 로직 (예: OCR, 이미지 설명 등)을 여기에 추가
  // 예: Google Vision API, Tesseract.js 등을 사용할 수 있음

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: imageAnalysisResult }],
    });

    res.json(completion.data.choices[0].message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});