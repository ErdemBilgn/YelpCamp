const map = L.map("map").setView([40.66995747013945, -103.59179687498357], 3);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")
    .addTo(map);

const markers = L.markerClusterGroup();

for (let i = 0; i < campgrounds.length; i++) {
    const [latitude, longitude] = campgrounds[i].geometry.coordinates;
    const title = campgrounds[i].properties.popUpMarkup;
    const marker = L.marker(new L.LatLng(longitude, latitude), {
        title: title,
    });
    marker.bindPopup(title);
    markers.addLayer(marker);
}

map.addLayer(markers);