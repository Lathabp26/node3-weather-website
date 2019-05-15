const express= require('express')
const path = require('path')
const hbs= require('hbs')
const geocode = require('./utils/geocode.js')
const forecast= require('./utils/forecast.js')
const app= express();
const port = process.env.PORT || 3000
// Define paths for Express config
const directorPublic= path.join(__dirname,('../public'))
const viewsDirectory =path.join(__dirname,('../templates/views'))
const partialsDirectory =path.join(__dirname,('../templates/partials'))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

// Setup static directory to serve 
app.use(express.static(directorPublic))

// app.get('',(req,res)=>{

//     res.send('<h1>hello express !</h1>');

// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:"Latha",
//         age:"27"
//     },{
//         name:"Jeevika",
//         age:"8"
//     }
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about Page !</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Latha BP'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Latha BP'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:"Help",
        name:"Latha BP"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
   else{
    geocode(req.query.address,(error,{ latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
           forecast(latitude,longitude,(error,forcastdata) => {
            if(error){
                return res.send({
                    error: error
                })
            }
        res.send({
            forecast: forcastdata,
            location,
            address: req.query.address

        })
            
    })
    })}
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    // res.send('Help Article not found')
    res.render('error',{
     title:"404",
     name:"Latha BP",
     errorMessage:"Help article not found"
 
 })
 })
 app.get('*',(req,res)=>{
    // res.send('My 404 Error Page')
    res.render('error',{
        title:"404",
        name:"Latha BP",
        errorMessage:"Page not found"
 
    }
 )
 })
 
app.listen(port,()=>{
    console.log('server is up on port 3000')
})