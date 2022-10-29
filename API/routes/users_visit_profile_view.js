const router = require("express").Router();
const UserVisitsProfileModel = require("../models/users_visit_profile_view_model");
const UserRecommendedViews = require("../models/users_recommended_views_model");
const UsersAlgorithmView = require("../models/users_algorithm_views_model");
const UserSearch = require("../models/users_search_views_model");

router.get("/", async (req, res) => {
  try {
    allUsers = await UserVisitsProfileModel.find({});
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(500).send("Error with getUsers " + err);
  }
});

router.get("/searchByUsername", async (req, res) => {
  user = await UserVisitsProfileModel.findOne({
    username: req.query.username,
  }).exec();
  if (user != null) res.status(200).send(user);
  else res.status(500).send("Nece get username");
});

router.post("/createNewUserProfileView", (req, res) => {
  UserVisitsProfileModel.create(req.body, (err, newUser) => {
    if (err) {
      res.status(500).send("user creation failed " + err);
    } else {
      res.status(200).send(newUser);
    }
  });
});

router.put("/updateUserProfile", (req, res) => {
  try {
    attributeName = req.body.change;

    if (attributeName == "aboutMe" || attributeName == "gender") {
      UserVisitsProfileModel.updateOne(
        { username: req.body.username },
        { [attributeName]: req.body.attribute },
        (err, result) => {
          if (err)
            res
              .status(500)
              .send("user update failed - collection: visit_profile " + err);
          else {
            UserRecommendedViews.updateOne(
              { username: req.body.username },
              { [attributeName]: req.body.attribute },
              (err, result) => {
                if (err)
                  res
                    .status(500)
                    .send(
                      "user update failed - collection: recommended " + err
                    );
                else {
                  if (attributeName == "gender") {
                    UsersAlgorithmView.updateOne(
                      { username: req.body.username },
                      { [attributeName]: req.body.attribute },
                      (err, result) => {
                        if (err)
                          res
                            .status(500)
                            .send(
                              "user update failed - collection: algorithm " +
                                err
                            );
                        else {
                          UserSearch.updateOne(
                            { username: req.body.username },
                            { [attributeName]: req.body.attribute },
                            (err, result) => {
                              if (err)
                                res
                                  .status(500)
                                  .send(
                                    "user update failed - collection: search " +
                                      err
                                  );
                              else res.status(200).send(result);
                            }
                          );
                        }
                      }
                    );
                  } else res.status(200).send(result);
                }
              }
            );
          }
        }
      );
    }
  } catch (ex) {
    res.status(500).send("Error with updateUserProfile " + err);
  }
});

router.put("/updateUserInterests", (req, res) => {
  try {
    UserVisitsProfileModel.updateOne(
      { username: req.body.username },
      { listInterests: req.body.listInterests },
      (err, result) => {
        if (err)
          res
            .status(500)
            .send({ msg: "Petar ne voli stringove u statusima" + err });
        else {
          UsersAlgorithmView.updateOne(
            { username: req.body.username },
            { listInterests: req.body.listInterests },
            (err, result) => {
              if (err) res.status(500).send({ msg: "boo. a string" + err });
              else {
                res.status(200).send(result);
              }
            }
          );
        }
      }
    );
  } catch (ex) {
    res.status(500).send({ msg: "Error with updateUserProfile " + ex });
  }
});

router.delete("/deleteUser", (req, res) => {
  UserVisitsProfileModel.deleteOne(
    { username: req.query.username },
    (err, result) => {
      if (err) {
        res.status(500).send("Delete of user failed " + err);
      } else {
        res.status(200).send("Delete successful");
      }
    }
  );
});

module.exports = router;
