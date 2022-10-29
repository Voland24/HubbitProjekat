const mongoose = require("mongoose");

const users_credentials_views_model = new mongoose.Schema(

    {
        username:{
            type : String,
            require:true,
            min:2,
            max:30,
            unique:true
        },
        email:{  type : String,},
        password:{type:String}
    }
);


module.exports = mongoose.model("users_credentials_views",users_credentials_views_model);