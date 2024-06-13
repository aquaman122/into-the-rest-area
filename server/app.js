import express from 'express';
import multer from 'multer';
import axios from 'axios';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  const imagePath = req.file?.path;
  if (!imagePath) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // 여기에 이미지 분석 로직 추가
    // 예를 들어 OCR, 이미지 설명 등
    const imageAnalysisResult = "이미지 분석 결과";

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: imageAnalysisResult }],
    });
    console.log('Completion:', JSON.stringify(completion, null, 2));
    if (completion.data && completion.data.choices && completion.data.choices.length > 0) {
      res.json({ content: completion.data.choices[0].message.content });
    } else {
      throw new Error('Failed to get completion');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Failed to delete uploaded file:', err);
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});