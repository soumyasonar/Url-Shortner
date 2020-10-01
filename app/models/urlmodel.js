const mongoose = require('mongoose')
//import validator
const validator = require('validator')
//import shorthash
const shorthash = require('shorthash')
const Schema = mongoose.Schema
const urlSchema = new Schema({
    title: {
        type:String,
        minlength : [3,'Title should be more than 3 characters'],
        required:true
    },
    originalUrl : {
        type:String,
        validate: {
            validator: function(value){
                return validator.isURL(value)
            },
            message : function(){
                return 'provide proper url'
            }
        }
    },
    hashedUrl : {
        type:String,
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    clicks: [
    {
        clickDateTime: {
            type:Date
        },
        ipAddress: {
           type:String
        },
        browser: {
           type:String
        },
        platform:{
            type:String
        },
        device:{
            type:String
            
        }
    }]
})

urlSchema.pre('save',function(next){
    //console.log('prefunction called')
    const shortUrl = shorthash.unique(this.originalUrl)
    if(this.originalUrl !== ''){
        this.hashedUrl = shortUrl
    }
    next()
})
const Url = mongoose.model('Url',urlSchema)
module.exports = Url