const mongoose = require("mongoose");

const conversations_model = new mongoose.Schema(
  {
    member1: { type: String }, //username je ovo
    member2: { type: String }, //takodje username, neverovatno
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversations", conversations_model);
