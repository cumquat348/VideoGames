const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
exports.connect = ()=>{
    mongoose
    .connect('mongodb://localhost:27017/games')
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
}
const userSchema = new mongoose.Schema({
    nick: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    picture: { type: String },
    privileges: { type: Number },
    blocked: { type: Boolean },
    blockade_expiration_date: { type: Date },
    library_ids: { type: Array }
});

const User = mongoose.model("user", userSchema, 'users');
exports.user = User

const gameSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    genre: { type: Array },
    // series: { type: String },
    platform: { type:Array },
    publisher: { type: Array },
    developer: { type: Array },
    release_date: { type: Date },
    minimal_requirements: { type:String },
    recommended_requirements: { type:String },
    review_id: { type:Array}
});

const Game = mongoose.model("game", gameSchema, 'games');
exports.game = Game


const reviewSchema = new mongoose.Schema({
    _id_game: { type: ObjectId },
    _id_user: { type: ObjectId },
    content: { type: String },
    rating: { type: String },
    // date: { type:Date },
});

const Review = mongoose.model("review", reviewSchema, 'reviews');
exports.review = Review