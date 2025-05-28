import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Client, LocalAuth } from 'whatsapp-web.js';
import Qrcode from 'qrcode';
import cors from 'cors';
import enviar from './routes/enviar';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

export default io;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use('/api', enviar);

// Porta
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// WhatsApp Client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

// Espera a inicialização do cliente
async function initializeClient() {
  try {
    await client.initialize(); // Inicializa de forma assíncrona
    console.log('WhatsApp pronto!');
    io.emit('ready');
  } catch (err) {
    console.error('Erro ao inicializar cliente:', err);
  }
}

// Eventos do WhatsApp
client.on('authenticated', () => {
  console.log('Autenticado com sucesso!');
  io.emit('authenticated');
});

client.on('auth_failure', () => {
  console.log('Falha na autenticação');
  io.emit('auth_failure');
});

client.on('disconnected', (reason) => {
  console.log('Cliente desconectado:', reason);
  io.emit('disconnected');
  
  // Tentar reiniciar o cliente
  setTimeout(() => {
    console.log('Reinicializando cliente...');
    client.destroy()
      .then(() => initializeClient())  // Reinitialize when disconnected
      .catch(err => console.error('Erro ao destruir o cliente:', err));
  }, 3000);
});

client.on('qr', (qr) => {
  console.log('QR recebido');
  
  Qrcode.toDataURL(qr, (err, url) => {
    if (err) {
      console.error('Erro ao gerar QR Code:', err);
      return;
    }
    io.emit('qr', url); // Envia QR Code para todos conectados
  });
});

// Inicializa o cliente
initializeClient();

// Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado ao socket');
  
});