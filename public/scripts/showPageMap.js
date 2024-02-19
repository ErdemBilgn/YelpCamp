const [latitude, longitude] = campground.geometry.coordinates

const map = L.map("map").setView([longitude, latitude], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);



const marker = L.marker([longitude, latitude]).addTo(map);

// Bind a popup to the marker
marker.bindPopup(campground.title).openPopup();