const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const cors = require("cors")
//const UserSchema = require("./UserSchema/UserSchema")
const bodyParser = require("body-parser")
const Joi = require("@hapi/joi")
require('dotenv').config()
console.log(process.env.DB_PW)


app.use(cors())
app.use(express.json())

//ROUTES
app.post("/api/auth/signup", (req, res) => {
  console.log("Ca post sur la page signup papy ! ")
  console.log(req.body.email)
  console.log(req.body.password)

  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  const validation = schema.validate(req.body)
  res.send(validation)

})

app.get("/api/auth/signup", (req, res) => {
  console.log("Ca get sur la page home Johnny ! ")
  console.log(req.body.email)
  console.log(req.body.password)
})

app.post("/api/auth/login", (req, res) => {

  console.log("Ca surf sur le post register tonton ! ")
  res.status(200).send({ message: "It all good baby" })

})

app.get("/api/auth/login", (req, res) => {
  req.body
  console.log("Ca surf sur le get register jean louis ! ")
})

//Connexion to Mongoose DB

mongoose.connect(process.env.DB_PW,
                    { useNewUrlParser: true })
                    .then(() => console.log('Connected to MongoDB Baby !!!'))
                    .catch(err => console.log(err))


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
