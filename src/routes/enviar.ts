import { Router } from 'express';
import { sendWhatsAppMessage } from '../services/whatsappWebService';
import ultimoQr from '../services/whatsappWebService';

const router = Router();

router.post('/enviar', async (req, res) => {
  const { telefones, mensagem } = req.body;

  const lista = Array.isArray(telefones) ? telefones : [telefones];

  try {
    for (const telefone of lista) {
      await sendWhatsAppMessage(telefone, mensagem);
    }

    res.json({ status: 'Mensagens enviadas com sucesso', total: lista.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar mensagens' });
  }
});

router.get('/qr', (req, res) => {
  if (ultimoQr) {
    res.json({ qr: ultimoQr });
  } else {
    res.status(404).json({ error: 'QR Code ainda não gerado' });
  }
});

export default router;
