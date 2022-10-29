const mongoose = require("mongoose");

const users_recommended_views = new mongoose.Schema(

    {
        username:{
            type : String,
            require:true,
            min:2,
            max:30,
            unique:true
        },
        dob:{ type : String},
        aboutMe:{  type : String},
        profilePic:{  type : String},
        gender:{  type : String},
        listMatchedInterests:{type:Array},
        location:{type:String}
    }
);


module.exports = mongoose.model("users_recommended_views", users_recommended_views);