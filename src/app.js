const path = require('path')
const express = require('express')
const mapsWeathers = require('./utils/mapbox')
const weatherstack = require('./utils/weatherstack')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }else{
        console.log(req.query.address)
        const unosGrada = req.query.address
        console.log(unosGrada)

        mapsWeathers.giveCoordinates(unosGrada, (error, {latitude, longitude}={})=>{   
           if(error){
              return console.log('error')
          } else if(latitude === undefined){
            return res.send('Potrebno je uneti ispravnu lokaciju')
          }
          
          console.log('lokacija: ' + latitude,longitude)
        
    
         
          weatherstack.weatherFromCoordinates(longitude,latitude, (error, {currentTemperature, currentFeelslike}={})=>{  
              if(error){
                  return console.log('error')
              }  
            console.log('Data', currentTemperature, currentFeelslike)
            res.send({
                address: unosGrada,
                longitude: longitude,
                latitude: latitude,
                currentTemperature: currentTemperature,
                currentFeelslike: currentFeelslike
            })
          })
      })

      }

      /*
    res.send({
        forecast: 'Suncano',
        location: 'Belgrade',
        address: req.query.address
    })
    */
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    console.log(req.query.search)
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/weather/*',(req,res)=>{
    res.send('Weather page is not found')
})

app.get('*',(req,res)=>{
    res.send('404 page not found')
    
    
})

app.listen(8080, ()=>{  
    console.log('Server is up on port 8080.')
})