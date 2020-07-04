let myMap = L.map("map").setView([44.4798, -73.2143], 12)

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap)

L.marker([44.4798, -73.2143]).addTo(myMap);

// L.circle([44.4798, -73.2143], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500
// }).addTo(myMap);

let marker = L.marker([44.4798, -73.2143])
marker.bindPopup('<h4>Downtown Burlington</h4>')
marker.addTo(myMap)

marker.addEventListener('mouseover', () => {
  marker.openPopup()
})


function placeMarker(address) {
  let urlAddress = encodeURI(address)
  fetch(`https://nominatim.openstreetmap.org/search?q=${urlAddress}&format=json`)
  .then((res) => res.json())
  .then (json => {
    let latLongArr = [json[0].lat, json[0].lon]
    L.marker(latLongArr).addTo(myMap)
  })
  
}

// fetch("https://json-server.burlingtoncodeacademy.now.sh/restaurants")
// .then((res) => res.json())
// .then((restaurantCollection) => {
//   restaurantCollection.forEach((restaurant) => {
//     placeMarker(restaurant.address)
//   })
// })

let display = document.getElementById("display")

fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
.then((res) => res.json())
.then((restaurantCollection) => {
  restaurantCollection.forEach((restaurant) => {
    let item = document.createElement("li")
    item.innerHTML = `<a href='/restaurant?q=${restaurant.id}'>${restaurant.name}</a>`
    display.appendChild(item)
  })
})


