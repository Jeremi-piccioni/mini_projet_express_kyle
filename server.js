const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const UserSchema = require('./UserSchema/UserSchema')
const bodyParser = require('body-parser')
require('dotenv').config()


app.use(cors())
app.use(express.json())

//ROUTES
app.post('/api/auth/signup',(req,res) => {
    console.log('Ca post sur la page signup papy ! ')
    console.log(req.body.email)
    console.log(req.body.password)
    res.status(200).send({message: 'ok'})
    
})

app.get('/api/auth/signup',(req,res) => {
    
    console.log('Ca get sur la page home Johnny ! ')
    console.log(req.body.email)
    console.log(req.body.password)
    
})

app.post('/api/auth/login', (req,res) => {
    //req.body

    console.log('Ca surf sur le post register tonton ! ')
    res.status(200).send({message:'It all good baby'})
})

app.get('/api/auth/login', (req,res) => {
    req.body
    console.log('Ca surf sur le get register jean louis ! ')
})

app.listen(PORT , () => {
    console.log(`Server listening on port ${PORT}`)
}) 

