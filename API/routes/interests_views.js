const router = require("express").Router();
const Interests = require("../models/interests_model");

router.get("/", async (req, res) => {
  Interests.find({}, (err, result) => {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(500).send("Unable to get interests");
    }
  });
});

router.post("/createNewInterest", (req, res) => {
  Interests.create(req.body, (err, result) => {
    if (err) {
      res.status(500).send("Unable to create new interest " + err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete("/deleteInterest", (req, res) => {
  Interests.deleteOne({ category: req.query.category }, (err, result) => {
    if (err) {
      res.status(500).send("Unable to delete interest " + err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
