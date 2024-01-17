const {Router} = require("express");

const {movieModel} = require("../models/blog.model")
const { UserModel } = require("../models/user.model")

const movieRouter = Router()
// GET METHOD
movieRouter.get("/", async (req, res) => {
    const movies = await movieModel.find({user_id:req.user_id})
    res.send({movies : movies,length:movies.length})
})
// POST METHOD
movieRouter.post("/create",async(req,res)=>{
    try {
        const {Title,Poster,Year,id}=req.body;
       
        await movieModel.create({
            Title,
            Poster,
            Year,
            id
        })
        res.send({msg:"Movie created"})
    } catch (error) {
        console.log(error)
    }
})

// Put Method
movieRouter.put("/edit/:movieID",async(req,res)=>{
    const movieID=req.params.movieID;
    const payload=req.body;
    const id=req.user_id;
    
    const movie = await movieModel.findOne({_id : movieID})
    if(id != movie.user_id){ res.send({mes:"You are Unauthorized"})
   }else{
        await movieModel.findByIdAndUpdate(movieID,payload)
        return  res.status(201).json({"message":"Updated successfully!"});
    }
})

// delete method
movieRouter.delete("/delete/:movieID",async(req,res)=>{
    const movieID=req.params.movieID;
    

    const movie = await movieModel.findOne({id:movieID})

    if(id != movie.id){ res.send({mes:"You are Unauthorized to delete movie"})
   }else{
        await movieModel.findByIdAndDelete(movieID)
        return  res.status(201).json({"message":"Deleted successfully!"});
    }
})

module.exports = {movieRouter}