const router = require("express").Router();
const UserRelationship = require("../models/users_relationships_views_model");
const ConversationModel = require("../models/conversations_model");
const UserVistiProfileModel = require("../models/users_visit_profile_view_model");
const ConversationSettings = require("../models/conversation_settings_model");

router.get("/specificUser", async (req, res) => {
  var user = UserRelationship.findOne({ username: req.query.username }).exec();
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(500).send("Unable to get user");
  }
});

router.get("/getContactsForSpecificUser", (req, res) => {
  UserRelationship.findOne({ username: req.query.username }, (err, result) => {
    if (err) {
      res.status(500).send("Cannot get contacts for given user");
    } else {
      res.status(200).send(result.listContacts);
    }
  });
});
//OVU RUTU I ZA CHAT BLOCK KORISTIMO
router.get("/getAllBlockedUsersForSpecificUser", (req, res) => {
  UserRelationship.findOne({ username: req.query.username }, (err, result) => {
    if (!err) {
      res.status(200).send(result.listBlocked);
    } else {
      res.status(500).send("Not working list for blocked users");
    }
  });
});

// {username, profilePic}
router.post("/createNewUser", (req, res) => {
  UserRelationship.create(req.body, (err, result) => {
    if (err) {
      res.status(500).send("Unable to create user " + err);
    } else {
      res.status(200).send(result);
    }
  });
});

function AddToContactsList(firstUser, secondUser) {
  UserVistiProfileModel.find(
    { username: { $in: [firstUser, secondUser] } },
    (err, resultNiz) => {
      UserRelationship.updateOne(
        { username: resultNiz[0].username },
        {
          $push: {
            listContacts: {
              username: resultNiz[1].username,
              profilePic: resultNiz[1].profilePic,
            },
          },
        },
        (err, result) => {
          if (!err) {
            UserRelationship.updateOne(
              { username: resultNiz[1].username },
              {
                $push: {
                  listContacts: {
                    username: resultNiz[0].username,
                    profilePic: resultNiz[0].profilePic,
                  },
                },
              },
              (err, result) => {
                if (!err) {
                  return;
                } else {
                  res.status(500).send("Second user failed");
                }
              }
            );
          } else {
            res.status(500).send("first user failed");
          }
        }
      );
    }
  );
}

function createNewConvo(userWhoSwipped, recommendedUser, res) {
  const smallerUser =
    userWhoSwipped < recommendedUser ? userWhoSwipped : recommendedUser;
  const biggerUser =
    userWhoSwipped > recommendedUser ? userWhoSwipped : recommendedUser;

  ConversationModel.create(
    { member1: smallerUser, member2: biggerUser },
    (err, result) => {
      if (err) {
        res.status(500).send("Error with new convo " + err);
      } else {
        ConversationSettings.create(
          {
            conversationId: result._id,
            bubbleColour: "#3375f0",
            backgroundImage: "default",
          },
          (err, result) => {
            if (!err) {
              res.status(200).send("New convo added");
            } else {
              res.status(500).send("Couldnt create new settings for convo");
            }
          }
        );
      }
    }
  );
}
router.put("/swipeRight", (req, res) => {
  const userWhoSwipped = req.body.userWhoSwipped;
  const recommendedUser = req.body.recommendedUser;

  UserRelationship.updateOne(
    { username: userWhoSwipped },
    { $push: { listRightSwipes: { username: recommendedUser } } },
    (err, result) => {
      if (!err) {
        UserRelationship.find(
          {
            $and: [
              { username: recommendedUser },
              { listRightSwipes: { $eq: { username: userWhoSwipped } } },
            ],
          },
          (err, result) => {
            if (result.length > 0) {
              AddToContactsList(userWhoSwipped, recommendedUser);
              createNewConvo(userWhoSwipped, recommendedUser, res);
            } else {
              res.status(200).send("First right swipe");
            }
          }
        );
      } else {
        res.status(500).send("Error with right swipes");
      }
    }
  );
});

router.put("/swipeLeft", (req, res) => {
  const userWhoSwipped = req.body.userWhoSwipped;
  const recommendedUser = req.body.recommendedUser;

  UserRelationship.updateOne(
    { username: userWhoSwipped },
    { $push: { listLeftSwipes: { username: recommendedUser } } },
    (err, result) => {
      if (!err) {
        res.status(200).send("Success added to left swipes");
      } else {
        res.status(500).send("Error with left swipes");
      }
    }
  );
});

router.put("/blockUser", (req, res) => {
  const userWhoBlocked = req.body.userWhoBlocked;
  const blockedUser = req.body.blockedUser;

  UserRelationship.updateOne(
    { username: userWhoBlocked },
    { $push: { listBlocked: { username: blockedUser } } },
    (err, result) => {
      if (!err) {
        res.status(200).send("successfully blocked");
      } else {
        res.status(500).send("blocking failed");
      }
    }
  );
});

router.put("/unblockUser", (req, res) => {
  const userWhoUnblocked = req.body.userWhoUnblocked;
  const unblockedUser = req.body.unblockedUser;

  UserRelationship.updateOne(
    { username: userWhoUnblocked },
    { $pull: { listBlocked: { username: unblockedUser } } },
    { safe: true, multi: false },
    (err, result) => {
      if (!err) {
        res.status(200).send("successfully unblocked");
      } else {
        res.status(500).send("unblocking failed");
      }
    }
  );
});

router.delete("/deleteUser", (req, res) => {
  UserRelationship.deleteOne(
    { username: req.query.username },
    (err, result) => {
      if (err) {
        res.status(500).send("Unable to delete user " + err);
      } else {
        res.status(200).send("Delete successful");
      }
    }
  );
});

module.exports = router;
