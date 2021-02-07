const router = require("express").Router

router.get("/post", (req, res) => {
  res.json({
       post: { 
            title: "shuut !",
            description: "It 's a secret" 
           }
  })
})


module.exports = router