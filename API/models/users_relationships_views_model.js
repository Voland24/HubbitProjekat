const mongoose = require("mongoose");

const users_relationships_views = new mongoose.Schema(

    {
        username:{
            type : String,
            require:true,
            min:2,
            max:30,
            unique:true
        },
        listContacts:{type:Array},
        listBlocked:{type:Array},
        listLeftSwipes:{type:Array},
        listRightSwipes:{type:Array}
        
    }
);


module.exports = mongoose.model("users_relationships_views", users_relationships_views);