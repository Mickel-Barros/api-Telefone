import express from 'express';

import enviar from './routes/enviar';


const app = express();
app.use(express.json());
app.use('/api', enviar);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
