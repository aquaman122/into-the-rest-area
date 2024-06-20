import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
}));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
