console.log('Client side js loaded up')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = 'Temperature for ' + data.location + ' is ' + data.temperature
            messageTwo.textContent = 'and it feels like: ' + data.feelslike

        })
    })
})