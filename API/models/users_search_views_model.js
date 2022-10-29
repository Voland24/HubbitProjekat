const mongoose = require("mongoose");

const users_search_views = new mongoose.Schema(

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
        profilePic:{  type : String,},
        gender:{  type : String,},
        location:{type:String}
    }
);


module.exports = mongoose.model("users_search_views", users_search_views);