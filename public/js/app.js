//console.log('Client side js file is loaded')
//alert('Dobro dosli u Weather App')
/*
fetch('http://localhost:3000/puzzle').then((response)=>{
    response.json().then((data) => {
        console.log(data)
    })
})
*/


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'fromJs'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    console.log('testing')
    console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:8080/weather?address=' + location).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        } else { 
        console.log(data)
            messageOne.textContent = `Adresa: ${data.address}, longitude: ${data.longitude}, latitude: ${data.latitude}`
            messageTwo.textContent = `currentTemperature: ${data.currentTemperature}, currentFeelslike: ${data.currentFeelslike}`

        }
    })
})
})