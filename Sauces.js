//const { date } = require("@hapi/joi")
const mongoose = require("mongoose")

//export class Sauce {   // Comes from Front end schema
    //     _id: string;
    //     name: string;
    //     manufacturer: string;
    //     description: string;
    //     heat: number;
    //     likes: number;
    //     dislikes: number;
    //     imageUrl: string;
    //     mainPepper: string;
    //     usersLiked: string[];
    //     usersDisliked: string[];
    //     userId: string;
    //   }

const SauceSchema = new mongoose.Schema(
  {

      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      manufacturer: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      heat: {
        type: Number,
        required: true,
      },
      likes: {
        type: Number,
        required: true,
      },
      dislikes: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      mainPepper: {
        type: String,
        required: true,
      },

      usersLiked: {
        type: String,
        required: true,
      },
      usersDisliked: {
        type: String,
        required: true,
      },
    //   userId: {                      // Necessary ??
    //     type: String,
    //     required: true,
    //   },
      date: { type: Date,
              default: Date.now()
      }
  }
)

module.exports = mongoose.model("Sauce", SauceSchema)
