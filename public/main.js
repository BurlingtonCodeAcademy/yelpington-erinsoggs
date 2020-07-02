let myMap = L.map('map').setView([44.4798, -73.2143], 12)

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap)

L.marker([44.4798, -73.2143]).addTo(myMap);

L.circle([44.4798, -73.2143], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(myMap);

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

function getRestaurants() {
  fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
  .then((res) => res.json())
  .then(restaurants => {
    restaurants.forEach(restaurant => {
      placeMarker(restaurant.address)
    })
  })
}

getRestaurants()

// placeMarker('163 Main St. Burlington, VT 05401')
// placeMarker('115 St Paul St. Burlington, VT 05401')
// placeMarker('149 S Champlain St. Burlington, VT 05401')
// placeMarker('82 S Winooski Ave. Burlington, VT 05401')
// placeMarker('189 Bank St. Burlington, VT 05401')
// placeMarker('160 Bank St. Burlington, VT 05401')
// placeMarker('144 Church St. Burlington Vermont 05401')
// placeMarker('55 Cherry St. Burlington, VT 05401')
// placeMarker('155 Bank St. Burlington Vermont 05401')
// placeMarker('156 Church St. Burlington Vermont 05401')
// placeMarker('155 Main St. Burlington, VT 05401')
// placeMarker('115 Church St. Burlington Vermont 05401')
// placeMarker('206 Main St. Burlington, VT 05401')
// placeMarker('83 Church St. Burlington, VT 05401')
// placeMarker('112 Lake St. Burlington Vermont 05401')
// placeMarker('161 Church St. Burlington Vermont 05401')


