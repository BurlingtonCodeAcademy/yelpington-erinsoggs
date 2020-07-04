let restaurantId = window.location.search.split("=").slice(-1)[0]
let restDisplay = document.getElementById("restaurant")
let restName = document.getElementById("restName")
let restAddress = document.getElementById("restAddress")
let restPhone = document.getElementById("restPhone")
let restHours = document.getElementById("restHours")




let name = restaurant.name
let address = restaurant.address
let phone = restaurant.phone
let website = restaurant.website
let hours = restaurant.hours
let notes = restaurant.notes

  fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${restaurantId}`)
  .then((res) => res.json())
  .then((restaurant) => {
    let name = restaurant.name
    restName.innerHTML = `<a href=${website}>${name}</a>`
    console.log(website)

    let address = restaurant.address
    restAddress.textContent = address

    let phone = restaurant.phone
    restPhone.textContent = phone

    let hours = restaurant.hours
    restHours.textContent = hours

   
    
    
    })



