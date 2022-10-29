const mongoose = require("mongoose");

const messages_model = new mongoose.Schema(

    {
        
        conversationId:{  type : String},
        sender : {type:String},
        text : {type : String}
        
    },
    {timestamps : true}
);

messages_model.index({conversationId:1}, {unique : false});


module.exports = mongoose.model("messages",messages_model);