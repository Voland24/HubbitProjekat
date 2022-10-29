const router = require("express").Router();
const UsersAlgorithmView = require("../models/users_algorithm_views_model");
const UserRelationship = require("../models/users_relationships_views_model");
const UserRecommendation = require("../models/users_recommended_views_model");

router.get("/", async (req, res) => {
  try {
    allAlgoUsers = await UsersAlgorithmView.find({});
    res.status(200).send(allAlgoUsers);
  } catch (err) {
    res.status(500).send("Error algo users");
  }
});

router.post("/createNewAlgoUsers", (req, res) => {
  UsersAlgorithmView.create(req.body, (err, result) => {
    if (err) {
      res.status(500).send("user algo create failed " + err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete("/deleteAlgoUser", (req, res) => {
  UsersAlgorithmView.deleteOne(
    { username: req.query.username },
    (err, result) => {
      if (err) {
        res.status(500).send("Delete algo user failed " + err);
      } else {
        res.status(200).send("Delete successful");
      }
    }
  );
});

//abominacija ali radi (valjda?????) + fali error handling i sl
router.get("/getForUser", async (req, res) => {
  try {
    //Uzimaju se nizovi veza korisnika x (listContacts, listBlocked, listLeftSwipes, listRightSwipes)
    //Prolazi se kroz svaku, i svaki unikatan username se izdvaja u posebnu listu
    //Ovo nam je bitno jer NE ZELIMO da nam potencijalan partner y bude neki od tih usernameova
    UserRelationship.findOne(
      { username: req.query.username },
      (err, result) => {
        if (!err) {
          tmpList = [];

          tmpList.push(req.query.username);

          result.listContacts.forEach((y) => {
            if (!tmpList.includes(y.username)) tmpList.push(y.username);
          });

          result.listBlocked.forEach((y) => {
            if (!tmpList.includes(y.username)) tmpList.push(y.username);
          });

          result.listLeftSwipes.forEach((y) => {
            if (!tmpList.includes(y.username)) tmpList.push(y.username);
          });

          result.listRightSwipes.forEach((y) => {
            if (!tmpList.includes(y.username)) tmpList.push(y.username);
          });

          //uzimaju se karakteristike korisnika x
          UsersAlgorithmView.findOne(
            { username: req.query.username },
            (err, result) => {
              //Trazenje niza potencijalnih y-ova
              //1) { username: { $nin: tmpList } } - NE zelimo da y ima username nekih iz onih listi gore
              //2) { location: { $in: result.listPrefLoc }} - zelimo da lokacija od y bude neki iz liste gradova koje x preferira
              //3) { listPrefLoc: result.location } - zelimo da y preferira grad od korisnika x
              //4) { gender: { $in: result.listGenders }} - zelimo da pol od y bude u listi polova koje x preferira
              //5) { listGenders: result.gender } - zelimo da lista polova koje y preferira sadrzi pol korisnika x
              //6) { listInterests: { $nin: result.listTurnOffs } } - NE zelimo da y ima interesovanje koje je turn off korisniku x
              //7) { listTurnOffs: { $nin: result.listInterests } } - NE zelimo da lista turn off-ova korisnika y sadrzi interes korisnika x
              //8) { $or:
              //  a) [ { $and: [ { listInterests: { $in: result.listTurnOns } }, { listTurnOns: { $in: result.listInterests } } ] },
              //      zelimo da korisnik y ima interes(e) koji su turn on korisniku x
              //      I
              //      zelimo da korisnik y ima turn on(s) koji su interesovanj(e/a) korisnika x
              //ILI   //mozda AND? Mada stavila sam "or" da bi bilo kao last resort
              //  b) { $and: [ { listInterests: { $in: result.listInterests } } ] } ] }
              //      NOTE: mislila sam da ce da postoji vise uslova, zato postoji ovo $and ovde
              //      zelimo da, ako vec nemaju turn ons jedni drugih, da ako imaju zajednicke interese y bude preporuceno korisniku x
              UsersAlgorithmView.find(
                {
                  $and: [
                    { username: { $nin: tmpList } },
                    { location: { $in: result.listPrefLoc } },
                    { listPrefLoc: result.location },
                    { gender: { $in: result.listGenders } },
                    { listGenders: result.gender },
                    { listInterests: { $nin: result.listTurnOffs } },
                    { listTurnOffs: { $nin: result.listInterests } },
                    {
                      $or: [
                        {
                          $and: [
                            { listInterests: { $in: result.listTurnOns } },
                            { listTurnOns: { $in: result.listInterests } },
                          ],
                        },
                        {
                          $and: [
                            { listInterests: { $in: result.listInterests } },
                          ],
                        },
                      ],
                    },
                  ],
                },
                (err, potentialPartners) => {
                  usernameList = [];
                  potentialPartners?.forEach((y) =>
                    usernameList.push(y.username)
                  );
                  //traze se liste svih potencijalnih partnera. Zelimo da proverimo da oni mozda nisu blokirali/uradili left swipe na x
                  //Znam da bi ovo trebalo ranije da se uradi, ali ne mogu da znam ko su bez onog prethodnog (glomaznog) query-a
                  //1) { username: { $in: usernameList }} - ako je username jedan od ovih iz liste usernameova potencijalnih partnera
                  //2) { listBlocked: { $ne: req.query.username } } - ako lista blokiranih NE sadrzi username od x
                  //3) { listLeftSwipes: { $ne: req.query.username } } - ako y NIJE uradio left swipe na x
                  //      NOTE: u redu je ako je y uradio right swipe na x
                  //onda vrati username od y
                  UserRelationship.find(
                    {
                      $and: [
                        { username: { $in: usernameList } },
                        {
                          listBlocked: {
                            $ne: { username: req.query.username },
                          },
                        },
                        {
                          listLeftSwipes: {
                            $ne: { username: req.query.username },
                          },
                        },
                      ],
                    },
                    { username: 1, _id: 0 },
                    (err, result) => {
                      //console.log(result)

                      //rezultat query-a je lista objekata, tako da sam pretvorila u listu stringova (usernames)
                      usernameList = [];

                      result.forEach((y) => usernameList.push(y.username));

                      //u potentialPartners imam listu DOKUMENATA, ali neki od njihovih usernames NE POSTOJI
                      //u result poslednjeg query-a (mozda su blokirali x ili uradili left swipe).
                      //u result tj usernameList imam listu STRINGOVA (listu usernameova)
                      //Da ne bih ponovo radila find, samo hocu da dodam sva dokumenta koja mi trebaju u novi niz:
                      potentialPartners2 = [];

                      potentialPartners?.forEach((y) => {
                        if (usernameList.includes(y.username)) {
                          potentialPartners2.push(y);
                        }
                      });

                      //treba da se samo izvuce lista usernames odavde i da se
                      //oni fetchuju iz recommended kolekcije

                      if (potentialPartners2.length > 0) {
                        potentialPartners2 = potentialPartners2.map(
                          (m) => m.username
                        );
                        //res.status(200).send(potentialPartners2);
                        UserRecommendation.find(
                          { username: { $in: potentialPartners2 } },
                          (err, result) => {
                            if (!err) {
                              res.status(200).send(result);
                            } else {
                              res.status(500).send();
                            }
                          }
                        );
                      } else {
                        res.status(200).send();
                      }

                      //valjda nepotrebno - ovo je napisano pre nego sto sam ovo za interese obradila onim glomaznim queryem
                      /*//e)
                                potentialPartners2.forEach(
                                    y =>
                                    {
                                        y.listInterests.forEach(
                                            interest =>
                                            {
                                            }
                                        )
                                    }
                                )*/
                    }
                  );
                }
              );
            }
          );
        } else {
          res.status(500).send();
        }
      }
    );
    //allAlgoUsers = await UsersAlgorithmView.find({});
    //res.status(200).send(allAlgoUsers);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
