const express = require('express')
const app = express()
//import user-agent
const useragent = require('express-useragent')
const port = 3040

//setup db
const configureStore = require('./config/database')
configureStore()

//enable express to parse json data
app.use(express.json())

//setup user-agent
app.use(useragent.express());

//setup routes
const routes = require('./config/routes')
app.use('/', routes)




app.listen(port, () =>{
    console.log('listening to port',port)
})