require('dotenv').config();

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('QR Code gerado, escaneie com o WhatsApp!');
});

client.on('ready', () => {
  console.log('✅ Juninho Bot está online no WhatsApp!');
});

client.on('message', async msg => {
  try {
    const chat = await msg.getChat();
    const botId = client.info?.wid?._serialized;

    if (chat.isGroup) {
      // Se não mencionou o bot, não responde
      if (!msg.mentionedIds || !msg.mentionedIds.includes(botId)) {
        return;
      }
    }

    const body = msg.body?.toLowerCase() || '';

    if (body === '/juninho') {
      await msg.reply('Olá! Sou o Juninho Bot 🤖\nComo posso ajudar você com programação hoje?');
      return;
    }

    if (body.startsWith('!google ')) {
      const query = msg.body.slice(8);
      const results = await googleSearch(query);
      if (results.length === 0) {
        await msg.reply('Nenhum resultado encontrado no Google.');
      } else {
        const response = results.slice(0, 3).map((r, i) => `${i + 1}. ${r.title}\n${r.link}`).join('\n\n');
        await msg.reply(response);
      }
      return;
    }

    if (body.startsWith('!stackoverflow ')) {
      const query = msg.body.slice(14);
      const results = await stackOverflowSearch(query);
      if (results.length === 0) {
        await msg.reply('Nenhuma resposta encontrada no Stack Overflow.');
      } else {
        const response = results.slice(0, 3).map((r, i) => `${i + 1}. ${r.title}\n${r.link}`).join('\n\n');
        await msg.reply(response);
      }
      return;
    }

  } catch (error) {
    console.error('Erro no processamento da mensagem:', error);
  }
});

async function googleSearch(query) {
  try {
    const res = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: process.env.API_GOOGLE_KEY,
        cx: process.env.SEARCH_ENGINE_ID,
        q: query
      }
    });
    if (!res.data.items) return [];
    return res.data.items.map(item => ({
      title: item.title,
      link: item.link
    }));
  } catch (error) {
    console.error('Erro no Google Search:', error.message);
    return [];
  }
}

async function stackOverflowSearch(query) {
  try {
    const res = await axios.get('https://api.stackexchange.com/2.3/search/advanced', {
      params: {
        order: 'desc',
        sort: 'relevance',
        q: query,
        site: 'stackoverflow',
        key: process.env.STACK_EXCHANGE_KEY
      }
    });
    if (!res.data.items) return [];
    return res.data.items.map(item => ({
      title: item.title,
      link: item.link
    }));
  } catch (error) {
    console.error('Erro no Stack Overflow Search:', error.message);
    return [];
  }
}

client.initialize();
