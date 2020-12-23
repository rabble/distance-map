var pos = L.GeoIP.getPosition();
var map = L.map('mapid').setView(pos, 10);
L.GeoIP.centerMapOnPosition(map);

var circle;

var titleLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXZhbmhlbnNoYXciLCJhIjoiY2tqMGsyMTJ5MGJ6YzJwcGJxN25kNHloYSJ9.CpgsDQMkh3jckP2becXxLg', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
});

map.addLayer(titleLayer);



//import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
//const searchControl = new GeoSearchControl({
//     provider: new OpenStreetMapProvider(), 
//});
//mymap.addControl(searchControl);

L.control.locate().addTo(map);

$( "#distance-form" ).keyup(function() {
    update_circle()
});

$("#distance-form input:radio").click(function() {
    update_circle()
});

function update_circle() {

    var distance = $( "#distance" ).val();
    var is_km = $( "input[type=radio][name=switch-one]:checked" ).val();
    
    if (is_km == "km" ) {
        distance=distance*1000
    } else {
        distance=distance*1609.34
    }

    if (circle != undefined) {
        map.removeLayer(circle);
    };

    circle = L.circle([pos.lat, pos.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: distance
    }).addTo(map);

    map.fitBounds(circle.getBounds())

}

map.on('click', function(e) {
   pos = e.latlng
   //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
   map.panTo(pos);
   update_circle();
});


function onLocationFound(e) {
    pos = e.latlng
    map.panTo(pos);
    update_circle();
}

map.on('locationfound', onLocationFound);