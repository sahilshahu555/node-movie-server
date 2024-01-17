const mongoose=require("mongoose");

const movieSchema= new mongoose.Schema({
    Title:{type:String, required:true},
    Poster:{type:String, required:true},
    Year:{type:String,required:true},
    id:{type:Number,required:true},
})

const movieModel= mongoose.model("Movie",movieSchema)

module.exports={movieModel}