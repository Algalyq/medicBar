import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '7851117387:AAHsco4XeAFHIX5KReSqTRkBJSeLV4FTpxo';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// In-memory storage for group chat IDs (replace with a database in production)
let groupChatIds = new Set();

const telegramService = {
  // Fetch group chat IDs using getUpdates
  updateGroupChatIds: async () => {
    try {
      const response = await axios.get(`${TELEGRAM_API_URL}/getUpdates`);
      const updates = response.data.result;
      
      // Filter updates to find group chats
      updates.forEach((update) => {
        const chat = update?.message?.chat || update?.my_chat_member?.chat;
        if (chat && (chat.type === 'group' || chat.type === 'supergroup')) {
          groupChatIds.add(chat.id.toString());
        }
      });

      console.log('Updated group chat IDs:', Array.from(groupChatIds));
      return Array.from(groupChatIds);
    } catch (error) {
      console.error('Failed to fetch group chat IDs:', error.response?.data || error.message);
      throw error;
    }
  },

  // Send order message to all groups
  sendOrder: async (orderData) => {
    const { name, phone, language, service } = orderData;
    const message = `Жаңа заказ:\nИмя: ${name}\nТелефон: ${phone}\nТаңдаған тіл: ${language}\nҚызмет: ${service}`;

    // Ensure group chat IDs are up to date
    await telegramService.updateGroupChatIds();

    if (groupChatIds.size === 0) {
      console.warn('No groups found to send the message.');
      return;
    }

    // Send message to each group
    const sendPromises = Array.from(groupChatIds).map(async (chatId) => {
      try {
        const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
          chat_id: chatId,
          text: message,
        });
        console.log(`Message sent to group ${chatId}:`, response.data);
        return { chatId, status: 'success' };
      } catch (error) {
        console.error(`Failed to send message to group ${chatId}:`, error.response?.data || error.message);
        return { chatId, status: 'failed', error: error.response?.data || error.message };
      }
    });

    // Wait for all messages to be sent
    const results = await Promise.all(sendPromises);
    return results;
  },
};

export default telegramService;