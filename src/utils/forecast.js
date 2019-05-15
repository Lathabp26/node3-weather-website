const request = require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/4e29e3223c3d8d29990a0b698e00581a/'+latitude+','+latitude;

    request({url:url,json:true},(error,response) => {
        
    if(error){
    callback('Unable to connect',undefined)
    }else if(response.body.error){
      callback('Unable to find the location',undefined)
    }else{
        callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')

    
    }})

}

module.exports=forecast