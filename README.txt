API simplificada para envio de mensagens WhatsApp via whatsapp-web.js (gratuito)

Instalação:
1. npm install
2. npm run dev
3. Escaneie o QR Code que aparecer no terminal

Exemplo de requisição:
POST /api/enviar
{
  "telefones": ["5531999999999", "5531888888888"],
  "mensagem": "Olá, tudo bem?"
}
