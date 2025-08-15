module.exports = {
  config: {
    name: "angryunsend",
    version: "1.0",
    author: "YourName",
    countDown: 0,
    role: 0,
    shortDescription: "Send message and unsend if angry reacted",
    category: "fun",
  },

  onStart: async function ({ api, event }) {
    // Bot message send kore and save handleReaction data
    const sent = await api.sendMessage("React with 😡 to delete this message", event.threadID);

    // Save to handleReaction so handlerReaction.js detect korbe
    global.client.handleReaction.push({
      name: this.config.name,
      messageID: sent.messageID
    });
  },

  handleReaction: async function ({ api, event, handleReaction }) {
    if (event.reaction === "😡") {
      try {
        await api.unsendMessage(handleReaction.messageID);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
