const mongoose = require("mongoose");

const users_visit_profile_views = new mongoose.Schema(

    {
        username:{
            type : String,
            require:true,
            min:2,
            max:30,
            unique:true
        },
        fullName:{  type : String,},
        dob:{type : String},
        aboutMe:{  type : String,},
        profilePic:{  type : String,},
        gender:{  type : String,},
        listGenders:{type:Array},
        listInterests:{type:Array},
        listTurnOns:{type:Array},
        listTurnOffs:{type:Array},
        longDistance:{type:Boolean},
        listPrefLoc:{type:Array},
        location:{type:String}
    }
);


module.exports = mongoose.model("users_visit_profile_views", users_visit_profile_views);