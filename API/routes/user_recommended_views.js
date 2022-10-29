const router = require("express").Router();
const e = require("express");
const UserRecommendedViews = require("../models/users_recommended_views_model");


router.get("/", async(req,res)=>{
    allRecommendedUsers = UserRecommendedViews.find({});
    if(allRecommendedUsers)
    {
        res.status(200).send(allRecommendedUsers);
    }
    else
    {
        res.status(500).send('Unable to get recommended users');
    }
})


router.post("/createNewRecommendedUser", (req,res)=>{
    UserRecommendedViews.create(req.body, (err,result)=>{
        if(err)
        {
            res.status(500).send('Unable to create new recommendation ' + err);
        }
        else
        {
            res.status(200).send(result);
        }
    })
})


router.delete("/deleteRecommendedUser", (req,res)=>{
    UserRecommendedViews.deleteOne({username:req.query.username}, (err,result)=>{
        if(err)
        {
            res.status(500).send('Unable to delete recommendation ' + err);
        }
        else
        {
            res.status(200).send('Delete successful ' + result);
        }
    })
})

module.exports = router;