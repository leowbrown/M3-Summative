const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    item_name:{
        type:String,
        require:true
    },
    size:{
        type:String,
        require:true
    },
    price:{
        type:String,
         require:true
    },
    description:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    comments: {
        type:Array,
        require: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);