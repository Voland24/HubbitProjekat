const mongoose = require("mongoose");

const conversations_model = new mongoose.Schema(
  {
    backgroundImage: { type: String }, //username je ovo
    bubbleColour: { type: String }, //takodje username, neverovatno
    conversationId : {type: String}
  }
);

module.exports = mongoose.model("conversation_settings", conversations_model);
