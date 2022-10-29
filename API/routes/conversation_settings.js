
const router = require("express").Router();
const ConversationSettings = require("../models/conversation_settings_model");


router.get("/", (req,res)=>{
    ConversationSettings.find({conversationId : req.query.conversationId}, (err,result)=>{
        if(!err)
        {
            res.status(200).send(result);
        }
        else
        {
            res.status(500).send("error kod get settings");
        }
    })
})

router.put("/updateConversationSettings", (req,res)=>{
    var ok = true;
    if(req.body.mode == 'bubble')
    {
        ConversationSettings.updateOne({conversationId : req.body.conversationId}, {bubbleColour : req.body.bubbleColour}, (err,result)=>{
            if(err)
                ok = false;
        })
    }
    if(req.body.mode == 'image')
    {
        ConversationSettings.updateOne({conversationId : req.body.conversationId}, {backgroundImage : req.body.backgroundImage}, (err,result)=>{
            if(err)
                ok = false;
        })
    }

    if(ok)
    {
        res.status(200).send('OK');
    }
    else
    {
        res.status(500).send('error with settings update');
    }
})


module.exports = router;