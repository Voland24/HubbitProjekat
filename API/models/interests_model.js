const mongoose = require("mongoose");

const interests_model = new mongoose.Schema(

    {
        
        category:{  type : String}
        
    }
);


module.exports = mongoose.model("interests",interests_model);