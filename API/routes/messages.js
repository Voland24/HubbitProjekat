const router = require("express").Router();
const MessageModel = require("../models/messages_model");

//conversationId
//sender
//text
//all of this goes in req.body as is
router.post("/createNewMessage", (req, res) => {
  MessageModel.create(req.body, (err, result) => {
    if (err) {
      res.status(500).send("Message create failed " + err);
    } else {
      res.status(200).send(result);
    }
  });
});

//get message by convo
router.get("/getMessagesByConversation", async (req, res) => {
  MessageModel.find(
    {
      conversationId: req.query.conversationId,
    },
    (err, result) => {
      if (!err) res.status(200).send(result);
      else res.status(500).send("Unable to get messages for convo");
    }
  );
});

router.get("/findSpecificMessage", async (req, res) => {
  MessageModel.find(
    {
      $and: [
        { conversationId: req.query.conversationId },
        { text: { $regex: req.query.pattern } },
      ],
    },
    (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(500).send({ msg: "error with message find" });
      }
    }
  );
});
module.exports = router;
