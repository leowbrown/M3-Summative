const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        require:true
    }
},{
    timestamps: true
});


module.exports = mongoose.model('Comment', commentSchema);