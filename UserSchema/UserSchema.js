const mongoose = require('mongoose')
const Joi = require("@hapi/joi")


const UserSchema = Joi.object({
        
          email: Joi.string().min(6).required().email(),
          password: Joi.string().min(6).required(),

        })

module.exports = mongoose.model('UserSchema', UserSchema ) 