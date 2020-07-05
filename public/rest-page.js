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
let name = restaurant.name

  // fetching data for for each individual restaurant by the restaurant's id
  fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${restaurantId}`)
  .then((res) => res.json())
  .then((restaurant) => {
    let name = restaurant.name
    // turning every restaurant name into a link to their website
    let website = restaurant.website
    restName.innerHTML = `<a href=${website}>${name}</a>`
    
    let address = restaurant.address
    restAddress.textContent = "Address: " + address

    let phone = restaurant.phone
    restPhone.textContent = "Phone: " + phone

    let hours = restaurant.hours
    restHours.textContent = "Hours: " + hours
  })

// map
// setting map view to be on Burlington
let myMap = L.map("restMap").setView([44.4798, -73.2143], 12)

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap)


// function to place a marker where the restaurant is 
function placeMarker(address) {
  let urlAddress = encodeURI(address)
  fetch(`https://nominatim.openstreetmap.org/search?q=${urlAddress}&format=json`)
  .then((res) => res.json())
  .then (json => {
    let latLongArr = [json[0].lat, json[0].lon]
    L.marker(latLongArr).addTo(myMap).bindPopup("Restaurant Location").openPopup()
  })
}

placeMarker(`${restaurantId}`)




