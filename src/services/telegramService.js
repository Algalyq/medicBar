import axios from 'axios';

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';
const telegramService = {
  sendOrder: async (orderData) => {
    const { name, phone, language, service } = orderData;
    const message = `New Order:\nName: ${name}\nPhone: ${phone}\nLanguage: ${language}\nService: ${service}`;

    try {
      await fetch('YOUR_TELEGRAM_BOT_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: 'YOUR_CHAT_ID',
          text: message,
        }),
      });
    } catch (error) {
      console.error('Failed to send order to Telegram:', error);
    }
  },
};

export default telegramService;