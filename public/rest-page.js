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

// doesn't work, need to fix
function custComments(comments) {
  comments.forEach((comment) => {
    let custComment = document.createElement("li")
    custComment.textContent = comment
    commentsList.appendChild(custComment)
  })
}

// fetching data for for each individual restaurant by the restaurant's id
fetch(`https://yelpingtonapi.herokuapp.com/api/restaurants/${restaurantId}`)
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

    let notes = restaurant.notes
    console.log(notes)
    
    restComments.innerHTML = "<p id='customer-comments'>Customer comments: </p>" + notes // not sure why this works
    
    placeMarker(restaurant.coords, name)
    
    // doesn't work, need to fix
    custComments(notes)
  })

// map
// setting map view to be on Burlington
let myMap = L.map("restMap").setView([44.4798, -73.2143], 12)

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap)


// function to place a marker where the restaurant is 
function placeMarker(coords, name) {
  L.marker(coords).addTo(myMap).bindPopup(`${name}`).openPopup()
}