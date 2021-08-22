const mongoose = require("mongoose")

const musicSchema = new mongoose.Schema({
    id : {type: String},
    title: {type: String},
    duration: {type: String},
    launchYear: {type: String},
    favorited: {type: String},
    artists: {type: String}
} , {
    versionKey : false
})
const musics = mongoose.model("musics", musicSchema)
module.exports = musics