require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./UserSchema/User")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")

/////// FEATURE BRANCH WITH NO JOI. #The_sad_branch..

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//ROUTES
app.post("/api/auth/signup", async (req, res) => {
  console.log("Ca post sur la page signup papy ! ")

  //Check if email already exist in the data base
  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist){ 
    console.log('email already exist')
      return res.status(400).send('Email already exist')
    }

  //  const {email, password} = req.body
  let errors = []

  //Check if all fields are field up
  if (!req.body.email || !req.body.password) {
    errors.push({ message: "All fields are required !" })
    return
  }

  //Check if Email is valide :
  // regex : /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // regex 2 : /\S+@\S+\.\S+/

  console.log("match result: " + req.body.email.match(/\S+@\S+\.\S+/))
  const emailPattenValide = /\S+@\S+\.\S+/
  let emailTestResult = req.body.email.match(emailPattenValide)

  console.log("Email Test Result: " + emailTestResult)

  if (emailTestResult !== null) {
    console.log("log L39 email after succeeded validation : " + req.body.email)
  } else {
    console.log("log L38 email après validation failure : " + req.body.email)
    errors.push({ message: "Please enter a valide email" })
    
  }

  //Check if password length is greater than 6 caraters
  if (req.body.password.length < 6) {
    errors.push({ message: "Password must be at least 6 caraters" })
  } else {
    console.log("log L24 PW après validation success : " + req.body.password)
  }

  if (errors.length > 0) {
    res.status(400).send(errors)
  } else {
    const user = new User(req.body)
    user
      .save()
      .then((dbUser) => {
        res.status(200).send({ message: "You are logged in" })
      })
      .catch((err) => {
        res.status(401).send({ message: err.message })
      })
  }
  console.log(errors)
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

mongoose
  .connect(process.env.DB_PW, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB Baby !!!"))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
