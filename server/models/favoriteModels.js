import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    

});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;