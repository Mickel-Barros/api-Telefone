import express from 'express';

import enviar from './routes/enviar';


const app = express();
app.use(express.json());
app.use('/api', enviar);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\Program Files\Google\Chrome\Application', // ou Edge
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');
  console.log(await page.title());

  await browser.close();
})();