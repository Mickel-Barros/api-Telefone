import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  console.log('Escaneie este QR Code para logar no WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Web conectado!');
});

client.initialize();

export const sendWhatsAppMessage = async (phone: string, message: string) => {
  const formattedPhone = phone.replace(/\D/g, '') + '@c.us';
  await client.sendMessage(formattedPhone, message);
};
