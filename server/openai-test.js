import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "구구단 javascript로 만들어 줘" }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
  } catch (error) {
    console.error(error);
  }
}

main();
