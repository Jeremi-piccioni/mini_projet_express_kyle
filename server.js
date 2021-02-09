require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./UserSchema/User")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const auth = require('./verifyToken')
const verify = require('./verifyToken')
const { json } = require("body-parser")
const sauce = require('./UserSchema/Sauce')
const Sauce = require("./UserSchema/Sauce")

/////// FEATURE BRANCH WITH NO JOI. #The_sad_branch..

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//SIGN UP ROUTE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/api/auth/signup", async (req, res) => {                         
  console.log("Ca post sur la page signup papy ! ")
  
  //Check if email already exist in the data base
  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist){ 
    console.log('email already exist')
    return res.status(400).send({message:'Email already exist'})
    }

  //  const {email, password} = req.body
  let errors = []

  //Check if all fields are field up
  if (!req.body.email || !req.body.password) {
    errors.push("All fields are required !")
  }

  //Check if Email is valide :
  // regex : /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // regex 2 : /\S+@\S+\.\S+/
  console.log('req.body.email: '+ req.body.email)
  console.log("match result: " +  req.body.email.match(/\S+@\S+\.\S+/))
  const emailPattenValide = /\S+@\S+\.\S+/
  let emailTestResult = req.body.email.match(emailPattenValide)

  console.log("Email Test Result: " + emailTestResult)

  if (emailTestResult !== null) {
    console.log("log L39 email after succeeded validation : " + req.body.email)
  } else {
    console.log("log L38 email après validation failure : " + req.body.email)
    errors.push("Please enter a valide email")
    
  }

  //Check if password length is greater than 6 caraters
  if (req.body.password.length < 6) {
    errors.push("Password must be at least 6 caraters" )
  } else {
    console.log("log L24 PW après validation success : " + req.body.password)
  }

  if (errors.length > 0) {
    res.status(400).send({message: errors.join(" / ")})
  }

  //Create a new user
  else {

  //Hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPW = await bcrypt.hash(req.body.password, salt)
  
  console.log('Clear PW = ' + req.body.password)
  console.log('HashedPW =' + hashedPW)

    const user = new User(
        {
            email: req.body.email,
            password: hashedPW
        }
    )
    user
      .save()
      .then((dbUser) => {
        let jwtToken = jwt.sign({ userId: dbUser._id }, process.env.TOKEN_SECRET)
        res.status(200).header('auth-token',jwtToken).send({ message: "You are logged in" })
        console.log('Token given from signup page: '+ jwtToken )
      })
      .catch((err) => {
        res.status(401).send({ message: err.message })
      })
  }
  console.log('Errors array:'+ errors)
})

// LOGIN ROUTE //////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/api/auth/login", /*verify, */ async (req, res) => {

  console.log("Ca surf sur le post REGISTER tonton ! ")
  const user = await User.findOne({email: req.body.email})

  if(!user){ 
      console.log('This user is not registed at Sopekocko yet')
      return res.status(400).send({message:'This email is not registed at Sopekocko yet'})
    }
  else{
    console.log('Email exist but PASSWORD NOT VERIFIED YET')
    console.log('Clear PW: ' + req.body.password)

    //Check if password if correct
    const validPW = await bcrypt.compare(req.body.password, user.password)

    if(!validPW){ return res.status(400).send({message:'Password is wrong'}) }

    
    console.log('Pass throu PW verification')
    res.status(200).send({ message: "Welcome to Sopeckocko Dude !" })
    
  } 
})


//Post on sauce route ///////////////////////////////////////////////////////////////////////////////////////
app.post('/api/sauces', async (req,res) => { 

  console.log('Get in new-sauce Post')


  util = require("util")
  console.log(util.inspect(req.body))

  let sauce = JSON.parse(req.body.sauce)

  sauce = new Sauce(sauce)
  await sauce
  .save()
  console.log('New sauce: '+ req.body.name + ' saved in Data Base')
  res.status(200).send('New sauce: '+ req.body.name + ' saved in Data Base')
})


//Display Static Page
app.use(express.static("public"));

//Connexion to Mongoose DB
mongoose
  .connect(process.env.DB_PW, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB Baby !!!"))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
