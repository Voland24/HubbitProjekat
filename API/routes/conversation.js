const router = require("express").Router();
const ConversationModel = require("../models/conversations_model");
const UserVisitsProfileModel = require("../models/users_visit_profile_view_model");

router.post("/createNewConversation", (req, res) => {
  var smallerIdUser;
  var biggerIdUser;
  if (req.body.member1 > req.body.member2) {
    smallerIdUser = req.body.member2;
    biggerIdUser = req.body.member1;
  } else {
    smallerIdUser = req.body.member1;
    biggerIdUser = req.body.member2;
  }
  ConversationModel.create(
    { member1: smallerIdUser, member2: biggerIdUser },
    (err, result) => {
      if (err) {
        res.status(500).send("Error with new convo " + err);
      } else {
        res.status(200).send(result);
      }
    }
  );
});

//get all user convos for one user
router.get("/getSpecificUserConvo", async (req, res) => {
  UserVisitsProfileModel.find(
    { username: req.query.username },
    (err, resultUser) => {
      if (!err) {
        ConversationModel.find(
          {
            $or: [
              { member1: resultUser[0]._id },
              { member2: resultUser[0]._id },
            ],
          },
          (err, result) => {
            if (!err)
              res.status(200).send({ result, userId: resultUser[0]._id });
            else res.status(500).send("Nece get convo");
          }
        );
      } else {
        res.status(500).send("Nece get convo");
      }
    }
  );
});

//get specific convo between 2 users
//DONT FORGET TO SORT THEM BEFORE GET REQUEST ON FRONTEND, member1 is lesser of two Ids
router.get("/getConvoForBothUsers", async (req, res) => {
  ConversationModel.find(
    {
      $and: [{ member1: req.query.member1 }, { member2: req.query.member2 }],
    },
    (err, result) => {
      if (!err) res.status(200).send(result);
      else res.status(500).send("Nece get convo");
    }
  );
});
module.exports = router;
