const router = require("express").Router();
const { runInContext } = require("vm");
const UserSearch = require("../models/users_search_views_model");

router.get("/getSpecificUser", async (req, res) => {
  if (req.query.searchMode == "u") {
    UserSearch.find({ username: req.query.username }, (err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(500).send("unable to get by username");
      }
    });
  } else {
    if (req.query.searchMode == "l") {
      UserSearch.find({ location: req.query.location }, (err, result) => {
        if (!err) {
          res.status(200).send(result);
        } else {
          res.status(500).send("unable to get by location");
        }
      });
    } else {
      UserSearch.find({ fullName: req.query.fullName }, (err, result) => {
        if (!err) {
          res.status(200).send(result);
        } else {
          res.status(500).send("unable to get by fullName");
        }
      }).collation({
        locale: "en",
        strength: 2,
      });
    }
  }
});

router.post("/createNewSearchUser", (req, res) => {
  UserSearch.create(req.body, (err, result) => {
    if (err) {
      res.status(500).send("Unable to create new search user " + err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete("/deleteSearchUser", (req, res) => {
  UserSearch.deleteOne({ username: req.query.username }, (err, result) => {
    if (err) {
      res.status(500).send("Unable to delete search user " + err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
