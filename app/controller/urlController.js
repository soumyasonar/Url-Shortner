const Url = require('../models/urlmodel')

//get all the urls
module.exports.list = (req,res) =>{
    Url.find()
     .then((url) =>{
          res.json(url)
     })
     .catch((err) =>{
         res.json(err)
     })
}

//post
module.exports.create = (req,res) =>{
    const body = req.body
    const url = new Url(body)
    url.save()
     .then((url) =>{
         res.json(url)
     })
     .catch((err) =>{
         res.json(err)
     })
}

//show by id
module.exports.show = (req,res) =>{
    const id = req.params.id
    Url.findById(id)
      .then(url =>{
          if(url) {
              res.json(url)
          } else {
              res.json({})
          }
      })
}

//update by id
module.exports.update = (req,res) =>{
    const id = req.params.id
    const body = req.body
    Url.findByIdAndUpdate(id,body, {new:true,runValidators:true})
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//delete by id
module.exports.destory = (req,res) =>{
    const id=req.params.id
    Url.findByIdAndDelete(id)
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}
//redirecting code ,it will redirect shorturl to original url
module.exports.redirect = (req,res) =>{
    const hash = req.params.hash
    const clientData = req.useragent
    const ip = req.clientIp
    const click = {
        ipAddress:ip,
        browser:clientData.browser,
        platform:clientData.platform,
        device:clientData.Mobile? 'Mobile' : 'Desktop'
    }
    //push method
    Url.findOneAndUpdate({hashedUrl : hash},
    {$push:{clicks:click}},
    {new:true,runValidators:true})
       .then((url) =>{
           console.log(url)
       })
       .catch((err) =>{
           res.json(err)
       })
       console.log(ip)
    Url.findOne({hashedUrl : hash})
     .then((url)=>{
        res.redirect(url.originalUrl)
    })
     .catch((err)=>{
        res.json(err)
    }) 
}

