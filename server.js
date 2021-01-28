const express = require('express')
const app = express()
const PORT = 3000


//ROUTES
app.get('/',(req,res) => {
    res.send('HOME PAGE')
    console.log('Ca surf sur la page home papy ! ')
})

app.get('/user', (req,res) => {
    res.send('USER PAGE PAPA !')
    console.log('Ca surf sur la page user tonton ! ')
})

app.listen(PORT , () => {
    console.log(`Server listening on port ${PORT}`)
}) 
