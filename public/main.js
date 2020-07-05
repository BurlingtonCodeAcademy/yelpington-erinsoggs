
// setting the map's view to Burlington
let myMap = L.map("map").setView([44.4798, -73.2143], 12)

// adding tile layet
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap)

// adding marker to downtown Burlington on map
let marker = L.marker([44.4798, -73.2143])
let downtown = "Downtown Burlington"
marker.bindPopup(`${downtown}`)
marker.addTo(myMap)

// adding highlighting circle to downtown Burlington marker on map
L.circle([44.4798, -73.2143], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(myMap);

// adding an mouseover event listener for pop up over marker
marker.addEventListener('mouseover', () => {
  marker.openPopup()
})

// function to place markers at each restaurant's location on the map
function placeMarker(address) {
  let urlAddress = encodeURI(address)
  fetch(`https://nominatim.openstreetmap.org/search?q=${urlAddress}&format=json`)
  .then((res) => res.json())
  .then (json => {
    let latLongArr = [json[0].lat, json[0].lon]
    L.marker(latLongArr).addTo(myMap).bindPopup(`<a href=${restaurant.website}>${restaurant.name}</a>`).openPopup()
  })
}

let display = document.getElementById("display")

// fetching all of the restaurant objects and adding them a list in 'display'
fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
.then((res) => res.json())
.then((restaurantCollection) => {
  restaurantCollection.forEach((restaurant) => {
// placing markers at each restaurant's address on the map
    placeMarker(restaurant.address)
    let item = document.createElement("li")
// creating a link that takes you to the restaurant's page
    item.innerHTML = `<a href='/restaurant?q=${restaurant.id}'>${restaurant.name}</a>`
    display.appendChild(item)
  })
})


