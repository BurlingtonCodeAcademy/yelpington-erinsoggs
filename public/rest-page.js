// splitting the search part of the url at '=' and then slicing to get the only element of the array that's left which is the restaurant's id
let restaurantId = window.location.search.split("=").slice(-1)[0]

// DOM scripting to get each element by their id
let restDisplay = document.getElementById("restaurant")
let restName = document.getElementById("restName")
let restAddress = document.getElementById("restAddress")
let restPhone = document.getElementById("restPhone")
let restHours = document.getElementById("restHours")
let restMap = document.getElementById("restMap")


let notes = restaurant.notes

  // fetching data for for each individual restaurant by the restaurant's id
  fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${restaurantId}`)
  .then((res) => res.json())
  .then((restaurant) => {
    let name = restaurant.name
    // turning every restaurant name into a link to their website
    let website = restaurant.website
    restName.innerHTML = `<a href=${website}>${name}</a>`
    
    let address = restaurant.address
    restAddress.textContent = address

    let phone = restaurant.phone
    restPhone.textContent = phone

    let hours = restaurant.hours
    restHours.textContent = hours
  })

  let myMap = L.map('mapid').setView([51.505, -0.09], 13)


