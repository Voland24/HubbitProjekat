const mongoose = require("mongoose");

const users_algorithm_views_model = new mongoose.Schema(

    {
        username:{
            type : String,
            require:true,
            min:2,
            max:30,
            unique:true
        },
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


module.exports = mongoose.model("users_algorithm_views",users_algorithm_views_model);