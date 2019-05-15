const request = require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/4e29e3223c3d8d29990a0b698e00581a/'+latitude+','+latitude;

    request({url:url,json:true},(error, { body }) => {
        
    if(error){
    callback('Unable to connect',undefined)
    }else if(body.error){
      callback('Unable to find the location',undefined)
    }else{
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        
  
    }})

}

module.exports=forecast